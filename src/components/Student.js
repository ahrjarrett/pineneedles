import React from "react";
import axios from "axios";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";

import { githubUrl } from "./StudentList";

const sortByUpdatedDesc = (a, b) =>
  new Date(a.updated_at) < new Date(b.updated_at) ? 1 : -1;

// class Student = ({ student, ...props }) => {
class Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      comments: []
    };
  }

  async componentDidMount() {
    const { login } = this.props.match.params;
    const token = this.props.token || localStorage.token;
    const localRepos = JSON.parse(
      window.localStorage.getItem(`${login}-repos`)
    ).sort(sortByUpdatedDesc);

    if (localRepos) {
      console.log("skipping API call! localRepos:", localRepos);
      this.setState({ repos: localRepos });
      return;
    }

    const response = await axios({
      url: `${githubUrl}/users/${login}/repos`,
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json"
      }
    });
    const repos = response.data.sort(sortByUpdatedDesc);
    console.log("response:", repos);
    window.localStorage.setItem(`${login}-repos`, JSON.stringify(repos));
    this.setState({ repos });
  }

  render() {
    const { login } = this.props.match.params;
    const { repos } = this.state;

    return (
      <StudentStyles>
        <div className="student-login">
          Student: <Link to={`${login}`}>{login}</Link>
        </div>
        <React.Fragment>
          {repos.length === 0 && "Loading repos..."}
          {repos.length > 0 && <RepoList repos={repos} />}
        </React.Fragment>
      </StudentStyles>
    );
  }
}

const RepoList = ({ repos }) => (
  <RepoListStyles>
    {repos.map(r => (
      <RepoCard repo={r} key={r.id} />
    ))}
  </RepoListStyles>
);

const RepoCard = ({ repo }) => (
  <div className="repo-card">
    <div className="repo-card-title">
      <Link to={`/students/${repo.owner.login}/repos/${repo.name}`}>
        {repo.name}
      </Link>
    </div>
    <div className="repo-card-detail">{repo.url}</div>
    <div className="repo-card-detail">
      Last updated: {moment(repo.updated_at).fromNow()}
    </div>
  </div>
);

const RepoListStyles = styled.div`
  .repo-card {
    display: flex;
    flex-direction: column;
    padding: 24px 0;
    border-bottom: 1px #e1e4e8 solid;
  }
  .repo-card-title {
    color: #0366d6;
    font-weight: 600;
    font-size: 20px;
  }
  .repo-card-detail {
    font-size: 12px;
    font-weight: 300;
    color: #586069;
    line-height: 1.5;
  }
`;

const StudentStyles = styled.div`
  .student-login {
    margin-bottom: 12px;
    font-size: 26px;
    line-height: 30px;
    font-weight: 100;
    color: #586069;
    a {
      font-weight: 600;
      color: #0366d6;
    }
  }
`;

export default Student;
