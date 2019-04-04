import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";

class Dashboard extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="Dashboard">
        <Header user={user} />
        <div className="Dashboard--header">
          Welcome to your dashboard, {user.name || user.login}!
        </div>
        <div>
          Do you want to check up on your <Link to="/students">students</Link>?
        </div>
        <div className="Dashboard--students-wrapper">
          <div className="Dashboard--students" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Dashboard);
