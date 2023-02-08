import axios from "axios";
import React from "react";

type IFilters = {
  label: string;
  value: string;
  subOptions?: IFilters[];
};
type IGrant = {
  id: string;
};

const axiosInstance = axios.create({
  baseURL: "https://data.api.theglobalfund.org/",
  headers: {
    accept: "aplication/json",
  },
});

export const countryDetailsPaths = async () => {
  let countries: string[] = [];
  const response = await axiosInstance("filter-options/locations");
  const data: IFilters[] = response.data.options;

  const getPaths = (options: IFilters[]) => {
    for (const item of options) {
      countries.push(item.value);
      if (item.subOptions) {
        getPaths(item.subOptions);
      }
    }
  };
  getPaths(data);

  return countries.map(
    (code) => `https://data.theglobalfund.org/location/${code}/overview`
  );
};

export const partnersPaths = async () => {
  let partners: string[] = [];
  const response = await axiosInstance("filter-options/partner-types");
  const data: IFilters[] = response.data.options;

  const getPaths = (options: IFilters[]) => {
    for (const item of options) {
      partners.push(item.value);
      if (item.subOptions) {
        getPaths(item.subOptions);
      }
    }
  };
  getPaths(data);

  return partners.map(
    (code) => `https://data.theglobalfund.org/partner/${code}/signed/treemap`
  );
};

export const grantsPath = async () => {
  const response = await axiosInstance("grants?page=1&pageSize=all");
  const data: IGrant[] = response.data.data;
  return data.map(
    (code) => `https://data.theglobalfund.org/grant/${code.id}/1/overview`
  );
};
