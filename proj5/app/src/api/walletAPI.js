// // Check if we have an existing solana account. Passive request
// const checkSolanaConnection = async () => {
//     let address = "";
//     try {
//         const { solana } = window;

//         if (solana) {
//             if (solana.isPhantom) {
//                 console.log("Phantom wallet found!");

//                 /*
//                  * The solana object gives us a function that will allow us to connect
//                  * directly with the user's wallet!
//                  */
//                 const response = await solana.connect({ onlyIfTrusted: true });
//                 console.log(
//                     "Connected with Public Key:",
//                     response.publicKey.toString()
//                 );
//                 address = response;
//             }
//         } else {
//             console.log("No phantom wallet");
//         }
//     } catch (error) {
//         console.error(error);
//     }
//     return address;
// };

// // Connect to the wallet. Will make an active request and prompt the user
// const connectSolana = async () => {
//     let address = "";
//     const { solana } = window;

//     if (solana) {
//         const response = await solana.connect();
//         console.log("Connected with Public Key:", response.publicKey.toString());
//         // setWalletAddress(response.publicKey.toString());
//         address = response;
//     }
//     return address;
// };

// Check if we have an existing solana account. Passive request
// TODO: GET RID OF ANY
const checkSolanaConnection = async () => {
    let address = null;
    try {
        const { solana } = window;

        if (solana) {
            if (solana.isPhantom) {
                console.log("Phantom wallet found!");

                /*
                 * The solana object gives us a function that will allow us to connect
                 * directly with the user's wallet!
                 */
                const response = await solana.connect({ onlyIfTrusted: true });
                console.log(
                    "Connected with Public Key:",
                    response.publicKey.toString()
                );
                address = response;
            }
        } else {
            console.log("No phantom wallet");
        }
    } catch (error) {
        console.error(error);
    }
    return address;
};

// Connect to the wallet. Will make an active request and prompt the user
// TODO: GET RID OF ANY
const connectSolana = async () => {
    let address= null;
    const { solana } = window;

    if (solana) {
        // The response will be a KeyPair...?
        const response = await solana.connect();
        console.log("Connected with Public Key:", response.publicKey.toString());
        // setWalletAddress(response.publicKey.toString());
        address = response;
    }
    return address;
};

export { checkSolanaConnection, connectSolana };
