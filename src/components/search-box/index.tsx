import axios from "axios";
import React, { KeyboardEvent, useCallback, useState } from "react";
import { QueryFunctionContext, useQueryClient } from "react-query";
import styled from "styled-components";
import { SERVER } from "../../constants/routes";
import { useDebounce } from "../../hooks/useDebounce";
import { useInput } from "../../hooks/useInput";
import { useSearch } from "../../hooks/useSearch";
import { useSearchQuery } from "../../hooks/useSearchQuery";
import { ISearch } from "../../types/search";
import { highlightMatched } from "../../utils/highlightMathced";
import InputBox from "../input";
import Autocompletes from "../list";

interface Props {
  selectPost: (id: string) => void;
  selectedPostId?: string;
}

function SearchBox({ selectPost, selectedPostId }: Props) {
  const queryClient = useQueryClient();

  const [pIndex, setPIndex] = useState<number>(0);

  const searchInput = useInput();
  const debouncedSearch = useDebounce(searchInput.value, 100);

  const { data } = useSearchQuery(
    {
      query: debouncedSearch,
      hitsPerPage: 10,
      restrictSearchableAttributes: "title",
    },
    {
      onSuccess: (data) => {
        setPIndex(0);
        selectPost(undefined);
        // data.data.hits.forEach((search) => {
        //   queryClient.prefetchQuery(
        //     ["items", search.objectID],
        // ({ queryKey }: QueryFunctionContext) => {
        //   const [key, id] = queryKey;
        //   return axios.get(`${SERVER}/${key}/${id}`);
        // }
        //   );
        // });
      },
    }
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!data) return;

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setPIndex((prev) => Math.abs(++prev % data.data.hits.length));
      }

      // if (e.key === "ArrowUp") {
      //   e.preventDefault();
      //   setPIndex((prev) =>
      //     --prev < 0 ? searchQuery.data.data.hits.length + prev : prev
      //   );
      // }

      if (e.key === "Enter") {
        e.preventDefault();
        selectPost(data.data.hits[pIndex].objectID);
      }
    },
    [data?.data.hits, pIndex]
  );

  const onMouseEnterPost = useCallback((index: number) => {
    setPIndex(index);
  }, []);

  return (
    <Wrapper>
      <InputBox
        placeholder="Search Post"
        onKeyDown={onKeyDown}
        {...searchInput}
      />
      <Autocompletes
        items={data?.data.hits || []}
        render={(item, index) => (
          <Item
            key={item.objectID}
            aria-selected={pIndex === index}
            selected={item.objectID === selectedPostId}
            onMouseEnter={() => onMouseEnterPost(index)}
            onClick={() => selectPost(item.objectID)}
          >
            {highlightMatched(item.title, searchInput.value, {
              fontWeight: 700,
              backgroundColor: "transparent",
              color: "black",
            })}
            <HiddenInput onKeyDown={onKeyDown} />
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

const Item = styled.label<{ selected: boolean }>`
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

const HiddenInput = styled.input`
  position: absolute;
  top: 0;
  padding: 0;
  width: 0;
`;

export default SearchBox;
