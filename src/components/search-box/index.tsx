import React from "react";
import styled from "styled-components";
import { useSearch } from "../../hooks/useSearch";
import { highlightMatched } from "../../utils/highlightMathced";
import InputBox from "../input";
import Autocompletes from "../list";

type Props = ReturnType<typeof useSearch>;

function SearchBox({ event, input, query, state }: Props) {
  return (
    <Wrapper>
      <InputBox
        placeholder="Search Post"
        onKeyDown={event.onKeyDown}
        {...input.search}
      />
      <Autocompletes
        items={query.search.data?.data.hits || []}
        render={(item, index) => (
          <Item
            key={item.objectID}
            aria-selected={state.pIndex === index}
            selected={item.objectID === state.selectedPost?.objectID}
            onMouseEnter={() => event.onMouseEnterPost(index)}
            onClick={() => event.onClickPost(item)}
            onKeyDown={event.onKeyDown}
          >
            {highlightMatched(item.title, input.search.value, {
              fontWeight: 700,
              backgroundColor: "transparent",
              color: "black",
            })}
          </Item>
        )}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  border-radius: 8px;

  & > *:not(:last-child) {
    margin-bottom: 6px;
  }
`;

const Item = styled.button<{ selected: boolean }>`
  position: relative;
  display: block;
  padding: 0.8rem 1.6rem;
  border-radius: 6px;
  border: 1px solid rgb(100, 149, 247);
  width: 100%;
  font-size: 0.8rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
  overflow: hidden;
  overflow-y: auto;
  text-align: start;

  ${({ selected }) =>
    selected &&
    `
    background-color: rgb(100, 149, 237, 0.5);
    color: #fff;
`}

  cursor: pointer;

  &[aria-selected="true"] {
    background-color: rgb(100, 149, 237, 0.7);
    color: #fff;
  }
`;

export default SearchBox;
