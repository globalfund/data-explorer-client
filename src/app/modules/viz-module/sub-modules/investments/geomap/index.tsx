import React from "react";
import { FeatureCollection } from "geojson";
import { GeoMap } from "app/components/Charts/GeoMap";
import { getRandomCountryData } from "app/components/Charts/GeoMap/data";

export function InvestmentsGeoMap() {
  const [data, setData] = React.useState<FeatureCollection>({
    type: "FeatureCollection",
    features: [],
  });

  React.useEffect(() => {
    getRandomCountryData(setData);
  }, []);

  return <GeoMap data={data} />;
}
