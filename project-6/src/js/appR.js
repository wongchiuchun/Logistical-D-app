App = {
    web3Provider: null,
    contracts: {}, 
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    productNotes: null,
    productPrice: 0,
    wholesalerID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",
    address: "0x0000000000000000000000000000000000000000",

    init: async function () {
        /// Setup access to blockchain
        return await App.initWeb3();
    },



    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            console.log('getMetaskID:',res);
            App.metamaskAccountID = res[0];
            accounts = res;

        })
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='build/contracts/SupplyChain.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            console.log('data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            
        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);

        switch(processId) {
            case 1:
                return await App.harvestItem(event);
                break;
            case 2:
                return await App.BuyWhole(event);
                break;
            case 3:
                return await App.BuyRe(event);
                break;
            case 4:
                return await App.Buy(event);
                break;
            case 5:
                return await App.ShippedWhole(event);
                break;
            case 6:
                return await App.ShippedRe(event);
                break;
            case 7:
                return await App.WholeReceived(event);
                break;
            case 8:
                return await App.isPackaged(event);
                break;
            case 9:
                return await App.fetchItemFarmer(event);
                break;
            case 10:
                return await App.fetchItemLogistics(event);
                break;
            case 11:
                return await App.ReReceived(event);
                break;
            case 12:
                return await App.SetPrice(event);
                break;
            case 99:
                return await App.addFarmer(event);
                break;
            case 98:
                return await App.addWholesaler(event);
                break;
            case 97:
                return await App.addRetailer(event);
                break;
            case 96:
                return await App.addConsumer(event);
                break;    
            }
    },

    harvestItem: function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.upc = $("#upcf").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();

        console.log(
            App.upc,
            App.originFarmName, 
            App.originFarmInformation, 
            App.productNotes,
            App.productPrice,
            App.metamaskAccountID,);
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.harvestItem(
                App.upc,  
                App.originFarmName, 
                App.originFarmInformation, 
                App.productNotes,
                App.productPrice,
                {from: App.metamaskAccountID, gas:3000000}
            );
        }).then(function(result) {
            sresult = JSON.stringify(result);
            $("#ftc-item").text(sresult);
            console.log('harvestItem',result);
        }).catch(function(err) {
            console.log(err.message);
            $("#ftc-item").text(err)
        });
    },

    BuyWhole: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.upc = $("#upcb").val();
        App.productPrice = $("#productpriceB").val();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.BuyWhole(App.upc, {from: App.metamaskAccountID, value: App.productPrice ,gas:3000000});
        }).then(function(result) {
            sresult = JSON.stringify(result);
            $("#ftc-item").text(sresult);
            console.log('Item bought',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    BuyRe: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.upc = $("#upcb").val();
        App.productPrice = $("#productpriceB").val();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.BuyRe(App.upc, {from: App.metamaskAccountID, value: App.productPrice ,gas:3000000});
        }).then(function(result) {
            sresult = JSON.stringify(result);
            $("#ftc-item").text(sresult);
            console.log('Item bought',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    Buy: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.upc = $("#upcb").val();
        App.productPrice = $("#productpriceB").val();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.Buy(App.upc, {from: App.metamaskAccountID, value: App.productPrice ,gas:3000000});
        }).then(function(result) {
            sresult = JSON.stringify(result);
            $("#ftc-item").text(sresult);
            console.log('Item bought',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    isPackaged: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.upc = $("#upcP").val();
        App.productPrice = $("#productpriceP").val();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.isPackaged(App.upc, App.productPrice, {from: App.metamaskAccountID, gas:3000000});
        }).then(function(result) {
            sresult = JSON.stringify(result);
            $("#ftc-item").text(sresult);
            console.log('Item Packaged',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    SetPrice: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.upc = $("#upcP").val();
        App.productPrice = $("#productpriceP").val();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.SetPrice(App.upc, App.productPrice, {from: App.metamaskAccountID, gas:3000000});
        }).then(function(result) {
            sresult = JSON.stringify(result);
            $("#ftc-item").text(sresult);
            console.log('Item Packaged',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    ShippedWhole: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.upc = $("#upcS").val();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.ShippedWhole(App.upc, {from: App.metamaskAccountID, gas:3000000});
        }).then(function(result) {
            sresult = JSON.stringify(result);
            $("#ftc-item").text(sresult);
            console.log('Item shipped',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    WholeReceived: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.upc = $("#upcS").val();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.WholeReceived(App.upc, {from: App.metamaskAccountID, gas:3000000});
        }).then(function(result) {
            sresult = JSON.stringify(result);
            $("#ftc-item").text(sresult);
            console.log('Item received',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    ShippedRe: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.upc = $("#upcS").val();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.ShippedRe(App.upc, {from: App.metamaskAccountID, gas:3000000});
        }).then(function(result) {
            sresult = JSON.stringify(result);
            $("#ftc-item").text(sresult);
            console.log('Item shipped',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    ReReceived: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.upc = $("#upcS").val();
        App.productPrice = $("#productpriceR").val();

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.ReReceived(App.upc, App.productPrice, {from: App.metamaskAccountID, gas:3000000});
        }).then(function(result) {
            sresult = JSON.stringify(result);
            $("#ftc-item").text(sresult);
            console.log('Item received',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    
    fetchItemFarmer: function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc',App.upc);

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemFarmer(App.upc);
        }).then(function(result) {
          sku = result[0];
          upc = result[1];
          ownerID = result[2];
          FarmerID = result[3];
          FarmName = result[4];
          FarmInfo = result[5];
          ProductN = result[6];
          console.log('Product Farm Information', result);
          $("#ftc-item1").text('sku: ' + sku + " " + 'upc: ' + upc + "\n" + 'owner ID: '+ ownerID + "\n" + 'Farmer ID: ' + FarmerID + "\n" + 'Farm Name: ' + FarmName  + "\n" + 'Farm Info: '+ FarmInfo  + "\n" + 'Product Notes: ' + ProductN);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchItemLogistics: function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc',App.upc);    
    
        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemLogistics(App.upc);
        }).then(function(result) {
            sku = result[0];
            upc = result[1];
            ProductP = result[2];
            ItemState = result[3];
            FarmerID = result[4];
            WholeID = result[5];
            ReID = result[6];
            ConID = result[7];
            $("#ftc-item1").text('sku: ' + sku + " " + 'upc: ' + upc + " " + 'Produce Price: '+ ProductP + "\n" + 'Item State: ' + ItemState + " " + 'Farmer ID: ' + FarmerID + "\n" + 'Wholesaler ID: ' + WholeID  + "\n" + 'Retailer ID: '+ ReID  + "\n" + 'Consumer ID: ' + ConID);
          //sresult = JSON.stringify(result);  
          //$("#ftc-item1").text(sresult);
          console.log('Product Logistics Information', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    addFarmer: function () {
        App.address = $('#address').val();
        console.log(App.address);
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.addFarmer(App.address, {from: App.metamaskAccountID});
          }).then(function(result) {
            sresult = JSON.stringify(result);  
            $("#ftc-item").text(sresult);
            console.log('Farmer Role Added', result);
          }).catch(function(err) {
            console.log(err.message);
          });
    },

    addWholesaler: function () {
        App.address = $('#address').val();
        console.log(App.address);
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.addWholesaler(App.address, {from: App.metamaskAccountID});
          }).then(function(result) {
            sresult = JSON.stringify(result);  
            $("#ftc-item").text(sresult);
            console.log('Wholesaler Role Added', result);
          }).catch(function(err) {
            console.log(err.message);
          });
    },

    addRetailer: function () {
        App.address = $('#address').val();
        console.log(App.address);
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.addRetailer(App.address, {from: App.metamaskAccountID});
          }).then(function(result) {
            sresult = JSON.stringify(result);  
            $("#ftc-item").text(sresult);
            console.log('Retailer Role Added', result);
          }).catch(function(err) {
            console.log(err.message);
          });
    },

    addConsumer: function () {
        App.address = $('#address').val();
        console.log(App.address);
        
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.addConsumer(App.address, {from: App.metamaskAccountID});
          }).then(function(result) {
            sresult = JSON.stringify(result);  
            $("#ftc-item").text(sresult);
            console.log('Consumer Role Added', result);
          }).catch(function(err) {
            console.log(err.message);
          });
    },   

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
          if (!err)
            $("#ftc-item").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
          console.log(err.message);
        });


        
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
