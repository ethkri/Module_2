# Avirbhav

This Solidity program encapsulates the code for an event management system, where the admin and add and remove teams and the scores can be updated and
tracked accordingly.

## Description

This solidity program offers the admin of the program to organize an event by
creating teams and managing scores of the teams and fetching the team scores,
also, it let's the admin to remove teams from the event.

### Getting Started

To interact with the contract, you can start-off by cloning this repo and running

```
npm i
```

in the terminal to install all the dependencies required.

To compile the code, run:

```
npx hardhat compile
```

To deploy the code locally on the harhdat network, run:

```
npx hardhat node
```

and then run:

```
npx hardhat run --network localhost scripts/deploy.js
```

and then open another terminal to interact with the Token smart contract, type in the terminal

```
npm run dev
```

to launch the front-end.

The project is deployed on the mumbai polygon blockchain, on this address

```
0xF03E8065a7F7ddA1780103372298a3dB1f62656C
```

### Authhors

Kritika Joshi

### License

This project is licensed under the MIT License - see the LICENSE.md file for details
