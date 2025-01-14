import { createQueryKeys } from "@lukemorales/query-key-factory";

const queryKeyFactory = createQueryKeys("ninedocs", {
  subscribe: (params?: object) => [{ ...params }],
  bookmark: (params?: object) => [{ ...params }],
  article: (params?: object) => [{ ...params }],
  allCategory: (params?: object) => [{ ...params }],
  alarm: (params?: object) => [{ ...params }],
  allSubscribeCycle: (params?: object) => [{ ...params }],
  comments: (params?: object) => [{ ...params }],
});

export default queryKeyFactory;
