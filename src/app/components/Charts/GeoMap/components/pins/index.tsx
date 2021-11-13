import React from "react";
import { Marker } from "react-map-gl";
import { isTouchDevice } from "app/utils/isTouchDevice";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { CountryPin } from "app/components/Charts/GeoMap/components/pins/styles";
import {
  GeoMapPinMarker,
  AllocationsGeoMapPinMarker,
  InvestmentsGeoMapPinMarker,
} from "app/components/Charts/GeoMap/data";

interface MapPinProps {
  marker:
    | GeoMapPinMarker
    | InvestmentsGeoMapPinMarker
    | AllocationsGeoMapPinMarker;
  onClick: () => void;
  setMarkerInfo: (info: any) => void;
  activeImgSrc: string;
  inactiveImgSrc: string;
}

export function MapPin(props: MapPinProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [hovered, setHovered] = React.useState(false);

  return (
    <Marker
      captureDrag={false}
      captureScroll={false}
      latitude={props.marker.latitude}
      longitude={props.marker.longitude}
      key={`marker-${props.marker.code}`}
    >
      <CountryPin
        data-cy={`geomap-pin-${props.marker.code}`}
        onClick={() => {
          if (isMobile || isTouchDevice()) {
            setHovered(true);
            props.setMarkerInfo(props.marker);
          } else {
            props.onClick();
          }
        }}
        onMouseLeave={() => {
          if (!isMobile) {
            setHovered(false);
            props.setMarkerInfo(null);
          }
        }}
        onMouseEnter={() => {
          if (!isMobile) {
            setHovered(true);
            props.setMarkerInfo(props.marker);
          }
        }}
        onTouchStart={() => {
          if (isMobile || isTouchDevice()) {
            setHovered(true);
            props.setMarkerInfo(props.marker);
          }
        }}
      >
        <img
          alt=""
          width={24}
          height={24}
          src={hovered ? props.activeImgSrc : props.inactiveImgSrc}
        />
      </CountryPin>
    </Marker>
  );
}
