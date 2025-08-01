import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const DisbursementsGeomap: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/disbursements/geomap`),
};

export default DisbursementsGeomap;

export const DisbursementsGeomapMulticountries: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/disbursements/geomap/multicountries`,
  ),
};
