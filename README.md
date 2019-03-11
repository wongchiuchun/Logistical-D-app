# Supply chain & data auditing

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow from Farmer all the way to the consumer. 

Owner of the contract can assign the different roles to different addresses. 

The whole process consists of the following states:

    Harvested,  // 0
    WSold,  // 1
    WShipped,     // 2
    WReceived,    // 3
    Packaged,       // 4
    RSold,    // 5
    RShipped,   // 6
    RReceived,   // 7
    Sold         // 8

The DApp tracks the movement of the farm product across the logistic chain. The front end of the D-app has been configured to interact with the smart contracts.

The Owner of the contract can assign ownership to a different address. This is a function that has not been configured at the front-end. 

## Deployment to the Rinkeby Network

An instance of the contract deployed to the Rinkeby Network
Address: 0x7cfebb61c31ce78c01bcd56c0176dc265b702b81
Transaction ID: https://rinkeby.etherscan.io/tx/0x9055890da8f006958135bc3313e8e4f8d80aa3174bd97ccc6e32f61113aaf875


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for testing purposes. 

### Prerequisites

Please make sure you've already installed ganache-cli, Truffle and enabled MetaMask extension in your browser.


### Installing

A step by step series of examples that tell you have to get a development env running

Clone this repository:

Move into the folder

```
cd project-6
npm install
```

Launch Ganache:

```
ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
```

In a separate terminal window, Compile smart contracts:

```
truffle compile
```

This will create the smart contract artifacts in folder ```build\contracts```.

Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate
```

Test smart contracts:

```
truffle test
```

All tests should pass.

```
npm run dev
```

## Built With

* [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
* [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.


## Acknowledgments

* Solidity
* Ganache-cli
* Truffle


