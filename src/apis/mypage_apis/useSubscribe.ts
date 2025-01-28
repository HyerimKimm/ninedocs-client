import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import httpClient from "apis/networks/HttpClient";
import queryKeyFactory from "apis/query_config/queryKeyFactory";

type CategoryType = {
  id: number;
  name: string;
};

type SubscribeListType = {
  success: boolean;
  data: {
    categories: Array<CategoryType>;
    mailReceivingSchedule: {
      dayOfWeek: Array<string>;
    };
  };
};

type GetCategoryListType = {
  success: boolean;
  data: {
    categories: Array<CategoryType>;
  };
};

type UpdateSubscribeResType = {
  success: boolean;
  data: {
    categories: Array<CategoryType>;
  };
};

/* 전체 수신주기 카테고리 조회 API Hook의 return data type */
type AllSubscribeCycleType = {
  success: boolean;
  data: {
    schedules: Array<"MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN">;
  };
};

/* 메일 수신 주기 변경 API Hook의 return data type */
type UpdateSubscribeCycleResponseType = {
  mailReceivingSchedule: {
    dayOfWeek: Array<string>;
  };
};

/* 구독정보 조회 응답 목데이터 */
const subscribeListMockData = {
  success: true,
  data: {
    categories: [
      // 내가 구독한 카테고리 목록
      {
        id: 1,
        name: "Kubernetes",
      },
      {
        id: 2,
        name: "Helm",
      },
    ],
    mailReceivingSchedule: {
      dayOfWeek: ["MON", "WED", "SAT"],
    },
  },
};

/* 전체 카테고리 응답 목데이터 */
const categoryMockData = {
  success: true,
  data: {
    categories: [
      {
        id: 1,
        name: "Kubernetes",
      },
      {
        id: 2,
        name: "Helm",
      },
      {
        id: 3,
        name: "Java",
      },
      {
        id: 4,
        name: "Javascript",
      },
      {
        id: 5,
        name: "Python",
      },
      {
        id: 6,
        name: "Redis",
      },
    ],
  },
};

/* 구독정보 업데이터 응답 목데이터 */
const updateSubscribeMockData = {
  success: true,
  data: {
    categories: [
      {
        id: 1,
        name: "Kubernetes",
      },
      {
        id: 3,
        name: "Java",
      },
    ],
  },
};

/* 전체 메일수신주기 조회 응답 목데이터 */
const allMailCycleMockData = {
  success: true,
  data: {
    schedules: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as Array<
      "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN"
    >,
  },
};

/* 메일수신주기 변경 응답 목데이터 */
const updateMailCycleResMockData = {
  mailReceivingSchedule: {
    dayOfWeek: ["MON", "WED", "SAT"] as Array<
      "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN"
    >,
  },
};

/* 내 구독 목록 조회 API Hook */
export const useGetSubscribeList = () => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const fallback = {
    success: true,
    data: {
      categories: [],
      mailReceivingSchedule: {
        dayOfWeek: [],
      },
    },
  };

  const { data = fallback, isError } = useQuery({
    queryKey: queryKeyFactory.subscribe().queryKey,
    queryFn: async (): Promise<SubscribeListType> => {
      try {
        if (isApiMock) {
          return new Promise((resolve) => {
            setTimeout(() => resolve(subscribeListMockData), 300);
          });
        } else {
          const res: SubscribeListType = await httpClient.get(
            `/api/v1/my-page/subscription`,
          );

          if (res.success) {
            return res;
          } else throw new Error("Failed to fetch subscription list");
        }
      } catch (e) {
        throw new Error("Failed to fetch subscription list");
      }
    },
  });

  return { data, isError };
};

/* 전체 구독 카테고리 조회 API Hook */
export const useGetCategoryList = () => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const fallback = {
    success: true,
    data: {
      categories: [],
    },
  };

  const { data = fallback } = useQuery({
    queryKey: queryKeyFactory.allCategory().queryKey,
    queryFn: (): Promise<GetCategoryListType> => {
      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(categoryMockData), 100),
        );
      } else {
        return httpClient.get(`/api/v1/my-page/subscription/all-categories`);
      }
    },
  });

  return { data };
};

/* 구독 카테고리 변경 API Hook */
export const useUpdateSubscribe = () => {
  const queryClient = useQueryClient();

  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const { mutateAsync } = useMutation({
    mutationFn: ({
      categoryIds,
    }: {
      categoryIds: Array<number>;
    }): Promise<UpdateSubscribeResType> => {
      const params = { categoryIds: categoryIds };

      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(updateSubscribeMockData), 100),
        );
      } else {
        return httpClient.post(
          `/api/v1/my-page/subscription/my-categories`,
          params,
        );
      }
    },
    onSuccess: () => {
      toast.success("구독 카테고리 설정이 변경되었습닌다.");
      queryClient.invalidateQueries({
        queryKey: ["ninedocs", "subscribe"],
      });
    },
    onError: () => {
      toast.error("구독 카테고리 설정 변경에 실패했습니다.");
    },
  });

  return { mutateAsync };
};

/* 전체 수신주기 카테고리 조회 API Hook */
export const useGetSubscribeCycleList = () => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const fallback = {
    success: true,
    data: {
      schedules: [],
    },
  };

  const { data = fallback } = useQuery({
    queryKey: queryKeyFactory.allSubscribeCycle().queryKey,
    queryFn: (): Promise<AllSubscribeCycleType> => {
      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(allMailCycleMockData), 100),
        );
      } else {
        return httpClient.get(
          `/api/v1/my-page/subscription/available-schedules`,
        );
      }
    },
  });

  return { data };
};

/* 메일 수신 주기 변경 API Hook */
export const useUpdateSubscribeCycle = () => {
  const queryClient = useQueryClient();

  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const { mutate } = useMutation({
    mutationFn: (): Promise<UpdateSubscribeCycleResponseType> => {
      const params = {};

      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(updateMailCycleResMockData), 100),
        );
      } else {
        return httpClient.post(`/api/v1/my-page/subscription/schedule`, params);
      }
    },
    onSuccess: () => {
      toast.success("메일 수신 주기가 변경되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["ninedocs", "subscribe"] });
    },
    onError: () => {
      toast.error("메일 수신 주기 설정에 실패했습니다.");
    },
  });

  return { mutate };
};
