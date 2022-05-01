import React from "react";
import styled from "styled-components";
import { useSearch } from "../../hooks/useSearch";
import InformationBox from "../information-box";
import SearchBox from "../search-box";

type Props = ReturnType<typeof useSearch>;

function Search(props: Props) {
  return (
    <Wrapper>
      <SearchBox {...props} />
      <InformationBox
        data={props.query.post.data?.data}
        isLoading={props.query.post.isLoading}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: auto;
  padding: 0.5rem;
  border-radius: 8px;
  width: 777px;
  height: 570px;
  background-color: #fff;
  z-index: 0;
`;

export default Search;
