import os

# Run Metaplex's upload command via the CLI to upload the NFTs.
# Run Metaplex's verify command via the CLI to make sure the NFTs were uploaded.
# Run Metaplex's create_candy_machine command via the CLI to create a new candy machine.
# Run Metaplex's update_candy_machine command via the CLI to create the drop date.
date = "1 Dec 2021 00:12:00 GMT"
price = 1
commands = [
    f'rm -rf .cache',
    f'ts-node ~/metaplex-foundation/metaplex/js/packages/cli/src/candy-machine-cli.ts upload ./assets --env devnet --keypair ~/.config/solana/devnet.json',
    # f'ts-node ~/metaplex-foundation/metaplex/js/packages/cli/src/candy-machine-cli.ts verify --keypair ~/.config/solana/devnet.json',
    f'ts-node ~/metaplex-foundation/metaplex/js/packages/cli/src/candy-machine-cli.ts create_candy_machine --env devnet --keypair ~/.config/solana/devnet.json -p {price}',
    f'ts-node ~/metaplex-foundation/metaplex/js/packages/cli/src/candy-machine-cli.ts update_candy_machine --date "{date}" --env devnet --keypair ~/.config/solana/devnet.json',
]
for command in commands:
    print(f'executing command {command}')
    os.system(command)


os.system("echo Hello from the other side!")
