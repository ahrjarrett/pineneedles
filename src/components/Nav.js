import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { handleLogin, logout } from "../redux/actions/auth";

const Nav = ({ handleLogin, logout, user, isLoggedIn }) => {
  return (
    <NavStyles>
      <div className="Nav-wrapper">
        <div className="Nav">
          <div className="Nav-container container">
            <div className="Nav-logo">
              <Logo width={100} color={"#fff"} />
            </div>

            {isLoggedIn && (
              <div className="Header--avatar">
                <img src={user.avatar_url} alt={user.login} />
              </div>
            )}

            <div className="Nav-links">
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/students">Students</Link>
              <Link to="/reporting">Reporting</Link>
            </div>

            <div className="Nav-search">
              <SearchBar filterStudents={() => null} />
              {isLoggedIn ? (
                <Butt className="Nav-logout" onClick={logout}>
                  Log out
                </Butt>
              ) : (
                <Butt onClick={handleLogin} className="Nav-login">
                  Log in
                </Butt>
              )}
            </div>
          </div>
        </div>
      </div>
    </NavStyles>
  );
};

const Butt = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline !important;
  }
`;

const NavStyles = styled.div`
  .Nav-logo {
    height: 56px;
    width: 36px;
    flex: 0;
  }

  #logo-svg {
    height: 100%;
  }

  #svg-hide {
    clip-path: url(#rectangle);
  }
  #logo-svg g:hover {
    transition: all 0.1s ease-out;
    fill: #a0011e;
  }

  .Nav-wrapper {
    text-align: center;
  }

  .Nav-wrapper .Nav {
    background-color: rgb(24, 31, 34);
    color: #ffffff;
    position: fixed;
    z-index: 1;
    height: 56px;
    width: 100%;
    top: 0;
    left: 0;
  }

  .Nav-container {
    /* parent of Nav-logo, Nav-links and Nav-search */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .Nav-links {
    flex: 2.75;
    margin-left: -45px;
  }

  @media (max-width: 768px) {
    .Nav-search {
      display: none;
    }
    .Nav-links {
      margin-left: 0;
    }
  }

  .Nav-links a {
    padding-left: 20px;
    padding-right: 20px;
  }

  .Nav a:hover,
  button:hover {
    color: #999;
  }

  .Nav a,
  button {
    font-weight: 300;
    font-size: 18px;
    color: #ffffff;
  }

  .Nav button {
    background: transparent;
    border: none;
  }

  .Nav .active-route {
    color: #61dafb;
  }

  .Nav-search {
    flex: 1.6;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .Nav-logout,
  .Nav-login {
    padding-left: 20px;
  }

  .Nav-search .Nav-search-input {
    background: transparent;
    border: 0;
    color: #ffffff;
    font-size: 18px;
    padding: 5px 5px 5px 29px;
    background-image: url(/search.svg);
    background-size: 16px 16px;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 5px;
  }

  .Nav-search .Nav-search-input:focus {
    outline: 0;
    background-color: #373940;
    border-radius: 0.25rem;
  }

  .Header--avatar img {
    width: 28px;
    height: 28px;
    border-radius: 3px;
    margin-left: 8px;
  }
`;

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(
  mapStateToProps,
  { handleLogin, logout }
)(Nav);
