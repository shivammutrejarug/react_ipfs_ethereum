pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol";

contract User is ERC721Full {
  struct UserData {
    string name;
    uint age;
    string sex;
    string genome; //this needs to be unique. Using a random id for now.
  }
  UserData[] public users;
  mapping (string => bool) _userExists;
  mapping (address => UserData) public usersNFT;

  constructor() ERC721Full("User", "USER") public {
  }

  function mint(string memory _userName, uint _userAge, string
    memory _userSex, string memory _userGenome) public {
      require(!_userExists[_userGenome]);
      UserData memory newUser = UserData({
        name: _userName,
        age: _userAge,
        sex: _userSex,
        genome: _userGenome
        });
      uint _id = users.push(newUser);
      _mint(msg.sender, _id);
      _userExists[_userGenome] = true;
      usersNFT[msg.sender] = newUser;
  }

}
