import React, { useEffect, useState } from "react";
import {
  AccountMeta,
  ConfirmOptions,
  Connection,
  Keypair,
  PublicKey,
} from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
import { MintLayout, TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";
import { programs } from "@metaplex/js";
import {
  candyMachineProgram,
  TOKEN_METADATA_PROGRAM_ID,
  SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
} from "./helpers";
import { MetadataData } from "@metaplex/js/lib/programs/metadata";

const {
  metadata: { Metadata, MetadataProgram },
} = programs;

const { SystemProgram } = web3;
const opts: ConfirmOptions = {
  preflightCommitment: "processed",
};

const MAX_NAME_LENGTH = 32;
const MAX_URI_LENGTH = 200;
const MAX_SYMBOL_LENGTH = 10;
const MAX_CREATOR_LEN = 32 + 1 + 1;

const fetchHashTable = async (hash: string, metadataEnabled: boolean) => {
  if (!process.env.NEXT_PUBLIC_SOLANA_RPC_HOST) {
    return;
  }
  const connection = new web3.Connection(
    process.env.NEXT_PUBLIC_SOLANA_RPC_HOST
  );

  const metadataAccounts = await MetadataProgram.getProgramAccounts(
    connection,
    {
      filters: [
        {
          memcmp: {
            offset:
              1 +
              32 +
              32 +
              4 +
              MAX_NAME_LENGTH +
              4 +
              MAX_URI_LENGTH +
              4 +
              MAX_SYMBOL_LENGTH +
              2 +
              1 +
              4 +
              0 * MAX_CREATOR_LEN,
            bytes: hash,
          },
        },
      ],
    }
  );

  const mintHashes = [];

  for (let index = 0; index < metadataAccounts.length; index++) {
    const account = metadataAccounts[index];
    // VERY BAD, NEED TO FIX BUT FOR NOW JUST USING ANY
    const accountInfo = (await connection.getParsedAccountInfo(
      account.pubkey
    )) as any;
    const metadata = new Metadata(hash.toString(), accountInfo.value);
    if (metadataEnabled) mintHashes.push(metadata.data);
    else mintHashes.push(metadata.data.mint);
  }

  return mintHashes;
};

const getProvider = () => {
  if (!process.env.NEXT_PUBLIC_SOLANA_RPC_HOST) {
    return;
  }
  const rpcHost = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST;
  // Create a new connection object
  const connection = new Connection(rpcHost);

  // Create a new Solana provider object
  const provider = new Provider(connection, window.solana, opts);

  return provider;
};

const getCandyMachineState = async () => {
  const provider = getProvider();

  // Get metadata about your deployed candy machine program
  const idl = await Program.fetchIdl(candyMachineProgram, provider);

  if (!idl || !process.env.NEXT_PUBLIC_CANDY_MACHINE_ID) {
    return;
  }

  // Create a program that you can call
  const program = new Program(idl, candyMachineProgram, provider);

  // Fetch the metadata from your candy machine
  const candyMachine = await program.account.candyMachine.fetch(
    process.env.NEXT_PUBLIC_CANDY_MACHINE_ID
  );

  // Parse out all our metadata and log it out
  const itemsAvailable = candyMachine.data.itemsAvailable.toNumber();
  const itemsRedeemed = candyMachine.itemsRedeemed.toNumber();
  const itemsRemaining = itemsAvailable - itemsRedeemed;
  const goLiveData = candyMachine.data.goLiveDate.toNumber();

  // We will be using this later in our UI so let's generate this now
  const goLiveDateTimeString = `${new Date(
    goLiveData * 1000
  ).toLocaleDateString()} @ ${new Date(
    goLiveData * 1000
  ).toLocaleTimeString()}`;

  return {
    itemsAvailable,
    itemsRedeemed,
    itemsRemaining,
    goLiveData,
    goLiveDateTimeString,
  };
};

const getMetadata = async (mint: PublicKey) => {
  return (
    await PublicKey.findProgramAddress(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )
  )[0];
};

const getMasterEdition = async (mint: PublicKey) => {
  return (
    await PublicKey.findProgramAddress(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
        Buffer.from("edition"),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )
  )[0];
};

const getTokenWallet = async (wallet: PublicKey, mint: PublicKey) => {
  return (
    await web3.PublicKey.findProgramAddress(
      [wallet.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )
  )[0];
};

// Just added random PublicKey typing...
const createAssociatedTokenAccountInstruction = (
  associatedTokenAddress: PublicKey,
  payer: PublicKey,
  walletAddress: PublicKey,
  splTokenMintAddress: PublicKey
) => {
  const keys = [
    { pubkey: payer, isSigner: true, isWritable: true },
    { pubkey: associatedTokenAddress, isSigner: false, isWritable: true },
    { pubkey: walletAddress, isSigner: false, isWritable: false },
    { pubkey: splTokenMintAddress, isSigner: false, isWritable: false },
    {
      pubkey: web3.SystemProgram.programId,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    {
      pubkey: web3.SYSVAR_RENT_PUBKEY,
      isSigner: false,
      isWritable: false,
    },
  ];
  return new web3.TransactionInstruction({
    keys,
    programId: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    data: Buffer.from([]),
  });
};

// Returns an error code
// 0: success
// 1: error
const mintToken = async (walletAddress: Keypair) => {
  let response: number = 1
  try {
    if (
      !process.env.NEXT_PUBLIC_SOLANA_RPC_HOST ||
      !process.env.NEXT_PUBLIC_CANDY_MACHINE_CONFIG
    ) {
      console.log("PROCESS.ENV IS NULL")
      return 1;
    }
    console.log("process.env.NEXT_PUBLIC_SOLANA_RPC_HOST")
    console.log(process.env.NEXT_PUBLIC_SOLANA_RPC_HOST)
    const mint = web3.Keypair.generate();
    const token = await getTokenWallet(walletAddress.publicKey, mint.publicKey);
    const metadata = await getMetadata(mint.publicKey);
    const masterEdition = await getMasterEdition(mint.publicKey);
    const rpcHost = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST;
    const connection = new Connection(rpcHost);
    const rent = await connection.getMinimumBalanceForRentExemption(
      MintLayout.span
    );

    const config = new web3.PublicKey(
      process.env.NEXT_PUBLIC_CANDY_MACHINE_CONFIG
    );


    const accounts = {
      config,
      candyMachine: process.env.NEXT_PUBLIC_CANDY_MACHINE_ID || "",
      payer: walletAddress.publicKey,
      wallet: process.env.NEXT_PUBLIC_TREASURY_ADDRESS || "",
      mint: mint.publicKey,
      metadata,
      masterEdition,
      mintAuthority: walletAddress.publicKey,
      updateAuthority: walletAddress.publicKey,
      tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      rent: web3.SYSVAR_RENT_PUBKEY,
      clock: web3.SYSVAR_CLOCK_PUBKEY,
    };

    const signers = [mint];
    const instructions = [
      web3.SystemProgram.createAccount({
        fromPubkey: walletAddress.publicKey,
        newAccountPubkey: mint.publicKey,
        space: MintLayout.span,
        lamports: rent,
        programId: TOKEN_PROGRAM_ID,
      }),
      Token.createInitMintInstruction(
        TOKEN_PROGRAM_ID,
        mint.publicKey,
        0,
        walletAddress.publicKey,
        walletAddress.publicKey
      ),
      createAssociatedTokenAccountInstruction(
        token,
        walletAddress.publicKey,
        walletAddress.publicKey,
        mint.publicKey
      ),
      Token.createMintToInstruction(
        TOKEN_PROGRAM_ID,
        mint.publicKey,
        token,
        walletAddress.publicKey,
        [],
        1
      ),
    ];

    const provider = getProvider();
    const idl = await Program.fetchIdl(candyMachineProgram, provider);
    if (!idl) {
      return 1;
    }
    const program = new Program(idl, candyMachineProgram, provider);
    console.log("dogwater");

    // The magic line
    const txn = await program.rpc.mintNft({
      accounts,
      signers,
      instructions,
    });

    console.log("txn:", txn);

    // Setup listener
    connection.onSignatureWithOptions(
      txn,
      async (notification, context) => {
        if (notification.type === "status") {
          console.log("Receievd status event");

          const { result } = notification;
          if (!result.err) {
            console.log("NFT Minted!");
          }
        }
      },
      { commitment: "processed" }
    );
    response = 0
  } catch (error: any) {
    response = 1
    let message = error.msg || "Minting failed! Please try again!";

    if (!error.msg) {
      if (error.message.indexOf("0x138")) {
      } else if (error.message.indexOf("0x137")) {
        message = `SOLD OUT!`;
      } else if (error.message.indexOf("0x135")) {
        message = `Insufficient funds to mint. Please fund your wallet.`;
      }
    } else {
      if (error.code === 311) {
        message = `SOLD OUT!`;
      } else if (error.code === 312) {
        message = `Minting period hasn't started yet.`;
      }
    }

    console.warn(message);
  }
  return response
};

// TODO: Refactor to RETURN a new array of mints, not use setMints
const getMints = async (mints: any, setMints: any) => {
  const data = (await fetchHashTable(
    process.env.NEXT_PUBLIC_CANDY_MACHINE_ID || "",
    true
  )) as MetadataData[];

  if (data && data.length !== 0) {
    for (const mint of data) {
      // Get URI
      const response = await fetch(mint.data.uri);
      const parse = await response.json();
      console.log("Past Minted NFT", mint);

      // Get image URI
      if (!mints.find((mint: any) => mint === parse.image)) {
        setMints((prevState: any) => [...prevState, parse.image]);
      }
    }
  }
};

// const getData = async () => {
//   const data = (await fetchHashTable(
//     process.env.NEXT_PUBLIC_CANDY_MACHINE_ID || "",
//     true
//   )) as MetadataData[];
// };

export { mintToken, getMints };
