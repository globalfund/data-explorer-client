import React from "react";
import { FeatureCollection } from "geojson";
import { GeoMap } from "app/components/Charts/GeoMap";
// import axios, { AxiosResponse, AxiosError } from "axios";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { getRandomCountryData } from "app/components/Charts/GeoMap/data";

export function InvestmentsGeoMap() {
  const [maxValue, setMaxValue] = React.useState(0);
  const [data, setData] = React.useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });

  React.useEffect(() => {
    getRandomCountryData(setData);
    setMaxValue(1000000000);
    // axios
    //   .get("http://localhost:4200/disbursements/geomap")
    //   .then((response: AxiosResponse) => {
    //     if (response.status === 200 && response.data.data) {
    //       setData({
    //         type: "FeatureCollection",
    //         features: response.data.data,
    //       });
    //       setMaxValue(response.data.maxValue);
    //     }
    //   })
    //   .catch((error: AxiosError) => {
    //     console.log(error);
    //   });
  }, []);

  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      `}
    >
      <GeoMap type="investments" data={data} pins={[]} />
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
            <b>Disbursements</b>
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
