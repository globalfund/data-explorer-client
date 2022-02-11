/* eslint-disable no-param-reassign */
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
    if (query.isCMSfetch) {
      axios
        .get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(
          (resp: AxiosResponse) =>
            actions.onSuccess({ ...resp.data, addOnData: false }),
          (error: any) => actions.onError(error.response)
        );
    } else {
      axios
        .post(url, query.values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(
          (resp: AxiosResponse) =>
            actions.onSuccess({ ...resp.data, addOnData: query.addOnData }),
          (error: any) => actions.onError(error.response)
        );
    }
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
});
/* eslint-disable no-param-reassign */
