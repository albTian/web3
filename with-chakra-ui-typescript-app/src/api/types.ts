// To allow TS to recognize that etherium can exist on window
declare global {
  interface Window {
    ethereum: any;
  }
}

export {}