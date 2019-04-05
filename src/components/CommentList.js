import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";

import { fetchComments } from "../redux/actions/github";
import CommentCard from "./CommentCard";

class CommentList extends React.Component {
  componentDidMount() {
    const { login, repo } = this.props.match.params;
    this.props.fetchComments(login, repo);
  }

  render() {
    const { comments } = this.props;
    const { login, repo, sha } = this.props.match.params;
    const shortSha = sha.slice(0, 7);
    return (
      <CommentListStyles>
        <div className="comment-list-header">
          <div className="comment-list-breadcrumbs">
            <Link
              to={`/students/${login}`}
              className="comment-list-breadcrumbs-login"
            >
              {login}
            </Link>{" "}
            <span className="comment-list-breadcrumbs-divider">/</span>{" "}
            <Link
              to={`/students/${login}/repos/${repo}`}
              className="comment-list-breadcrumbs-repo"
            >
              {repo}
            </Link>{" "}
            <span className="comment-list-breadcrumbs-divider">/</span>
            <Link
              to={`/students/${login}/repos/${repo}/commit/${sha}/comments`}
              className="comment-list-breadcrumbs-commit"
            >
              {shortSha}
            </Link>{" "}
          </div>
          <div className="comment-list-total">
            <h4>
              {comments.length} comments on commit{" "}
              <code className="comment-list-sha">{shortSha}</code>
            </h4>
          </div>
        </div>
        <div className="comment-list">
          {comments.length > 0 &&
            comments.map(c => <CommentCard comment={c} key={c.id} />)}
        </div>
      </CommentListStyles>
    );
  }
}

const CommentListStyles = styled.div`
  .comment-list-breadcrumbs {
    font-size: 26px;
    margin-bottom: 28px;
  }
  .comment-list-breadcrumbs-login,
  .comment-list-breadcrumbs-repo {
    font-weight: 300;
    color: #0366d6;
  }
  .comment-list-breadcrumbs-divider {
    margin: 0 0.25em;
    color: #586069;
  }

  .comment-list-breadcrumbs-commit {
    font-weight: 600;
    color: #0366d6;
  }

  .comment-list-total {
    h4 {
      font-size: 16px;
      font-weight: 600;
    }
  }
  code.comment-list-sha {
    background-color: #f6f8fa;
    color: #24292e;
    border: 1px solid #eaecef;
    border-radius: 0.2em;
    font-size: 90%;
    font-weight: 400;
    padding: 0.2em 0.4em;
  }
`;

const mapStateToProps = state => ({
  token: state.auth.token,
  comments: state.github.comments
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchComments }
  )(CommentList)
);
