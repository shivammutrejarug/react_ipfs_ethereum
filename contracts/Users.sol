pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol";


contract Users is ERC721Full {

  enum Type { Original, Shareable }
  Type internal token_type;

  /* Use this struct to store information to the blockchain */
  struct RefUserData {
    uint originalTokenId;
    string name;
    uint age;
    string sex;
    string genome;
    address ownerAddress;
    address sharedWith;
    Type tokenType;
  }

  /* UserData[] public users; */
  RefUserData[] public refUsers;
  mapping (string => bool) _userExists;
  mapping (address => RefUserData) public usersNFT;
  mapping (uint => address) public sharedWithMap;
  /* SharedTokens[] public sharedWith */

  constructor() ERC721Full("User", "USER") public {
  }


  /* Just mint one token i.e. the original token */
  function mint(string memory _userName, uint _userAge, string
    memory _userSex, string memory _userGenome) public {
      require(!_userExists[_userGenome]);

      /* Create original token */
      RefUserData memory newUser = RefUserData({
        originalTokenId: 0,
        name: _userName,
        age: _userAge,
        sex: _userSex,
        genome: _userGenome,
        ownerAddress: msg.sender,
        sharedWith: msg.sender,
        tokenType: Type.Original
        });

      uint _id = refUsers.push(newUser);
      _mint(msg.sender, _id);
      _userExists[_userGenome] = true;
      usersNFT[msg.sender] = newUser;


    }

  /* When user wants to share a token, a new token is minted and
  transferred to the receiver.*/
  function transferFrom(address from, address to, uint256 tokenId) public {
    from = from;
    to = to;
    tokenId = tokenId;
    /* This is done because the arrays start with 0 */
    uint256 index = tokenId - 1;

    /* Fetch NFT information for a user from mapping */
    RefUserData memory newToken = RefUserData({
      originalTokenId: tokenId,
      name: refUsers[index].name,
      age: refUsers[index].age,
      sex: refUsers[index].sex,
      genome: refUsers[index].genome,
      ownerAddress: msg.sender,
      sharedWith: to,
      tokenType: Type.Shareable
      });

    uint _refId = refUsers.push(newToken);
    _mint(msg.sender, _refId);

    ERC721.transferFrom(from, to, _refId);
    sharedWithMap[tokenId] = to;
    usersNFT[to] = newToken;

  }

}
