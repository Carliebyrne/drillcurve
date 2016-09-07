import React from 'react';

import SideBar from 'SideBar';

var Main = (props) => {
    return (
      <div className="wrapper">
        <SideBar/>
        <div className="main-page">
          {props.children}
        </div>
      </div>
    )
};

module.exports = Main;
