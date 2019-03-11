// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
var SupplyChain = artifacts.require('SupplyChain')

contract('SupplyChain', async function(accounts) {

    describe('functions work', () => { 
        it('farmer can harvest item', async function () { 
            this.contract = await SupplyChain.deployed()
            await this.contract.addFarmer(accounts[1]);
            await this.contract.harvestItem(123, "AK", "Info", "Notes", 100, {from: accounts[1]});
            const results = await this.contract.fetchItemFarmer.call(123);
            assert.equal(results[3],accounts[1])
            
       })

        it('same item cannot be added twice', async function () { 
            let Err;
            let Errmsg = 'Error: VM Exception while processing transaction: revert';
            this.contract = await SupplyChain.deployed()
            await this.contract.harvestItem(123, "AK", "Infosdffd", "Notesfds", 100, {from: accounts[1]}).catch(error => {Err = error.toString()});
            assert.equal(Err, Errmsg)
       })

        it('wholesaler can buy harvested item', async function () { 
            await this.contract.addWholesaler(accounts[2]);
            await this.contract.BuyWhole(123, {from: accounts[2], value: 100});
            const results = await this.contract.fetchItemFarmer.call(123);
            assert.equal(results[2],accounts[2])
            
        })

        it('farmer can ship item', async function () { 
            await this.contract.ShippedWhole(123, {from: accounts[1]});
            const results2 = await this.contract.fetchItemLogistics.call(123)
            assert.equal(results2[3], 2)
            
        })

        it('wholesaler can mark item received', async function () { 
            await this.contract.WholeReceived(123, {from: accounts[2]});
            const results2 = await this.contract.fetchItemLogistics.call(123)
            assert.equal(results2[3], 3)
            
        })

        it('wholesaler can package item', async function () { 
            await this.contract.isPackaged(123, 110, {from: accounts[2]});
            const results2 = await this.contract.fetchItemLogistics.call(123)
            assert.equal(results2[3], 4)
            
        })

        it('retailer can buy item', async function () { 
            await this.contract.addRetailer(accounts[3]);
            await this.contract.BuyRe(123, {from: accounts[3], value: 110});
            const results = await this.contract.fetchItemFarmer.call(123);
            assert.equal(results[2],accounts[3])
            
        })

        it('wholesaler can ship item', async function () { 
            await this.contract.ShippedRe(123, {from: accounts[2]});
            const results2 = await this.contract.fetchItemLogistics.call(123)
            assert.equal(results2[3], 6)
            
        })

        it('retailer can mark item received', async function () { 
            await this.contract.ReReceived(123, 120, {from: accounts[3]});
            const results2 = await this.contract.fetchItemLogistics.call(123)
            assert.equal(results2[3], 7)
            
        })
        
        it('retailer can buy item', async function () { 
            await this.contract.addConsumer(accounts[4]);
            await this.contract.Buy(123, {from: accounts[4], value: 120});
            const results = await this.contract.fetchItemFarmer.call(123);
            assert.equal(results[2],accounts[4])
            
        })
        
        it('can fetch item Farmer Info', async function () { 
            const results = await this.contract.fetchItemFarmer.call(123);
            assert.equal(results[0],1);
            assert.equal(results[1],123);
            assert.equal(results[2],accounts[4]);
            assert.equal(results[3],accounts[1]);
            assert.equal(results[4],"AK");
            assert.equal(results[5],"Info");
            assert.equal(results[6],"Notes");
        })
        
        it('can fetch item Logistics Info', async function () { 
            const results = await this.contract.fetchItemLogistics.call(123);
            assert.equal(results[0],1);
            assert.equal(results[1],123);
            assert.equal(results[2],120);
            assert.equal(results[3],8);
            assert.equal(results[4],accounts[1]);
            assert.equal(results[5],accounts[2]);
            assert.equal(results[6],accounts[3]);
            assert.equal(results[7],accounts[4]);
        })

        it('owner can change price of an item', async function () {
            await this.contract.SetPrice(123, 999, {from: accounts[4]});
            const results = await this.contract.fetchItemLogistics.call(123);
            assert.equal(results[2],999);

        })

        it('can transfer ownership', async function () {
            await this.contract.transferOwnership(accounts[6]);
            assert.equal(await this.contract.contractowner(),accounts[6])
        })
    })
    
});

var ConsumerRole = artifacts.require('ConsumerRole');

contract ('ConsumerRole', async function(accounts) {
    describe ('can add and remove role', () => {
        it('owner can add role', async function () {
            this.contract = await ConsumerRole.deployed();
            await this.contract.addConsumer(accounts[5]);
            assert.equal(await this.contract.isConsumer(accounts[5]),true);
        }) 

        it('owner can remove role', async function(){
            await this.contract.removeConsumer(accounts[5]);
            assert.equal(await this.contract.isConsumer(accounts[5]),false);
        })
    })
})

var RetailerRole = artifacts.require('RetailerRole');

contract ('RetailerRole', async function(accounts) {
    describe ('can add and remove role', () => {
        it('owner can add role', async function () {
            this.contract = await RetailerRole.deployed();
            await this.contract.addRetailer(accounts[5]);
            assert.equal(await this.contract.isRetailer(accounts[5]),true);
        }) 

        it('owner can remove role', async function(){
            await this.contract.removeRetailer(accounts[5]);
            assert.equal(await this.contract.isRetailer(accounts[5]),false);
        })
    })
})

var FarmerRole = artifacts.require('FarmerRole');

contract ('FarmerRole', async function(accounts) {
    describe ('can add and remove role', () => {
        it('owner can add role', async function () {
            this.contract = await FarmerRole.deployed();
            await this.contract.addFarmer(accounts[5]);
            assert.equal(await this.contract.isFarmer(accounts[5]),true);
        }) 

        it('owner can remove role', async function(){
            await this.contract.removeFarmer(accounts[5]);
            assert.equal(await this.contract.isFarmer(accounts[5]),false);
        })
    })
})

var WholesalerRole = artifacts.require('WholesalerRole');

contract ('WholesalerRole', async function(accounts) {
    describe ('can add and remove role', () => {
        it('owner can add role', async function () {
            this.contract = await WholesalerRole.deployed();
            await this.contract.addWholesaler(accounts[5]);
            assert.equal(await this.contract.isWholesaler(accounts[5]),true);
        }) 

        it('owner can remove role', async function(){
            await this.contract.removeWholesaler(accounts[5]);
            assert.equal(await this.contract.isWholesaler(accounts[5]),false);
        })
    })
})
//harvest item
//wholesaler can buy
//farmer can shipped
//wholesaler can received
//wholesaler can packaged
//retailer can buy
//wholesaler can ship
//retailer can receive
//consumer can buy
//can fetch item1 
//can fetch item2
