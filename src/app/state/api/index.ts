/* eslint-disable no-param-reassign */
import get from "lodash/get";
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
  crudData: null,
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
  onSuccessCrudData: action((state, payload: ResponseData<ResponseModel>) => {
    state.loading = false;
    state.success = true;
    state.crudData = payload;
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
    const token = get(query, "token", undefined);
    let headers: any = {
      "Content-Type": "application/json",
    };
    if (process.env.REACT_APP_CMS_API && url.includes(process.env.REACT_APP_CMS_API)) {
      headers = {
        ...headers,
        "api-key": process.env.REACT_APP_CMS_TOKEN,
      };
    } else if (token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
    }
    if (url.includes('content/items')) console.log('debuggy - querying url', url)
    axios
      .get(
        `${url}${query.getId ? "/" + query.getId : ""}${query.filterString ? "?" : ""}${query.filterString ?? ""}`,
        { headers }
      )
      .then(
        (resp: AxiosResponse) =>
          query.getId || query.storeInCrudData
            ? actions.onSuccessCrudData(resp.data)
            : actions.onSuccess({ ...resp.data, addOnData: false }),
        (error: any) => actions.onError(error.response)
      );
  }),
  setData: action((state, payload: any) => {
    state.data = payload;
  }),
  setCrudData: action((state, payload: any) => {
    state.crudData = payload;
  }),
  clear: action((state) => {
    state.loading = false;
    state.success = false;

    state.data = {
      count: 0,
      data: [],
    };
    state.crudData = null;

    state.errorData = null;
  }),
  post: thunk(async (actions, query: RequestValues<QueryModel>) => {
    actions.onRequest();
    const token = get(query, "token", undefined);
    let Authorization: string | undefined = undefined;
    if (token) {
      Authorization = `Bearer ${token}`;
    }
    axios
      .post(url, query.values, {
        headers: {
          "Content-Type": "application/json",
          Authorization,
        },
      })
      .then(
        (resp: AxiosResponse) => {
          actions.onSuccess(resp.data);
          return actions.onSuccessCrudData(resp.data);
        },
        (error: any) => actions.onError(error.response)
      );
  }),
  patch: thunk(async (actions, query: RequestValues<QueryModel>) => {
    actions.onRequest();
    axios
      .patch(`${url}/${query.patchId}`, query.values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${get(query, "token", undefined)}`,
        },
      })
      .then(
        (resp: AxiosResponse) => actions.onSuccessCrudData(resp.data),
        (error: any) => actions.onError(error.response)
      );
  }),
  delete: thunk(async (actions, query: RequestValues<QueryModel>) => {
    actions.onRequest();
    axios
      .delete(`${url}/${query.deleteId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${get(query, "token", undefined)}`,
        },
      })
      .then(
        (resp: AxiosResponse) => actions.onSuccessCrudData(resp.data),
        (error: any) => actions.onError(error.response)
      );
  }),
});
