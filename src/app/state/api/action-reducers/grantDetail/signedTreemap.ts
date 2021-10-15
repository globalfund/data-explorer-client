import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailSignedTreemap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/grant/signed/treemap`),
};

export default GrantDetailSignedTreemap;
