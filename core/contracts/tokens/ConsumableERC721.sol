//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ConsumableERC721 is ERC721Enumerable, ERC721URIStorage {
    address public signer;
    address public operator;
    address public pendingOperator;
    string public class;
    uint256 public consumes;
    mapping(uint256 => NFTStats) public statsByTokenId;
    mapping(bytes32 => bool) public mintingSalt;
    mapping(address => bool) public consumers;

    struct NFTStats {
        uint256 consumesLeft;
        bytes data;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _class,
        uint256 _consumes
    ) ERC721(_name, _symbol) {
        operator = msg.sender;
        class = _class;
        consumes = _consumes;
    }

    modifier onlyOperator() {
        require(msg.sender == operator, "Only operator can call this function!");
        _;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable) {
        ERC721Enumerable._beforeTokenTransfer(from, to, tokenId);
    }

    function mintNFT(bytes32 _salt, bytes calldata _data, uint8 _v, bytes32 _r, bytes32 _s) public {
        require(mintingSalt[_salt] == false, "Salt already used before!");
        bytes32 _hash = keccak256(abi.encodePacked(msg.sender, _salt, _data));
        require(verifyHash(_hash, _v, _r, _s) == signer);
        uint256 tokenId = totalSupply();
        string memory _tokenURI = string(abi.encodePacked("https://encounter.station0x.com/api/tokens/", class, "/", toString(tokenId), ".json"));
        statsByTokenId[tokenId].consumesLeft = consumes;
        statsByTokenId[tokenId].data = _data;
        mint(msg.sender, tokenId, _tokenURI, "");
        mintingSalt[_salt] == true;
    }

    function burnNFT(uint256 _tokenId) internal { 
        require(_tokenId <= totalSupply(), "Token doesn't exist!");
        // reset nft stats
        statsByTokenId[_tokenId].consumesLeft = 0;
        statsByTokenId[_tokenId].data = "";
        _burn(_tokenId);
    }

    // Random burning not implemented yet
    function consumeNFT(uint256 _tokenId) public {
        require(consumers[msg.sender], "Caller is not a consumer!");
        require(_tokenId <= totalSupply(), "Token doesn't exist!");
        if(statsByTokenId[_tokenId].consumesLeft == 1) {
            burnNFT(_tokenId);
        } else {
            statsByTokenId[_tokenId].consumesLeft -= 1;
        }
    }

    function mint(address to, uint256 tokenId, string memory _tokenURI, bytes memory _data) internal {
        _safeMint(to, tokenId, _data);
        _setTokenURI(tokenId, _tokenURI);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public onlyOperator {
        _setTokenURI(tokenId, _tokenURI);
    }

    function setTokenURIForAll(string memory _baseURI) public onlyOperator {
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

    function setPendingOperator(address newOperator_) public onlyOperator {
        pendingOperator = newOperator_;
    }

    function claimOperator() public {
        require(msg.sender == pendingOperator, "ONLY PENDING OPERATOR");
        operator = pendingOperator;
        pendingOperator = address(0);
        emit ChangeOperator(operator);
    }

    function changeSigner(address _newSigner) public onlyOperator {
        signer = _newSigner;
        emit ChangeSigner(_newSigner);
    }

    function changeConsumes(uint256 _consumes) public onlyOperator {
        consumes = _consumes;
    }

    function getConsumesLeft(uint256 _tokenId) external view returns (uint256) {
        return statsByTokenId[_tokenId].consumesLeft;
    }

    function getData(uint256 _tokenId) external view returns (bytes memory) {
        return statsByTokenId[_tokenId].data;
    }

    event ChangeOperator(address);
    event ChangeSigner(address);
}