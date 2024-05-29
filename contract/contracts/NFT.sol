// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTMarketplace is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;
    mapping(uint256 => uint256) private _tokenPrices;

    event TokenMinted(uint256 tokenId, address owner, string tokenURI);
    event TokenPriceSet(uint256 tokenId, uint256 price);
    event TokenBought(uint256 tokenId, address buyer, uint256 price);

    constructor() ERC721("NERVERLAND", "NVLD") Ownable(msg.sender) {}

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _tokenIds += 1;

        emit TokenMinted(newItemId, recipient, tokenURI);
        return newItemId;
    }

    function setTokenPrice(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Only the owner can set the price");
        _tokenPrices[tokenId] = price;

        emit TokenPriceSet(tokenId, price);
    }

    function buyNFT(uint256 tokenId) public payable {
        uint256 price = _tokenPrices[tokenId];
        address owner = ownerOf(tokenId);

        require(price > 0, "This token is not for sale");
        require(msg.value == price, "Incorrect value sent");

        _transfer(owner, msg.sender, tokenId);
        payable(owner).transfer(msg.value);
        _tokenPrices[tokenId] = 0;

        emit TokenBought(tokenId, msg.sender, price);
    }

    function getTokenPrice(uint256 tokenId) public view returns (uint256) {
        return _tokenPrices[tokenId];
    }
}