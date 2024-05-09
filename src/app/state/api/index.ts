/* eslint-disable no-param-reassign */
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
  url: string
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
    const { addOnData, ...actualPayload } = payload;
    state.loading = false;
    state.success = true;
    if (addOnData) {
      // @ts-ignore
      state.data = {
        ...state.data,
        count: actualPayload.count,
        // @ts-ignore
        data: [...state.data.data, ...actualPayload.data],
      };
    } else {
      state.data = actualPayload;
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
    const headers: any = {
      "Content-Type": "application/json",
      ...(process.env.REACT_APP_CMS_API &&
      url.includes(process.env.REACT_APP_CMS_API)
        ? { "api-key": process.env.REACT_APP_CMS_TOKEN }
        : {}),
    };
    if (query.routeParams) {
      forEach(query.routeParams, (value, key) => {
        url = url.replace(`{${key}}`, value);
      });
    }
    if (url.includes("content/items"))
      console.log("debuggy - querying url", url);
    axios
      .get(
        `${url}${query.filterString ? "?" : ""}${query.filterString ?? ""}`,
        { headers }
      )
      .then(
        (resp: AxiosResponse) =>
          actions.onSuccess({ ...resp.data, addOnData: false }),
        (error: any) => actions.onError(error.response)
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
        (error: any) => actions.onError(error.response)
      );
  }),
});
