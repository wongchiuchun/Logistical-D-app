var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = "depend dilemma lend brick pill horror salad wife uphold tiny arctic elder";

module.exports = {
networks: {
  development: {
   host: "127.0.0.1",
   port: 7545,
   network_id: "*" // Match any network id
 },
 rinkeby: {
  provider: function() {
 return new HDWalletProvider(mnemonic,"<input infura API link>")
     },
      network_id: '4',
      gas: 4500000,
      gasPrice: 10000000000,
    }
   }
 };