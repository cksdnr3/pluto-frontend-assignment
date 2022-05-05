import axios, { AxiosResponse } from "axios";
import React from "react";
import { QueryFunctionContext, useQueries, useQuery } from "react-query";
import styled from "styled-components";
import { apiKeys } from "../../constants/apiKeys";
import { SERVER } from "../../constants/routes";
import { IPost } from "../../types/post";
import { ISearch } from "../../types/search";
import Loading from "../loading";

interface Props {
  id?: string;
}

const fetcher = async ({ queryKey }: QueryFunctionContext) => {
  const [key, id] = queryKey;
  return (await axios.get(`${SERVER}/${key}/${id}`)).data;
};

function InformationBox({ id }: Props) {
  const { data, isLoading } = useQuery<IPost>([apiKeys.items, id], fetcher, {
    enabled: !!id?.length,
  });

  return (
    <Wrapper>
      {isLoading && <Loading />}
      {data && (
        <>
          <Title href={data.url}>{data.title}</Title>
          <Author>{data.author}</Author>
          <Points>👍 {data.points}</Points>
          <Comments>
            Comments. {data.children.length}
            {data.children.map((comment, index) => (
              <Comment
                key={index}
                dangerouslySetInnerHTML={{ __html: comment.text }}
              />
            ))}
          </Comments>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 49%;
  padding: 0.8rem;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
  color: 0.8rem;
  word-break: keep-all;
  overflow-y: auto;

  & > *:not(:first-child) {
    margin-top: 6px;
  }
`;

const Title = styled.a`
  text-decoration: underline;
`;

const Author = styled.div`
  font-size: 0.9rem;
  color: #c9c9c9;
  text-align: end;
`;

const Points = styled.div`
  font-size: 0.9rem;
  color: skyblue;
`;

const Comments = styled.div`
  font-size: 0.9rem;

  & > div:not(:last-child) {
    margin-bottom: 0.8rem;
  }
`;
const Comment = styled.div`
  padding: 5px 0;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
`;

export default InformationBox;
