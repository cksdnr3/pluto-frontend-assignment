import axios, { AxiosResponse } from "axios";
import { QueryFunctionContext, UseQueryOptions, useQuery } from "react-query";
import { apiKeys } from "../constants/apiKeys";
import { SERVER } from "../constants/routes";
import { ISearch, ISearchParams } from "../types/search";

const fetcher = async ({ queryKey }: QueryFunctionContext) => {
  const [key, params] = queryKey;
  return (await axios.get(`${SERVER}/${key}`, { params })).data;
};

export const useSearchQuery = (
  params: ISearchParams,
  options?: UseQueryOptions<{ hits: ISearch[] }>
) => {
  return useQuery<{ hits: ISearch[] }>([apiKeys.search, params], fetcher, {
    ...options,
    enabled: !!params.query?.length,
    keepPreviousData: !!params.query?.length,
  });
};
