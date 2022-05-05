import axios, { AxiosResponse } from "axios";
import { QueryFunctionContext, UseQueryOptions, useQuery } from "react-query";
import { apiKeys } from "../constants/apiKeys";
import { SERVER } from "../constants/routes";
import { ISearch, ISearchParams } from "../types/search";

const fetcher = ({ queryKey }: QueryFunctionContext) => {
  const [key, params] = queryKey;
  return axios.get(`${SERVER}/${key}`, { params });
};

export const useSearchQuery = (
  params: ISearchParams,
  options?: UseQueryOptions<AxiosResponse<{ hits: ISearch[] }>>
) => {
  return useQuery<AxiosResponse<{ hits: ISearch[] }>>(
    [apiKeys.search, params],
    fetcher,
    {
      ...options,
      enabled: !!params.query?.length,
      keepPreviousData: !!params.query?.length,
    }
  );
};
