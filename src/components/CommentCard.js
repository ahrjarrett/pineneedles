import React from "react";
import moment from "moment";
import styled from "styled-components";
import { Link } from "react-router-dom";

function CommentCard({ comment }) {
  // body
  return (
    <CommentStyles>
      <div className="comment-card-wrapper">
        <div className="comment-card-head">
          <div className="commenter-avatar">
            <Link to={`/students/${comment.user.login}`}>
              <img src={comment.user.avatar_url} alt={comment.user.login} />
            </Link>
          </div>
          <div className="comment-card">
            <div className="comment-card-meta">
              <div className="comment-meta-wrapper">
                <Link
                  to={`/students/${comment.user.login}`}
                  className="commenter-login"
                >
                  {comment.user.login}
                </Link>{" "}
                replied{" "}
                <a
                  href={comment.html_url}
                  className="comment-card-time"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {moment(comment.created_at).fromNow()}
                </a>
              </div>
            </div>
            <div className="comment-card-body">
              <p>{comment.body}</p>
            </div>
          </div>
        </div>
      </div>
    </CommentStyles>
  );
}

const CommentStyles = styled.div`
  margin-bottom: 20px;
  .commenter-avatar {
    position: absolute;
    margin-right: 15px;
    img {
      display: inline-block;
      line-height: 1;
      overflow: hidden;
      vertical-align: middle;
      border-radius: 3px;
      height: 44px;
      width: 44px;
    }
  }

  .comment-card-head {
    display: flex;
    width: 100%;
    max-width: 650px;
  }

  .comment-card {
    width: 100%;
    max-width: 650px;
    margin-left: 60px;
    display: flex;
    flex-direction: column;
    & > div {
      padding-left: 15px;
      padding-right: 15px;
    }
    border: 1px solid #c0d3eb;
    border-radius: 3px;

    position: relative;
    &:before {
      border-color: transparent;
      border-style: solid solid outset;
      content: " ";
      display: block;
      height: 0;
      left: -16px;
      pointer-events: none;
      position: absolute;
      right: 100%;
      top: 11px;
      width: 0;

      border-right-color: #c0d3eb;
      border-width: 8px;
      z-index: 2000;
    }
  }

  .comment-card-body {
    padding: 15px;
    p {
      margin: 0;
    }
  }

  .comment-card-meta {
    display: flex;
    align-items: center;
    height: 44px;
    font-size: 14px;
    color: #586069;

    background-color: #f1f8ff;
    border-bottom: 1px solid #c0d3eb;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;

    /* border-bottom: 1px solid #d1d5da;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    color: #586069;
    padding-left: 15px;
    padding-right: 15px;
    background-color: #f1f8ff;
    border-bottom-color: #c0d3eb; */

    /* background-color: #f1f8ff;
    border: 1px solid #c0d3eb;
    border-radius: 3px;
    position: relative;
    border-color: #c0d3eb; */

    .comment-meta-wrapper {
      line-height: 1.6;
    }

    a {
      color: #586069;
      &:hover {
        color: #586069;
        text-decoration: underline;
      }
    }
  }

  a.commenter-login {
    font-weight: 600;
  }
`;

export default CommentCard;
