# ETHEREUM WALLETS MINING

## Description

This code generates seed phrases, derives the private key and address from each seed phrase, and checks the balance of the generated address. If the balance is greater than 0, the script stops execution. Then you can access the funded address and connect to it by typing the seed phrase in a wallet like MetaMask. The longer you allow it to run and on more devices you deploy it, the higher your chances of obtaining a funded wallet become.

## Installation

1. Clone the repository or download the code files.
2. Install Node.js if not already installed.
3. Install alchemy-sdk:
   ```bash
   npm install alchemy-sdk
   ```
5. Install required packages using npm:
   ```bash
   npm install bip39 ethers
   ```

## Usage

1. Replace the placeholder `"YOUR_KEY"` in the code with your own key. If you don't have one, you can contact the developer at oundel.store@gmail.com for assistance.
2. Run the script using Node.js:
   ```bash
   node index.js
   ```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
