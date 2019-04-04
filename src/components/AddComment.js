import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { githubUrl } from "./StudentList";

function AddComment({ token, owner, repoName, sha }) {
  token = token || localStorage.token;
  const login = "ahrjarrett";
  const url = `${githubUrl}/repos/${login}/${repoName}/commits/${sha}/comments`;
  console.log("URL:", url);

  const [state, setState] = useState("");
  const handleChange = e => setState(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("handling submit, e:", e);
    const promise = await axios({
      method: "POST",
      url: url,
      data: {
        body: state
        // path: Relative path of the file to comment on.
        // position: Line index in the diff to comment on.
      },
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json"
      }
    });

    const response = await Promise.resolve(promise);

    console.log("response:", response);

    setState("");
  };

  const SHA = !sha ? "(select SHA)" : sha.slice(0, 5) + "...";

  return (
    <AddCommentStyles>
      <form onSubmit={handleSubmit}>
        <label>#{sha}</label>
        <textarea
          className="add-comment-input"
          value={state}
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
    height: 60px;
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
`;

export default AddComment;
