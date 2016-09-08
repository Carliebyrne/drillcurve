import React from 'react';
import SideBar from 'SideBar';

var Main = (props) => {
    return (
      <div className="wrapper">
        <div className="nav-wrapper">
          <SideBar/>
        </div>        
        <div className="main-page">
          {props.children}
        </div>
      </div>
    )
};

export default Main;
