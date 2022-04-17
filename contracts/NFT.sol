// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "../client/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../client/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
contract NFT is ERC721, ERC721Enumerable  {

constructor() ERC721("VANITH NFT", "VNFT"){

}
    
    string[] public items;
    mapping(string => bool) private itemExits;

    function mint_NFT(string memory _item) public {
     require(!itemExits[_item]);
     items.push(_item);
     itemExits[_item]=true;
     uint _id=items.length-1;
     _mint(msg.sender,_id );

    }
   function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}

