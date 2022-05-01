import React from "react";
import styled from "styled-components";
import Search from "./components/search";
import { useSearch } from "./hooks/useSearch";

function App() {
  return (
    <Wrapper>
      <Search {...useSearch()} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 100px 0;
`;

export default App;
