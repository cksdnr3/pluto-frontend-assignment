import React, { HTMLAttributes, ReactElement } from "react";
import styled from "styled-components";

interface Props<T> extends HTMLAttributes<HTMLDivElement> {
  items: T[];
  render: (item: T, index: number) => ReactElement;
}

function List<T>(props: Props<T>) {
  return (
    <Wrapper {...props}>
      {!!props.items.length ? (
        props.items.map(props.render)
      ) : (
        <Empty>no result</Empty>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  padding: 0.6rem;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  overflow-y: auto;

  & > *:not(:last-child) {
    margin-bottom: 0.4rem;
  }
`;

const Empty = styled.div`
  color: #d9d9d9;
  text-align: center;
`;

export default List;
