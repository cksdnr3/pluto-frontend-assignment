import React, {
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { useDebounce } from "../../hooks/useDebounce";
import { useInput } from "../../hooks/useInput";
import { useSearchQuery } from "../../hooks/useSearchQuery";
import { highlightMatched } from "../../utils/highlightMathced";
import InputBox from "../input";
import Autocompletes from "../list";

interface Props {
  selectPost: (id: string) => void;
  selectedPostId: string;
}

function SearchBox({ selectPost, selectedPostId }: Props) {
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
      onSuccess: () => {
        setPIndex(0);
        selectPost("");
      },
    }
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!data) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setPIndex((prev) => Math.abs(++prev % data.hits.length));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setPIndex((prev) => (--prev < 0 ? data.hits.length + prev : prev));
      }

      if (e.key === "Enter") {
        e.preventDefault();
        selectPost(data.hits[pIndex].objectID);
      }
    },
    [data?.hits, pIndex]
  );

  const onMouseEnterPost = useCallback((index: number) => {
    setPIndex(index);
  }, []);

  useEffect(() => {
    if (!searchInput.value.length) {
      selectPost("");
    }
  }, [searchInput.value]);

  return (
    <Wrapper>
      <InputBox
        placeholder="Search Post"
        onKeyDown={onKeyDown}
        {...searchInput}
      />
      <Autocompletes
        items={data?.hits || []}
        render={(item, index) => (
          <Item
            key={item.objectID}
            aria-selected={index === pIndex}
            selected={selectedPostId === item.objectID}
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

export default React.memo(SearchBox);
