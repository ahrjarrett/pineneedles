import React from "react";
import axios from "axios";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { trackedStudents } from "../hardcodedData";

const githubUrl = "https://api.github.com";

class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: JSON.parse(window.localStorage.getItem("students")) || []
    };
  }

  async componentDidMount() {
    const token = this.props.token || localStorage.token;

    if (this.state.students.length) return;
    // if (window.localStorage.students) {
    //   this.setState({ students: JSON.parse(window.localStorage.students) });
    //   return;
    // }

    const promises = trackedStudents.map(async username => {
      const response = await axios({
        url: `${githubUrl}/users/${username}`,
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json"
        }
      });
      return response;
    });

    const responses = await Promise.all(promises);
    const students = responses.map(({ data }) => data);
    window.localStorage.setItem("students", JSON.stringify(students));
    this.setState({ students });
  }

  render() {
    const { students } = this.state;
    return (
      <StudentListStyles>
        <h2 className="StudentList-subtitle">Here are your students:</h2>
        {students.length === 0 && "Loading..."}
        {students.length > 0 &&
          students.map(user => <StudentCard key={user.id} student={user} />)}
      </StudentListStyles>
    );
  }
}

const StudentCard = ({ student }) => (
  <div className="student-card">
    <div className="student-card-info">
      <div className="student-card-avatar">
        <Link to={`/students/${student.login}`}>
          <img src={`${student.avatar_url}`} />
        </Link>
      </div>
      <div className="student-card-names">
        <Link to={`/students/${student.login}`}>
          <span className="student-card-name">
            {student.name || student.login}
          </span>
          <span className="student-card-login">{student.login}</span>
        </Link>
      </div>
    </div>
    <Link className="student-card-button" to={`/students/${student.login}`}>
      Go to Student
    </Link>
  </div>
);

const StudentListStyles = styled.div`
  h2 {
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    color: #666;
    line-height: 24px;
    margin-top: 50px;
    margin-bottom: 10px;
  }

  .student-card {
    display: flex;
    justify-content: space-between;
    padding-top: 24px;
    padding-bottom: 24px;
    border-bottom: 1px #e1e4e8 solid;
  }
  .student-card-info {
    display: flex;
  }
  .student-card-avatar img {
    width: 50px;
    border-radius: 3px;
    vertical-align: middle;
  }
  .student-card-button {
    padding: 3px 10px;
    height: 100%;
    line-height: 20px;
    background-color: #eff3f6;
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(#fafbfc),
      color-stop(90%, #eff3f6)
    );
    background-image: -webkit-linear-gradient(top, #fafbfc 0%, #eff3f6 90%);
    background-image: -o-linear-gradient(top, #fafbfc 0%, #eff3f6 90%);
    background-image: linear-gradient(-180deg, #fafbfc 0%, #eff3f6 90%);
    border: 1px solid rgba(27, 31, 35, 0.2);
    border-radius: 3px;
    font-size: 12px;
    font-weight: 600;
    color: #24292e;
  }
  .student-card-names {
    display: flex;
    padding-left: 12px;
    padding-top: 2px;
    height: 22px;
  }
  .student-card-name {
    font-size: 16px;
    color: #24292e;
  }
  .student-card-login {
    padding-left: 8px;
    padding-top: 2px;
    color: #586069;
    font-size: 14px;
  }
  .student-card-name:hover,
  .student-card-login:hover {
    color: #0366d6;
  }
`;

const mapStateToProps = state => ({
  token: state.auth.token
});

export default connect()(StudentList);
