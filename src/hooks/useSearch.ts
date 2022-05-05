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

// const fetcher = ;

export const useSearch = () => {
  // // State
  // // Event
  // // Effect
  // return {
  //   state: { pIndex, selectedPost },
  //   query: { post: postQuery, search: searchQuery },
  //   input: { search: searchInput },
  //   event: { onMouseEnterPost, onKeyDown, onClickPost },
  // };
};
