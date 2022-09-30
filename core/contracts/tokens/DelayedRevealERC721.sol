//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ConsumableERC721 is ERC721Enumerable, ERC721URIStorage {
    uint256 public constant SALE_LIMIT = 9000;
    uint256 public constant PRICE = 0.1 ether;
    bytes16 internal constant ALPHABET = '0123456789abcdef';
    b
    address public owner;
    address public pendingOwner;
    uint256 public sold;
    bool public saleIsActive = true;
    address public signer;

    constructor(
        string memory _name,
        string memory _symbol,
        address memory _signer
    ) ERC721(_name, _symbol, _signer) {
        owner = msg.sender;
        symbol = _symbol;
        signer = _signer;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function!");
        _;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable) {
        ERC721Enumerable._beforeTokenTransfer(from, to, tokenId);
    }

    function mintNFT(uint _amount) public {
        uint256 tokenId = totalSupply();
        string memory _tokenURI = string(abi.encodePacked("https://encounter.station0x.com/api/tokens/", "/", toString(tokenId), ".json"));
        mint(msg.sender, tokenId, _tokenURI, "");
    }

    function mint(address to, uint256 tokenId, string memory _tokenURI, bytes memory _data) internal {
        _safeMint(to, tokenId, _data);
        _setTokenURI(tokenId, _tokenURI);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public onlyOwner {
        _setTokenURI(tokenId, _tokenURI);
    }

    function setTokenURIForAll(string memory _baseURI) public onlyOwner {
        for(uint tokenId=0; tokenId<totalSupply(); tokenId++) {
            string memory _tokenURI = string(abi.encodePacked(_baseURI, toString(totalSupply()), ".json"));
            _setTokenURI(tokenId, _tokenURI);
        }
    }

    function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        return ERC721URIStorage.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable, ERC721) returns (bool) {
        return ERC721Enumerable.supportsInterface(interfaceId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        ERC721URIStorage._burn(tokenId);
    }

    // Inspired by OraclizeAPI's implementation - MIT licence
    // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
        return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
        digits++;
        temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
        digits -= 1;
        buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
        value /= 10;
        }
        return string(buffer);
    }

    function verifyHash(bytes32 _hash, uint8 _v, bytes32 _r, bytes32 _s) internal pure returns (address _signer) {
        bytes32 messageDigest = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _hash));
        return ecrecover(messageDigest, _v, _r, _s);
    }

    function setPendingOwner(address newOwner_) public onlyOwner {
        pendingOwner = newOwner_;
    }

    function claimOwner() public {
        require(msg.sender == pendingOwner, "ONLY PENDING OPERATOR");
        owner = pendingOwner;
        pendingOwner = address(0);
        emit ChangeOwner(owner);
    }

    function changeSigner(address _newSigner) public onlyOwner {
        signer = _newSigner;
        emit ChangeSigner(_newSigner);
    }

    event ChangeOwner(address);
    event ChangeSigner(address);
}