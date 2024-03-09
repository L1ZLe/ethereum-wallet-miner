const bip39 = require("bip39");
const ethers = require("ethers");

const Key = "yOUR_KEY"; // Contact me at oundel.store@gmail.com if you need a key or help

function generateRandomSeedPhrase() {
  // Generate a random seed phrase

  const mnemonic = bip39.generateMnemonic();
  const wallet = ethers.Wallet.fromPhrase(mnemonic);

  // Generate a the private key and address from the seed phrase

  const privateKey = wallet.privateKey;
  const address = wallet.address;
  console.log(`Generated Seed Phrase: ${mnemonic}`);
  console.log(`Private Key: ${privateKey}`);
  console.log(`Address: ${address}`);
  const url = `${"https://api.etherscan.io/api"}?module=account&action=balance&address=${address}&tag=latest&apikey=${Key}`;

  // Fetch ETH balance for the generated address

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "1") {
        const balanceInWei = data.result;
        const balanceInEther = parseFloat(balanceInWei) / 10 ** 18;

        console.log(`Ether Balance: ${balanceInEther} ETH`);
        if (balanceInEther > 0) {
          console.log("Balance is greater than 0");

          //then stop the script if balance is greater than 0

          process.exit(0);
        }
      } else {
        console.error(`Error: ${data.message}`);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));

  return mnemonic;
}

function executeWithCooldown() {
  generateRandomSeedPhrase();
  setTimeout(executeWithCooldown, 300);
}

executeWithCooldown();
