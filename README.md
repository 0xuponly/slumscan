# slumscan
This project is a block explorer for eth L1 (mainnet). It uses the AlchemySDK to send JSON-RPC requests to eth mainnet nodes and display the relevant information in the form of a React app (the functions used from the AlchemySDK primarily use wrapped `ethers.js` functions).

To get started:
- Clone the project.
- Navigate to the base directory of the project and run `npm install`
- Create an empty `.env` file in the base directory of this project. Add `REACT_APP_ALCHEMY_API_KEY=YOUR_ALCHEMY_API_KEY` to the `.env` file replacing `YOUR_ALCHEMY_API_KEY` with your own api key. Do not remove the `REACT_APP_` prefix. React uses that to import env variables.
- Start the webserver with `npm start` (Open [http://localhost:3000] to view it in your browser.)
