pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'ConsumerRole' to manage this role - add, remove, check
contract ConsumerRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event ConsumerAdded (address indexed account);
  event ConsumerRemoved (address indexed account);

  // Define a struct 'consumers' by inheriting from 'Roles' library, struct Role
  Roles.Role private consumers;

  //set a variable to define contract owners
  address owner;

  // In the constructor make the address that deploys this contract the 1st consumer, also setting it as contract owner
  constructor() public {
    _addConsumer(msg.sender);
    owner = msg.sender;
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyConsumer() {
    require(isConsumer(msg.sender));
    _;
  }

  // Modifier to allow only the contract owner to perform certain action
  modifier onlyCOwner() {
    require(msg.sender == owner);
    _;
  }

  // Define a function 'isConsumer' to check this role
  function isConsumer(address account) public view returns (bool) {
    return consumers.has(account);
  }

  // Define a function 'addConsumer' that adds this role
  function addConsumer(address account) public onlyConsumer {
    _addConsumer(account);
  }

  // Define a function 'renounceConsumer' to renounce this role
  function renounceConsumer() public {
    _removeConsumer(msg.sender);
  }

  // Define a function 'removeConsumer' to remove this role by contract owner only
  function removeConsumer(address _address) public onlyCOwner {
    _removeConsumer(_address);
  }

  // Define an internal function '_addConsumer' to add this role, called by 'addConsumer'
  function _addConsumer(address account) internal {
    consumers.add(account);
    emit ConsumerAdded(account);
  }

  // Define an internal function '_removeConsumer' to remove this role, called by 'removeConsumer'
  function _removeConsumer(address account) internal {
    consumers.remove(account);
    emit ConsumerRemoved(account);
  }
}