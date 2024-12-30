import { useQuery } from "@tanstack/react-query";

import httpClient from "apis/networks/HttpClient";
import queryKeyFactory from "apis/query_config/queryKeyFactory";

const bookMarkListMockData = {
  cursor: 42, // 직전 페이지의 마지막 북마크 id
  items: [
    {
      bookmarkId: 55,
      article: {
        id: 12,
        title: "Ingress 란?",
        category: {
          id: 1,
          name: "Kubernetes",
        },
      },
    },
    {
      bookmarkId: 42,
      article: {
        id: 14,
        title: "useState 란?",
        category: {
          id: 10,
          name: "Frontend",
        },
      },
    },
  ],
};

export const useGetBookmarkList = (cursor: number, limit: number) => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const fallback = {
    cursor: null,
    items: [],
  };

  const { data = fallback } = useQuery({
    queryKey: queryKeyFactory.bookmark({ cursor: cursor, limit: limit })
      .queryKey,
    queryFn: () => {
      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(bookMarkListMockData), 100),
        );
      } else {
        return httpClient.get(
          `/api/v1/bookmarks?cursor=${cursor}&limit=${limit}`,
        );
      }
    },
  });

  return { data };
};
