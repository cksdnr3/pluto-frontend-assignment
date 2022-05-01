import axios, { AxiosResponse } from "axios";
import { KeyboardEvent, useCallback, useState } from "react";
import { QueryFunctionContext, useQuery, useQueryClient } from "react-query";
import { apiKeys } from "../constants/apiKeys";
import { SERVER } from "../constants/routes";
import { IPost } from "../types/post";
import { ISearch } from "../types/search";
import { useDebounce } from "./useDebounce";
import { useInput } from "./useInput";
import { useSearchQuery } from "./useSearchQuery";

const fetcher = ({ queryKey }: QueryFunctionContext) => {
  const [key, id] = queryKey;
  return axios.get(`${SERVER}/${key}/${id}`);
};

export const useSearch = () => {
  const queryClient = useQueryClient();

  // State

  const [pIndex, setPIndex] = useState<number>(0);
  const [selectedPost, setSelectedPost] = useState<ISearch>();
  const searchInput = useInput();
  const debouncedSearch = useDebounce(searchInput.value, 100);

  const searchQuery = useSearchQuery(
    {
      query: debouncedSearch,
      hitsPerPage: 10,
      restrictSearchableAttributes: "title",
    },
    {
      onSuccess: (data) => {
        setPIndex(0);
        setSelectedPost(undefined);

        data.data.hits.forEach((search) => {
          queryClient.prefetchQuery(["items", search.objectID], fetcher);
        });
      },
    }
  );

  const postQuery = useQuery<AxiosResponse<IPost>>(
    [apiKeys.items, selectedPost?.objectID],
    fetcher,
    { enabled: !!selectedPost }
  );

  // Event

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!searchQuery.data) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setPIndex((prev) => ++prev % searchQuery.data.data.hits.length);
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setPIndex((prev) =>
          --prev < 0 ? searchQuery.data.data.hits.length + prev : prev
        );
      }

      if (e.key === "Enter") {
        e.preventDefault();
        setSelectedPost(searchQuery.data.data.hits[pIndex]);
      }
    },
    [searchQuery.data?.data.hits, pIndex]
  );

  const onMouseEnterPost = useCallback((index: number) => {
    setPIndex(index);
  }, []);

  const onClickPost = useCallback((post: ISearch) => {
    setSelectedPost(post);
  }, []);

  // Effect

  return {
    state: { pIndex, selectedPost },
    query: { post: postQuery, search: searchQuery },
    input: { search: searchInput },
    event: { onMouseEnterPost, onKeyDown, onClickPost },
  };
};
