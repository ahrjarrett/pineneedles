import React from "react";
import styled from "styled-components";

const HeaderStyles = styled.div`
  .Header .Header--Navbar {
    justify-content: flex-end;
    background: black;
    color: white;
  }

  .Header--username {
    font-size: 13px;
  }

  .Header--avatar img {
    width: 20px;
    height: 20px;
    border-radius: 3px;
    margin-left: 8px;
  }
`;

const Header = props => {
  return (
    <HeaderStyles>
      <div className="Header" />
    </HeaderStyles>
  );
};

export default Header;
