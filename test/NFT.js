const NFT = artifacts.require("./NFT.sol");

contract("NFT", accounts => {

let contract;
  before(async()=>{
    contract = await NFT.deployed();
  });

  it("...contract is deployed", async () => {
     
     assert.notEqual(contract,'');
  });
  it("minted added in blockchain", async () => {
    const result= await contract.mint_NFT('alex');
    let items = await contract.items(0);
    assert(items,'alex');
 });

});