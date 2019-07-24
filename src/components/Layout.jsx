import React from "react";
import '../styles/Layout.css';
import Header from './Header';

const LayoutComponent = props => {
  return (
    <div className="container">
      <div className="item header">
          <Header/>
      </div>
      <div className="item main--content">
        {
            props.children
        }
      </div>
    </div>
  );
};

export default LayoutComponent;
