pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'WholesalerRole' to manage this role - add, remove, check
contract WholesalerRole {
  
  using Roles for Roles.Role;
  //define a variable to store contract owner address
  address owner;
  // Define 2 events, one for Adding, and other for Removing
  event WholesalerAdded(address indexed account);
  event WholesalerRemoved(address indexed account);

  // Define a struct 'Wholesaler' by inheriting from 'Roles' library, struct Role
  Roles.Role private wholesaler;

  

  // In the constructor make the address that deploys this contract the 1st Wholesaler and contract owner
  constructor() public {
    _addWholesaler(msg.sender);
    owner = msg.sender;
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyWholesaler() {
    require(isWholesaler(msg.sender));
    _;
  }
  // Check if it is the contract owner 
  modifier onlyCOwner() {
    require(msg.sender == owner);
    _;
  }


  // Define a function 'isWholesaler' to check this role
  function isWholesaler(address account) public view returns (bool) {
    return wholesaler.has(account);
  }

  // Define a function 'addWholesaler' that adds this role
  function addWholesaler(address account) public onlyWholesaler() {
    _addWholesaler(account);
  }

  // Define a function 'renounceWholesaler' to renounce this role
  function renounceWholesaler() public {
    _removeWholesaler(msg.sender);
  }

  // Define a function 'removeWholesaler' to remove this role to be executed by the contract owner only
  function removeWholesaler(address _address) public onlyCOwner {
    _removeWholesaler(_address);
  }

  // Define an internal function '_addWholesaler' to add this role, called by 'addWholesaler'
  function _addWholesaler(address account) internal {
    wholesaler.add(account);
    emit WholesalerAdded(account);
  }

  // Define an internal function '_removeWholesaler' to remove this role, called by 'removeWholesaler'
  function _removeWholesaler(address account) internal {
    wholesaler.remove(account);
    emit WholesalerRemoved(account);
  }
}