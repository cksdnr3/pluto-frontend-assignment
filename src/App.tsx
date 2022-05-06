import React from "react";
import styled from "styled-components";
import Search from "./components/search";

function App() {
  return (
    <Wrapper>
      <Search />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 100px 0;
`;

export default App;
