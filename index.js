const bip39 = require("bip39");
const ethers = require("ethers");
const { Alchemy, Network } = require("alchemy-sdk");

const config = {
  apiKey: "YOUR_KEY", // Contact me at oundel.store@gmail.com if you need a key or help
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

async function generateRandomSeedPhrase() {
  // Generate a random seed phrase

  const mnemonic = bip39.generateMnemonic();
  const wallet = ethers.Wallet.fromPhrase(mnemonic);

  // Generate a the private key and address from the seed phrase

  const privateKey = wallet.privateKey;
  const address = wallet.address;
  console.log(`Generated Seed Phrase: ${mnemonic}`);
  console.log(`Private Key: ${privateKey}`);
  console.log(`Address: ${address}`);

  // Fetch balances for the generated address

  try {
    const balances = await alchemy.core.getTokenBalances(address);
    const nonZeroBalances = balances.tokenBalances.filter((token) => {
      return token.tokenBalance !== "0";
    });

    console.log(`Token balances of ${address} \n`);

    let i = 1;
    for (let token of nonZeroBalances) {
      let balance = token.tokenBalance;
      const metadata = await alchemy.core.getTokenMetadata(
        token.contractAddress
      );
      balance = balance / Math.pow(10, metadata.decimals);
      balance = balance.toFixed(2);
      console.log(`${i++}. ${metadata.name}: ${balance} ${metadata.symbol}`);
      if (balance > 0) {
        console.log("Balance is greater than 0");

        //then stop the script if balance is greater than 0

        process.exit(0);
      }
    }
  } catch (error) {
    console.error("Error fetching token balances:", error);
  }

  return address;
}

function executeWithCooldown() {
  generateRandomSeedPhrase();
  setTimeout(executeWithCooldown, 300);
}

executeWithCooldown();
