import React from "react";
import filter from "lodash/filter";
import { FeatureCollection } from "geojson";
import useTitle from "react-use/lib/useTitle";
import { useStoreState } from "app/state/store/hooks";
import { GeoMap } from "app/components/Charts/GeoMap";
import axios, { AxiosResponse, AxiosError } from "axios";
import { PageLoader } from "app/modules/common/page-loader";
import { GeoMapPinMarker } from "app/components/Charts/GeoMap/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";

export function PledgesContributionsGeoMap() {
  useTitle("The Data Explorer - Pledges & Contributions GeoMap");
  const [maxValue, setMaxValue] = React.useState(0);
  const [data, setData] = React.useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });
  const [pins, setPins] = React.useState<GeoMapPinMarker[]>([]);
  const [loading, setLoading] = React.useState(false);

  const valueType = useStoreState(
    (state) => state.ToolBoxPanelDonorMapTypeState.value
  );
  const view = useStoreState(
    (state) => state.ToolBoxPanelDonorMapViewState.value
  );

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.tgf.nyuki.io/pledges-contributions/geomap/?valueType=${valueType}`
      )
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          if (response.data.layers) {
            setData({
              type: "FeatureCollection",
              features: response.data.layers,
            });
          }
          if (response.data.maxValue) {
            setMaxValue(response.data.maxValue);
          }
          if (response.data.pins) {
            setPins(response.data.pins);
          }
        }
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, [valueType]);

  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      `}
    >
      {loading && <PageLoader />}
      <GeoMap
        data={
          view === "Public Sector"
            ? data
            : {
                type: "FeatureCollection",
                features: [],
              }
        }
        type="donors"
        pins={
          view === "Public Sector"
            ? []
            : filter(pins, {
                subType: view,
              })
        }
      />
      <div
        css={`
          gap: 12px;
          display: flex;
          margin-top: 20px;
          flex-direction: row;
          align-items: flex-end;
        `}
      >
        <div
          css={`
            gap: 6px;
            width: 250px;
            display: flex;
            font-size: 12px;
            flex-direction: column;
          `}
        >
          <div>
            <b>{valueType}</b>
          </div>
          <div
            css={`
              width: 100%;
              height: 6px;
              border-radius: 20px;
              background: linear-gradient(
                  90deg,
                  #f2f3f7 0%,
                  rgba(255, 255, 255, 0) 100%
                ),
                #343a40;
            `}
          />
          <div
            css={`
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            `}
          >
            <div>0 USD</div>
            <div>{formatFinancialValue(maxValue)}</div>
          </div>
        </div>
        <div
          css={`
            gap: 6px;
            width: 43px;
            height: 100%;
            display: flex;
            font-size: 12px;
            font-weight: bold;
            text-align: center;
            flex-direction: column;
          `}
        >
          <div
            css={`
              width: 100%;
              height: 6px;
              background: #fff;
              border-radius: 20px;
              border: 0.5px solid #c7cdd1;
            `}
          />
          <div>N/A</div>
        </div>
      </div>
    </div>
  );
}
