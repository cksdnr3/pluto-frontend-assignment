import React from "react";
import styled from "styled-components";

function Loading() {
  return (
    <Wrapper>
      <Icon>📚</Icon>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  width: 150px;
  height: 100%;
  font-size: 3rem;
  text-align: center;
  opacity: 0.7;
  overflow: hidden;
`;

const Icon = styled.span`
  @keyframes loop {
    from {
      transform: translate(120px);
    }

    to {
      transform: translate(-100px);
    }
  }

  animation-name: loop;
  animation-iteration-count: infinite;
  animation-duration: 0.65s;
`;

export default Loading;
