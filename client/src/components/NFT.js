import React from 'react';
const NFT= ({name})=>{

    return(
        
       <div className="col-md-2 d-flex flex-column align-items-center mb-3">
        <img width="150" src={`https://avatars.dicebear.com/api/pixel-art/${name}.svg`} />
        <span>{name}</span>
       </div>
    );
  
  };
  
  export default NFT;