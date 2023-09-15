import { DataProvider as DataProvider$1 } from "@refinedev/core";
import nestjsxCrudDataProvider from "@pankod/refine-nestjsx-crud";

import { axiosInstance } from "./AxiosInterceptor";

const apiUrlBE = "http://localhost:3000" + "/api" ;


const handleJoin = (query: RequestQueryBuilder, join?: QueryJoin | QueryJoinArr | (QueryJoin | QueryJoinArr)[]) => {
  if (join) {
    query.setJoin(join);
  }
  return query;
};

export const CustomNestCrudDataProvider = (apiUrl: string, httpClient: any = axiosInstance): DataProvider$1 => ({
  ...nestjsxCrudDataProvider(apiUrl, httpClient),
  getOne: async ({ resource, id, metaData }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    let query = RequestQueryBuilder.create();
    query = handleJoin(query, metaData?.join);
    const { data } = await httpClient.get(`${url}?${query.query(true)}`);
    return {
      data,
    };
  },
});
export const nestCrudProvider = CustomNestCrudDataProvider(apiUrlBE, axiosInstance);
