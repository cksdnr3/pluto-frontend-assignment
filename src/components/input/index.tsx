import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { useDebounce } from "../../hooks/useDebounce";
import { useInput } from "../../hooks/useInput";
import { useSearchQuery } from "../../hooks/useSearchQuery";

interface Props extends HTMLAttributes<HTMLInputElement> {
  value: string;
}

function Input(props: Props) {
  return (
    <Wrapper>
      <TextInput {...props} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
`;

const TextInput = styled.input`
  padding: 0.7rem 1.6rem;
  width: 100%;
  border-radius: 4px;
`;

export default Input;
