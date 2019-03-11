pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'RetailerRole' to manage this role - add, remove, check
contract RetailerRole {
  
  // using x for a type, allow rewrite of a frunction 
  using Roles for Roles.Role;

  //define a variable for contract owner address
  address owner;

  // Define 2 events, one for Adding, and other for Removing
  // indexed to allow event to be searched for
  event RetailerAdded(address indexed account);
  event RetailerRemoved(address indexed account);
  
  // Define a struct 'retailer' by inheriting from 'Roles' library, struct Role

  Roles.Role private retailer;

  // In the constructor make the address that deploys this contract the 1st retailer and as the contract owner
  constructor() public {
    _addRetailer(msg.sender);
    owner = msg.sender;
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyRetailer() {
    require(isRetailer(msg.sender));
    _;
  }

  //Modifier to check only contract owner only
  modifier onlyCOwner() {
    require(msg.sender == owner);
    _;
  }

  // Define a function 'isRetailer' to check this role
  function isRetailer(address account) public view returns (bool) {
    return retailer.has(account);
  }

  // Define a function 'addRetailer' that adds this role
  function addRetailer(address account) public onlyRetailer {
    _addRetailer(account);
  }

  // Define a function 'renounceRetailer' to renounce this role
  function renounceRetailer() public {
    _removeRetailer(msg.sender);
  }

  // Define a function 'removeRetailer' to remove this role by contract owner only
  function removeRetailer(address _address) public onlyCOwner {
    _removeRetailer(_address);
  }

  // Define an internal function '_addRetailer' to add this role, called by 'addRetailer'
  function _addRetailer(address account) internal {
    retailer.add(account);
    emit RetailerAdded(account);
  }

  // Define an internal function '_removeRetailer' to remove this role, called by 'removeRetailer'
  function _removeRetailer(address account) internal {
    retailer.remove(account);
    emit RetailerRemoved(account);
  }
}