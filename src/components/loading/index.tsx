import React from "react";
import styled from "styled-components";

function Loading() {
  return (
    <Wrapper>
      <Icon>📚 ...</Icon>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  height: 100%;
  font-size: 3rem;
  text-align: center;
`;

const Icon = styled.span``;

export default Loading;
