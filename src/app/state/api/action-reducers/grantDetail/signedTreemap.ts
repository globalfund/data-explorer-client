import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailSignedTreemap: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/grant/signed/treemap`),
};

export default GrantDetailSignedTreemap;
