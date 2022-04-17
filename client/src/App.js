import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import NFTContract from "./contracts/NFT.json";
import getWeb3 from "./getWeb3";
import NavBar from "./components/common/NavBar";
import "./App.css";
import NFT from "./components/NFT";

const App= ()=>{

  const [contract,setContract] =useState('');
  const [address,setAddress] =useState('');
  const [nftItems,setNFTItem] =useState([]);
  const [NFTCount,setNFTCount] =useState(0);
  const [error,setError] =useState(false);
  const [mintText, setMintText] = useState("");
  const [mintTexterror, setMintTexterror] = useState("");


const mint = () => {
  if(mintText)
  {
    contract.methods.mint_NFT(mintText).send({ from: address }, (error)=>{
      console.log(error)
      if(!error){
        setNFTItem([...nftItems, mintText])
        setMintText("");
      }
      else
      {
        if(error.code=='-32603')
        {
        setMintTexterror('Name is already in the blockchain');
      }
     if(error.code=='4001')
      {
        alert('transaction rejected by metamask');

      }
    }
      
    });
  }
  else
  {
    setMintTexterror('Please enter the name');
  }
};


// getting my metamask wallet address using web3
const loadWeb3Account = async (web3) =>{
  const accounts= await web3.eth.getAccounts();
  if(accounts)
  {
    setAddress(accounts[0]);
  }

};

// getting contract information
const loadWeb3Contract=async(web3)=>{
    const networkId = await web3.eth.net.getId();

const deployedNetwork=  NFTContract.networks[networkId];
if(deployedNetwork){
  const abi = NFTContract.abi;
  const address = deployedNetwork.address;
  const contract = new web3.eth.Contract(abi, address);
  setContract(contract);
  return contract;
}

  };


  // getting all the nft
const loadNFTS = async (contract) => {
    const totalSupply = await contract.methods.totalSupply().call();
    console.log(totalSupply);
   // console.log("trying again");
    setNFTCount(totalSupply);
    let results = [];
    for(let i = 0; i < totalSupply; i++){
      let coder = await contract.methods.items(i).call();
      results.push(coder)
    }
  
    setNFTItem(results);
}


useEffect(async()=>{
try{
const web3= await getWeb3();
await loadWeb3Account(web3);
const contract= await loadWeb3Contract(web3);
await loadNFTS(contract);
}
catch(error)
{
  setError(true);
}

  },[nftItems,address]);



  return(


    <>
    <NavBar address={address}/>

    <div className="container-fluid mt-5">
       <div className="row">
            {/* main section  */}
          <section className="main_banner_section">
             <div className="col-12 d-flex flex-column align-items-center">
                <img className="mb-4" src="https://avatars.dicebear.com/api/pixel-art/vanith.svg" alt="" width="72"/>
                <h1 className="display-5 fw-bold">NFT Marketplace</h1>
                <div className="col-6 text-center mb-3" >
                   <p className="lead text-center">The world’s largest digital marketplace for MENA
                      collectibles and non-fungible tokens(NFTs). 
                   </p>
                   <div>
                   </div>
                </div>
             </div>
          </section>
          {/* form section  */}
          <section className="mint_nft_section">
             <div className="col-12 d-flex flex-column align-items-center">
                <input 
                   type="text"
                   value={mintText}
                   onChange={(e)=>
                    {
                      if(e.target.value.length>=0)
                      {
                        setMintTexterror('');
                    setMintText(e.target.value)
                      }
                      else
                      {
                        setMintTexterror('Please enter the name');
                      }
                  
                    }
                  }
                   className="mb-2 form-control w-50"
                   placeholder="e.g. Naz" />
                  <span className="red mb-4">{mintTexterror}</span>
             </div>
             <div className="col-12 d-flex flex-column align-items-center">
               
                <button onClick={mint} className="btn btn-primary ps-5 pe-5 pt-3 pb-3">Mint NFT</button>
             </div>
          </section>
             {/* my nft section  */}
          <section className="my_nft_section">
             <div className="col-12 d-flex justify-content-center flex-wrap mt-3">
               { nftItems.map((name, key)=> {
                 return( <NFT key={key} name={name} />);
               }) }
             </div>
          </section>
       </div>
    </div>
    </>
    
    
  );

};

export default App;