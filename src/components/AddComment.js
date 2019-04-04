import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import { githubUrl } from "./StudentList";

function AddComment({ match, token, repoName, sha }) {
  token = token || localStorage.token;
  const { login } = match.params;
  const url = `${githubUrl}/repos/${login}/${repoName}/commits/${sha}/comments`;
  console.log("URL:", url);

  const [body, setBody] = useState("");
  const [commentUrl, setCommentUrl] = useState("");
  const handleChange = e => setBody(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("handling submit, e:", e);
    const promise = await axios({
      method: "POST",
      url: url,
      data: {
        body: body
      },
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json"
      }
    });

    const { data } = await Promise.resolve(promise);
    console.log("response:", data);

    setCommentUrl(data.html_url);
    setBody("");
  };

  const SHA = !sha ? "(select SHA)" : sha.slice(0, 5) + "...";

  return (
    <AddCommentStyles>
      <form onSubmit={handleSubmit}>
        {commentUrl ? (
          <a
            href={commentUrl}
            className="posted-comment-url"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit your comment!
          </a>
        ) : (
          <label>#{sha}</label>
        )}
        <textarea
          className="add-comment-input"
          value={body}
          placeholder={`Comment on ${SHA}`}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </AddCommentStyles>
  );
}

const AddCommentStyles = styled.div`
  form {
    position: absolute;
    top: -22px;
    right: -300px;
    width: 285px;
  }
  textarea {
    width: 100%;
    height: 76px;
    border: 1px solid rgba(27, 31, 35, 0.2);
    border-radius: 3px;
  }
  label {
    font-size: 10px;
    color: #6a737d;
    font-weight: 100;
    margin-bottom: 0;
    width: 100%;
    text-align: right;
  }
  button {
    position: absolute;
    bottom: -29px;
    right: 0;

    padding: 3px 10px;
    line-height: 1.5;
    font-size: 15px;
    background-image: linear-gradient(-180deg, #fafbfc 0%, #eff3f6 90%);
    border: 1px solid rgba(27, 31, 35, 0.2);
    border-radius: 3px;
    font-weight: 600;
    color: #24292e;
  }
  .posted-comment-url {
    font-weight: 600;
    color: #0366d6;
  }
`;

const mapStateToProps = state => ({
  token: state.auth.token
});

export default withRouter(connect(mapStateToProps)(AddComment));
