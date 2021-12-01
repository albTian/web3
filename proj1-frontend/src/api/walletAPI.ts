// Used to check if we have metamask installed. Returns
const checkWalletConnection = async (): Promise<any> => {
  let account = null;
  try {
    // To check if we actually have metamask
    // const provider = (await detectEthereumProvider()) as any;
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return null;
    }

    // Check if we have authorization
    const accounts = await ethereum.request({ method: "eth_accounts" });

    // Get first account (?)
    if (accounts.length !== 0) {
      account = accounts[0];
      console.log("Found an authorized account:", account);
      // setCurrentAccount(account);
      // console.log(`currentAccount: ${currentAccount}`);
    } else {
      console.log("No authorized account found");
    }
  } catch (error) {
    console.log(error);
  }
  return account;
};

// Returns first account
const connectWallet = async (): Promise<any> => {
  let account = null;
  try {
    console.log("im here");

    // const provider = (await detectEthereumProvider()) as any;
    const { ethereum } = window;
    if (!ethereum) {
      // alert("Make sure you have metamask!");
      //   toast({
      //     title: "Make sure you have metamask!",
      //     description: "Get the chrome extension to connect your wallet",
      //     status: "error",
      //     duration: 9000,
      //     isClosable: true,
      //   });
      console.log("etheruum is null...?");
      return;
    }

    // Actual request to connect metamask account
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    account = accounts[0];
    console.log(`Connected to: ${account}`);
  } catch (error) {
    console.log(error);
  }
  return account;
};

export { checkWalletConnection, connectWallet };
