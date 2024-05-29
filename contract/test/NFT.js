const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarketplace", function () {
    let NFTMarketplace, nftMarketplace, owner, addr1, addr2;

    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        // Deploy the contract
        nftMarketplace = await NFTMarketplace.deploy();
        await nftMarketplace.deployed();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await nftMarketplace.owner()).to.equal(owner.address);
        });
    });

    describe("Minting NFTs", function () {
        it("Should let the owner mint an NFT", async function () {
            const tokenURI = "https://example.com/nft1";
            await expect(nftMarketplace.mintNFT(addr1.address, tokenURI))
                .to.emit(nftMarketplace, "TokenMinted")
                .withArgs(0, addr1.address, tokenURI);

            expect(await nftMarketplace.ownerOf(0)).to.equal(addr1.address);
            expect(await nftMarketplace.tokenURI(0)).to.equal(tokenURI);
        });

        it("Should fail if non-owner tries to mint", async function () {
            const tokenURI = "https://example.com/nft2";
            await expect(
                nftMarketplace.connect(addr1).mintNFT(addr1.address, tokenURI)
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("Setting Token Prices", function () {
        it("Should let the owner set the token price", async function () {
            const tokenURI = "https://example.com/nft3";
            await nftMarketplace.mintNFT(owner.address, tokenURI);

            const tokenId = 0;
            const price = ethers.utils.parseEther("1");
            await expect(nftMarketplace.setTokenPrice(tokenId, price))
                .to.emit(nftMarketplace, "TokenPriceSet")
                .withArgs(tokenId, price);

            expect(await nftMarketplace.getTokenPrice(tokenId)).to.equal(price);
        });

        it("Should fail if non-owner tries to set the price", async function () {
            const tokenURI = "https://example.com/nft4";
            await nftMarketplace.mintNFT(owner.address, tokenURI);

            const tokenId = 0;
            const price = ethers.utils.parseEther("1");
            await expect(
                nftMarketplace.connect(addr1).setTokenPrice(tokenId, price)
            ).to.be.revertedWith("Only the owner can set the price");
        });
    });

    describe("Buying NFTs", function () {
        it("Should let someone buy an NFT", async function () {
            const tokenURI = "https://example.com/nft5";
            await nftMarketplace.mintNFT(owner.address, tokenURI);

            const tokenId = 0;
            const price = ethers.utils.parseEther("1");
            await nftMarketplace.setTokenPrice(tokenId, price);

            await expect(
                nftMarketplace.connect(addr1).buyNFT(tokenId, { value: price })
            )
                .to.emit(nftMarketplace, "TokenBought")
                .withArgs(tokenId, addr1.address, price);

            expect(await nftMarketplace.ownerOf(tokenId)).to.equal(addr1.address);
            expect(await nftMarketplace.getTokenPrice(tokenId)).to.equal(0);
        });

        it("Should fail if the NFT is not for sale", async function () {
            const tokenURI = "https://example.com/nft6";
            await nftMarketplace.mintNFT(owner.address, tokenURI);

            const tokenId = 0;
            const price = ethers.utils.parseEther("1");

            await expect(
                nftMarketplace.connect(addr1).buyNFT(tokenId, { value: price })
            ).to.be.revertedWith("This token is not for sale");
        });

        it("Should fail if the incorrect value is sent", async function () {
            const tokenURI = "https://example.com/nft7";
            await nftMarketplace.mintNFT(owner.address, tokenURI);

            const tokenId = 0;
            const price = ethers.utils.parseEther("1");
            await nftMarketplace.setTokenPrice(tokenId, price);

            await expect(
                nftMarketplace.connect(addr1).buyNFT(tokenId, { value: ethers.utils.parseEther("0.5") })
            ).to.be.revertedWith("Incorrect value sent");
        });
    });
});