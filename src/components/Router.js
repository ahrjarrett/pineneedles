import React from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import Dashboard from "./Dashboard";
import Nav from "./Nav";
import Login from "./Login";
import Auth from "./Auth";
import Student from "./Student";
import StudentList from "./StudentList";
import Repo from "./Repo";
import CommentList from "./CommentList";

const Router = ({ isLoggedIn, user }) => (
  <React.Fragment>
    <Route path="/" component={Nav} />
    {!isLoggedIn ? (
      <div>
        <Route path="/login" component={Login} />
        <Route path="/auth/callback" component={Auth} />
      </div>
    ) : (
      <div>
        <Route path="/welcome" render={() => <Welcome user={user} />} />
        <Route path="/dashboard" component={Dashboard} />
        <Route
          path="/reporting"
          component={() => (
            <h4>
              Coming soon! <Link to="/dashboard">Back to the dashboard</Link>
            </h4>
          )}
        />
        <Route exact path="/students" component={StudentList} />
        <Route exact path="/students/:login" component={Student} />
        <Route
          exact
          path="/students/:login/repos/:repo"
          render={({ match }) => (
            <Repo repoName={match.params.repo} login={match.params.login} />
          )}
        />
        <Route
          path="/students/:login/repos/:repo/commit/:sha/comments"
          component={CommentList}
        />
      </div>
    )}
  </React.Fragment>
);

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user
});

export default connect(mapStateToProps)(Router);

const Welcome = ({ user }) => (
  <div>
    Welcome, {user.name || user.login}! Go to your{" "}
    <Link to="/dashboard">Dashboard</Link>
  </div>
);
