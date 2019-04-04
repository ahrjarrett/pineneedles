import React from "react";
import styled from "styled-components";

function Comment({ comment }) {
  return (
    <CommentStyles>
      <div className="commenter-login">{comment.user.login}</div>
    </CommentStyles>
  );
}

const CommentStyles = styled.div`
  background: tomato;
  .commenter-login {
    color: orange;
  }
`;

export default Comment;
