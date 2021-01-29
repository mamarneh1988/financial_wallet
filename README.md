notes need to be considered:

Make sure ganache is running.

Make sure metamask is running and connected to the ganache network.

Make sure truffe is installed correctly using their docs. https://www.trufflesuite.com/docs/truffle/getting-started/installation

once the files pulled into your local machine, run the below commands from the root folder where you installed the files: truffle migrate --reset

in order to run the UI application, follow the below steps:

npm install react-bootstrap bootstrap

npm install ipfs-api

npm install html-react-parser --save

truffle migrate --reset

change the current directory into the client folder:

cd client

then run the follwoing command:

npm run start

The default browser will open a new tab with the local server...it will ask to confirm the transaction from metamask.
