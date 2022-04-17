import React from 'react';
import logo from '../../assets/img/uniqverse_img.png';
const NavBar= ({address})=>{

    return(
    <nav className="navbar navbar-light bg-light">
    <div className="container-fluid pt-4 pb-4 ps-5 pe-5">
     <img className="" src={logo} />
     <span className=" float-right ">{address}</span>
    </div>
  </nav>
    )
  
  };
  
  export default NavBar;