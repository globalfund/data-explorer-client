import forEach from "lodash/forEach";
import { action, thunk } from "easy-peasy";
import axios, { AxiosResponse } from "axios";
import {
  ApiModel,
  Errors,
  RequestValues,
  ResponseData,
} from "app/state/api/interfaces";

export const APIModel = <QueryModel, ResponseModel>(
  url: string,
): ApiModel<QueryModel, ResponseModel> => ({
  loading: false,
  success: false,
  data: {
    count: 0,
    data: [],
  },
  errorData: null,
  onError: action((state, payload: Errors) => {
    state.loading = false;
    state.errorData = payload;
  }),
  onSuccess: action((state, payload: ResponseData<ResponseModel>) => {
    const { addOnData, getCountOnly, ...actualPayload } = payload;
    state.loading = false;
    state.success = true;
    if (addOnData) {
      state.data = {
        ...state.data,
        count: actualPayload.count,
        // @ts-expect-error TypeScript doesn't know that data can be an array
        data: getCountOnly ? [] : [...state.data.data, ...actualPayload.data],
      };
    } else {
      state.data = {
        ...actualPayload,
        data: getCountOnly ? [] : actualPayload.data,
      };
    }
  }),
  setSuccess: action((state) => {
    state.loading = false;
    state.success = true;
  }),
  onRequest: action((state) => {
    state.loading = true;
    state.success = false;
  }),
  fetch: thunk(async (actions, query: RequestValues<QueryModel>) => {
    actions.onRequest();
    let localUrl = url;
    const headers: any = {
      "Content-Type": "application/json",
      ...(import.meta.env.VITE_CMS_API &&
      localUrl.includes(import.meta.env.VITE_CMS_API)
        ? { Authorization: `Bearer ${import.meta.env.VITE_CMS_TOKEN}` }
        : {}),
    };
    if (query.routeParams) {
      forEach(query.routeParams, (value, key) => {
        localUrl = localUrl.replace(`{${key}}`, value);
      });
    }
    if (localUrl.includes("content/items"))
      console.log("debuggy - querying url", localUrl);
    axios
      .get(
        `${localUrl}${query.filterString ? "?" : ""}${
          query.filterString ?? ""
        }`,
        { headers },
      )
      .then(
        (resp: AxiosResponse) =>
          actions.onSuccess({
            ...resp.data,
            addOnData: false,
            getCountOnly: query.getCountOnly ?? false,
          }),
        (error: any) => actions.onError(error.response),
      );
  }),
  setData: action((state, payload: any) => {
    state.data = payload;
  }),
  clear: action((state) => {
    state.loading = false;
    state.success = false;
    state.data = {
      count: 0,
      data: [],
    };
    state.errorData = null;
  }),
  post: thunk(async (actions, query: RequestValues<QueryModel>) => {
    actions.onRequest();
    axios
      .post(url, query.values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(
        (resp: AxiosResponse) => actions.onSuccess(resp.data),
        (error: any) => actions.onError(error.response),
      );
  }),
});
