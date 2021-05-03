pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";


contract Users is ERC721PresetMinterPauserAutoId {

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

  constructor() ERC721PresetMinterPauserAutoId("User", "USER", "http://localhost:3000/") {
  }


  /* Just mint one token i.e. the original token */
  function mintNFT(string memory _userName, uint _userAge, string
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

      refUsers.push(newUser);
    //   _mint(msg.sender, _id);
      mint(msg.sender);
      _userExists[_userGenome] = true;
      usersNFT[msg.sender] = newUser;


    }

  /* When user wants to share a token, a new token is minted and
  transferred to the receiver.*/
  function transferNFT(address from, address to, uint256 tokenId) public {
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

    refUsers.push(newToken);
    mint(msg.sender);

    ERC721.safeTransferFrom(from, to, tokenId);
    sharedWithMap[tokenId] = to;
    usersNFT[to] = newToken;

  }

}
