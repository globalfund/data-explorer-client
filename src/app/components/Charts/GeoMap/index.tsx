/* base */
import React from "react";
import { useHoverDirty } from "react-use";
import { useHistory } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import WebMercatorViewport from "viewport-mercator-project";
import MapGL, {
  LinearInterpolator,
  MapRef,
  Source,
  Layer,
  LayerProps,
  Popup,
} from "react-map-gl";

/* utils */
import filter from "lodash/filter";
import { lineString } from "@turf/helpers";
import bezierSpline from "@turf/bezier-spline";

/* components */
import {
  mapStyle,
  GeoMapProps,
  GeoMapPinMarker,
  getMapPinIcons,
  InvestmentsGeoMapPinMarker,
  AllocationsGeoMapPinMarker,
  NO_DATA_COLOR,
  NO_DATA_BORDER_COLOR,
} from "app/components/Charts/GeoMap/data";
import {
  GeomapAllocationsTooltip,
  GeomapPinTooltip,
  GeomapTooltip,
} from "app/components/Charts/GeoMap/components/tooltip";
import { isTouchDevice } from "app/utils/isTouchDevice";
import { TooltipButton } from "app/components/Charts/common/styles";
import { MapPin } from "app/components/Charts/GeoMap/components/pins";
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import { GeoMapControls } from "app/components/Charts/GeoMap/components/controls";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";

export function GeoMap(props: GeoMapProps) {
  const cmsData = useCMSData({ returnData: true });
  const history = useHistory();
  const mapRef = React.useRef<React.Ref<MapRef>>();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isSmallScreen = useMediaQuery("(max-width: 960px)");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isHovering = useHoverDirty(containerRef as React.RefObject<Element>);
  const [viewport, setViewport] = React.useState({
    latitude: 37.307990048281795,
    longitude: 4.5689197295041035,
    zoom: !isSmallScreen ? 1.3 : 0.5,
    bearing: 0,
    pitch: 0,
    width: "100%",
    height: "100%",
    transitionInterpolator: new LinearInterpolator(),
    transitionDuration: 1000,
  });
  const [settings, setSettings] = React.useState({
    dragPan: true,
    dragRotate: false,
    scrollZoom: true,
    touchZoom: true,
    touchRotate: false,
    keyboard: true,
    doubleClickZoom: false,
    minZoom: 1.3,
    maxZoom: 3,
  });
  const layerBorderStyle: LayerProps = {
    type: "line",
    paint: {
      "line-width": 2,
      "line-color": {
        property: "value",
        default: NO_DATA_BORDER_COLOR,
        stops: [
          [0, NO_DATA_BORDER_COLOR],
          [1, NO_DATA_COLOR],
          [2, NO_DATA_COLOR],
          [3, NO_DATA_COLOR],
          [4, NO_DATA_COLOR],
          [5, NO_DATA_COLOR],
          [6, NO_DATA_COLOR],
          [7, NO_DATA_COLOR],
          [8, NO_DATA_COLOR],
          [9, NO_DATA_COLOR],
          [10, NO_DATA_COLOR],
          [11, NO_DATA_COLOR],
          [12, NO_DATA_COLOR],
        ],
      },
    },
  };
  const layerStyle: LayerProps = {
    type: "fill",
    paint: {
      "fill-color": {
        property: "value",
        default: NO_DATA_COLOR,
        stops: [
          [0, NO_DATA_COLOR],
          [1, "#CDD4DF"],
          [2, "#C0C7D2"],
          [3, "#AFB6C1"],
          [4, "#A0A7B1"],
          [5, "#939AA4"],
          [6, "#868D96"],
          [7, "#787F88"],
          [8, "#6B727B"],
          [9, "#575E67"],
          [10, "#444B53"],
          [11, "#343B43"],
          [12, "#252C34"],
        ],
      },
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.5,
        1,
      ],
    },
  };
  const [hoverInfo, setHoverInfo] = React.useState<any>(null);
  const [prevHoverInfo, setPrevHoverInfo] = React.useState<any>(null);
  const [pinMarkerHoverInfo, setPinMarkerHoverInfo] =
    React.useState<GeoMapPinMarker | null>(null);
  const [investmentsPinMarkerHoverInfo, setInvestmentsPinMarkerHoverInfo] =
    React.useState<InvestmentsGeoMapPinMarker | null>(null);
  const [allocationsPinMarkerHoverInfo, setAllocationsPinMarkerHoverInfo] =
    React.useState<AllocationsGeoMapPinMarker | null>(null);
  const [renderedLines, setRenderedLines] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (isSmallScreen) {
      setViewport({
        ...viewport,
        zoom: 0.5,
      });
      setSettings({
        ...settings,
        minZoom: 0.5,
      });
    } else {
      setViewport({
        ...viewport,
        zoom: 1.3,
      });
      setSettings({
        ...settings,
        minZoom: 1.3,
      });
    }
  }, [isSmallScreen]);

  React.useEffect(() => {
    if (
      pinMarkerHoverInfo &&
      pinMarkerHoverInfo.d2hCoordinates &&
      pinMarkerHoverInfo.d2hCoordinates.length > 0
    ) {
      const allD2HofSameCountryDonor = filter(
        props.pins,
        (pin: GeoMapPinMarker) => {
          if (
            pin.d2hCoordinates &&
            pinMarkerHoverInfo &&
            pinMarkerHoverInfo.d2hCoordinates
          ) {
            return (
              pin.d2hCoordinates[0][0] ===
                pinMarkerHoverInfo.d2hCoordinates[0][0] &&
              pin.d2hCoordinates[0][1] ===
                pinMarkerHoverInfo.d2hCoordinates[0][1]
            );
          }
          return false;
        }
      );
      const lineIds: string[] = [];
      allD2HofSameCountryDonor.forEach((item: GeoMapPinMarker) => {
        const positions = item.d2hCoordinates
          ? item.d2hCoordinates.map((c: number[]) => [c[1], c[0]])
          : [];
        const line = bezierSpline(lineString(positions), { sharpness: 0 });
        lineIds.push(item.intId.toString());
        if (mapRef.current) {
          // @ts-ignore
          mapRef.current.addLayer({
            id: item.intId.toString(),
            type: "line",
            metadata: item,
            source: {
              type: "geojson",
              data: line,
            },
            paint: {
              "line-width": 2,
              "line-color": "#13183F",
              "line-dasharray": [3, 3],
            },
          });
        }
      });
      setRenderedLines(lineIds);
    } else if (renderedLines.length > 0) {
      renderedLines.forEach((line: string) => {
        // @ts-ignore
        if (mapRef.current && mapRef.current.getSource(line)) {
          // @ts-ignore
          mapRef.current.removeLayer(line);
          // @ts-ignore
          mapRef.current.removeSource(line);
        }
      });
    }
  }, [pinMarkerHoverInfo]);

  const onHover = (event: any) => {
    const {
      features,
      srcEvent: { pageX, pageY },
    } = event;
    const hoveredFeature = features && features[0];
    const tileWithData =
      hoveredFeature &&
      hoveredFeature.properties &&
      hoveredFeature.properties.name &&
      hoveredFeature.properties.value > 0;

    if (mapRef.current && !isMobile && !isTouchDevice()) {
      if (tileWithData) {
        // @ts-ignore
        mapRef.current.setFeatureState(
          {
            source: "geojson-data-source",
            id: hoveredFeature.id,
          },
          { hover: true }
        );
      }
      if (
        prevHoverInfo &&
        prevHoverInfo.id !== (hoveredFeature ? hoveredFeature.id : -1)
      ) {
        // @ts-ignore
        mapRef.current.setFeatureState(
          {
            source: "geojson-data-source",
            id: prevHoverInfo.id,
          },
          { hover: false }
        );
      }
    }

    setPrevHoverInfo(hoverInfo);
    setHoverInfo(
      tileWithData
        ? {
            id: hoveredFeature.id,
            properties: {
              ...hoveredFeature.properties,
              data: JSON.parse(hoveredFeature.properties.data),
            },
            x: pageX,
            y: pageY,
          }
        : null
    );
  };

  const onClick = React.useCallback((event: any) => {
    // if (isMobile || isTouchDevice()) {
    //   // disabled cause was causing a double click on touch devices
    //   // onHover(event);
    // } else if (props.allowClickthrough) {
    //   const { features } = event;
    //   const hoveredFeature = features && features[0];
    //   if (
    //     hoveredFeature &&
    //     hoveredFeature.properties &&
    //     hoveredFeature.properties.iso_a3 &&
    //     hoveredFeature.properties.value > 0
    //   ) {
    //     history.push(
    //       `/location/${hoveredFeature.properties.iso_a3}/${
    //         props.clickthroughPath || "overview"
    //       }`
    //     );
    //   }
    // }
  }, []);

  function zoomIn() {
    if (settings.maxZoom > viewport.zoom) {
      setViewport({
        ...viewport,
        zoom: viewport.zoom + 0.5,
      });
    }
  }

  function zoomOut() {
    if (viewport.zoom >= settings.minZoom) {
      setViewport({
        ...viewport,
        zoom:
          viewport.zoom - 0.5 > settings.minZoom
            ? viewport.zoom - 0.5
            : settings.minZoom,
      });
    }
  }

  const uMapStyle = mapStyle;
  if (props.data.features.length === 0 || props.noData) {
    uMapStyle.layers[0].paint["background-color"] = "hsl(204, 10%, 80%)";
  }

  let heightDef =
    props.investmentsPins.length > 0 || props.pins.length > 0
      ? "183px"
      : "244px";

  if (props.type === "allocations") {
    heightDef = "274px";
  }

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      css={`
        width: 100%;
        height: ${isSmallScreen ? `50vh` : `calc(100vh - ${heightDef})`};

        @media (max-width: 767px) {
          width: 100vw;
          margin-left: -16px;
          height: calc(100vh - 300px);

          .mapboxgl-popup {
            width: 100vw;
            padding-left: 16px;
            transform: none !important;
          }
        }
      `}
    >
      <MapGL
        {...viewport}
        {...settings}
        width="100%"
        height="100%"
        onHover={onHover}
        onClick={onClick}
        mapStyle={uMapStyle}
        ref={(ref: MapRef) => {
          if (ref) mapRef.current = ref.getMap();
        }}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <Source
          generateId
          id="geojson-data-source"
          type="geojson"
          data={
            props.noData
              ? {
                  type: "FeatureCollection",
                  features: [],
                }
              : props.data
          }
        >
          <Layer {...layerStyle} />
          <Layer {...layerBorderStyle} />
        </Source>
        {props.investmentsPins.map((pin: InvestmentsGeoMapPinMarker) => {
          const icons = getMapPinIcons("Multicountry");
          return (
            <MapPin
              key={pin.id}
              marker={pin}
              setMarkerInfo={setInvestmentsPinMarkerHoverInfo}
              onClick={() => history.push(`/location/${pin.code}/overview`)}
              {...icons}
            />
          );
        })}
        {investmentsPinMarkerHoverInfo && (
          <Popup
            tipSize={0}
            dynamicPosition
            offsetLeft={20}
            closeButton={false}
            latitude={investmentsPinMarkerHoverInfo.latitude}
            longitude={investmentsPinMarkerHoverInfo.longitude}
            css={`
              z-index: 100;

              .mapboxgl-popup-content {
                width: 0px !important;
                height: 0px !important;
                padding: 0px !important;
              }
            `}
          >
            <div
              css={`
                width: 350px;
                padding: 20px;
                position: absolute;
                background: #f4f4f4;
                border-radius: 20px;

                @media (max-width: 767px) {
                  background: #fff;
                  width: calc(100vw - 32px);
                  box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.3);
                }
              `}
            >
              {(isMobile || isTouchDevice()) && (
                <div
                  css={`
                  display: flex;
                  flex-direction: row;
                  justify-content flex-end;

                  path {
                    fill: #2E4063;
                  }
                `}
                >
                  <IconButton
                    onTouchStart={() => {
                      setInvestmentsPinMarkerHoverInfo(null);
                    }}
                    css={`
                      padding: 0;
                    `}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              )}
              <GeomapTooltip
                name={investmentsPinMarkerHoverInfo.geoName}
                data={{
                  components: investmentsPinMarkerHoverInfo.components,
                  disbursed: investmentsPinMarkerHoverInfo.disbursed,
                  committed: investmentsPinMarkerHoverInfo.committed,
                  signed: investmentsPinMarkerHoverInfo.signed,
                }}
                investmentSubType={props.investmentSubType}
              />
              {/* {(isMobile || isTouchDevice()) && (
                <div
                  css={`
                    display: flex;
                    margin-top: 10px;
                    flex-direction: row;
                    justify-content: flex-end;
                  `}
                >
                  <TooltipButton
                    type="button"
                    onTouchStart={() => {
                      history.push(
                        `/location/${investmentsPinMarkerHoverInfo.code}/overview`
                      );
                    }}
                  >
                    {get(cmsData, "componentsChartsGeomap.goToDetail", "")}
                  </TooltipButton>
                </div>
              )} */}
            </div>
          </Popup>
        )}
        {props.allocationsPins.map((pin: AllocationsGeoMapPinMarker) => {
          const icons = getMapPinIcons("Multicountry");
          return (
            <MapPin
              key={pin.id}
              marker={pin}
              setMarkerInfo={setAllocationsPinMarkerHoverInfo}
              onClick={() => {
                // history.push(`/location/${pin.code}/overview`);
              }}
              {...icons}
            />
          );
        })}
        {allocationsPinMarkerHoverInfo && (
          <Popup
            tipSize={0}
            dynamicPosition
            offsetLeft={20}
            closeButton={false}
            latitude={allocationsPinMarkerHoverInfo.latitude}
            longitude={allocationsPinMarkerHoverInfo.longitude}
            css={`
              z-index: 100;

              .mapboxgl-popup-content {
                width: 0px !important;
                height: 0px !important;
                padding: 0px !important;
              }
            `}
          >
            <div
              css={`
                width: 350px;
                padding: 20px;
                position: absolute;
                background: #f4f4f4;
                border-radius: 20px;

                @media (max-width: 767px) {
                  background: #fff;
                  width: calc(100vw - 32px);
                  box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.3);
                }
              `}
            >
              {(isMobile || isTouchDevice()) && (
                <div
                  css={`
                  display: flex;
                  flex-direction: row;
                  justify-content flex-end;

                  path {
                    fill: #2E4063;
                  }
                `}
                >
                  <IconButton
                    onTouchStart={() => {
                      setAllocationsPinMarkerHoverInfo(null);
                    }}
                    css={`
                      padding: 0;
                    `}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              )}
              <GeomapAllocationsTooltip
                name={allocationsPinMarkerHoverInfo.geoName}
                data={{
                  components: allocationsPinMarkerHoverInfo.components,
                  value: allocationsPinMarkerHoverInfo.value,
                }}
                valueLabel={props.type}
              />
              {(isMobile || isTouchDevice()) && (
                <div
                  css={`
                    display: flex;
                    margin-top: 10px;
                    flex-direction: row;
                    justify-content: flex-end;
                  `}
                >
                  <TooltipButton
                    type="button"
                    onTouchStart={() => {
                      // history.push(
                      //   `/location/${allocationsPinMarkerHoverInfo.code}/overview`
                      // );
                    }}
                  >
                    {get(cmsData, "componentsChartsGeomap.goToDetail", "")}
                  </TooltipButton>
                </div>
              )}
            </div>
          </Popup>
        )}
        {props.pins.map((pin: GeoMapPinMarker) => {
          const icons = getMapPinIcons(pin.subType);
          return (
            <MapPin
              key={pin.id}
              marker={pin}
              setMarkerInfo={setPinMarkerHoverInfo}
              onClick={() => console.log("onClick")}
              {...icons}
            />
          );
        })}
        {pinMarkerHoverInfo && (
          <Popup
            tipSize={0}
            dynamicPosition
            offsetLeft={20}
            closeButton={false}
            latitude={pinMarkerHoverInfo.latitude}
            longitude={pinMarkerHoverInfo.longitude}
            css={`
              z-index: 100;

              .mapboxgl-popup-content {
                width: 0px !important;
                height: 0px !important;
                padding: 0px !important;
              }
            `}
          >
            <div
              css={`
                width: 350px;
                padding: 20px;
                position: absolute;
                background: #f4f4f4;
                border-radius: 20px;

                @media (max-width: 767px) {
                  background: #fff;
                  width: calc(100vw - 32px);
                  box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.3);
                }
              `}
            >
              {(isMobile || isTouchDevice()) && (
                <div
                  css={`
                    display: flex;
                    flex-direction: row;
                    justify-content flex-end;

                    path {
                      fill: #2E4063;
                    }
                  `}
                >
                  <IconButton
                    onTouchStart={() => {
                      setPinMarkerHoverInfo(null);
                    }}
                    css={`
                      padding: 0;
                    `}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              )}
              <GeomapPinTooltip pin={pinMarkerHoverInfo} allPins={props.pins} />
            </div>
          </Popup>
        )}
        <GeoMapControls
          css={`
            z-index: 200;
          `}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
        />
      </MapGL>
      {hoverInfo &&
        (isHovering || isMobile || isTouchDevice()) &&
        props.type === "investments" && (
          <div
            css={`
              z-index: 100;
              width: 350px;
              padding: 20px;
              position: absolute;
              background: #f4f4f4;
              border-radius: 20px;
              top: ${hoverInfo.y + 50}px;
              left: ${hoverInfo.x - 180}px;

              @media (max-width: 767px) {
                top: 29vh;
                left: 16px;
                background: #fff;
                width: calc(100vw - 32px);
                box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.3);
              }
            `}
          >
            {(isMobile || isTouchDevice()) && (
              <div
                css={`
            display: flex;
            flex-direction: row;
            justify-content flex-end;

            path {
              fill: #2E4063;
            }
          `}
              >
                <IconButton
                  onTouchStart={() => {
                    setHoverInfo(null);
                  }}
                  css={`
                    padding: 0;
                  `}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            )}
            <GeomapTooltip
              {...hoverInfo.properties}
              investmentSubType={props.investmentSubType}
            />
            {(isMobile || isTouchDevice()) && (
              <div
                css={`
                  width: 100%;
                  display: flex;
                  margin-top: 10px;
                  flex-direction: row;
                  justify-content: flex-end;
                `}
              >
                <TooltipButton
                  type="button"
                  onTouchStart={() => {
                    // history.push(
                    //   `/location/${hoverInfo.properties.iso_a3}/overview`
                    // );
                  }}
                >
                  {get(cmsData, "componentsChartsGeomap.locationDetail", "")}
                </TooltipButton>
              </div>
            )}
          </div>
        )}
      {hoverInfo &&
        (isHovering || isMobile || isTouchDevice()) &&
        (props.type === "allocations" || props.type === "budgets") && (
          <div
            css={`
              z-index: 100;
              width: 350px;
              padding: 20px;
              position: absolute;
              background: #f4f4f4;
              border-radius: 20px;
              top: ${hoverInfo.y + 50}px;
              left: ${hoverInfo.x - 180}px;

              @media (max-width: 767px) {
                top: 29vh;
                left: 16px;
                background: #fff;
                width: calc(100vw - 32px);
                box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.3);
              }
            `}
          >
            {(isMobile || isTouchDevice()) && (
              <div
                css={`
            display: flex;
            flex-direction: row;
            justify-content flex-end;

            path {
              fill: #2E4063;
            }
          `}
              >
                <IconButton
                  onTouchStart={() => {
                    setHoverInfo(null);
                  }}
                  css={`
                    padding: 0;
                  `}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            )}
            <GeomapAllocationsTooltip
              valueLabel={props.type}
              {...hoverInfo.properties}
            />
            {(isMobile || isTouchDevice()) && (
              <div
                css={`
                  width: 100%;
                  display: flex;
                  margin-top: 10px;
                  flex-direction: row;
                  justify-content: flex-end;
                `}
              >
                <TooltipButton
                  type="button"
                  onTouchStart={() => {
                    // history.push(
                    //   `/location/${hoverInfo.properties.iso_a3}/overview`
                    // );
                  }}
                >
                  {/* {get(cmsData, "componentsChartsGeomap.locationDetail", "")} */}
                  Country Detail Page
                </TooltipButton>
              </div>
            )}
          </div>
        )}
      {hoverInfo &&
        (isHovering || isMobile || isTouchDevice()) &&
        props.type === "donors" && (
          <div
            css={`
              z-index: 100;
              width: 350px;
              padding: 20px;
              position: absolute;
              background: #f4f4f4;
              border-radius: 20px;
              top: ${hoverInfo.y + 50}px;
              left: ${hoverInfo.x - 180}px;

              @media (max-width: 767px) {
                top: 29vh;
                left: 16px;
                background: #fff;
                width: calc(100vw - 32px);
                box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.3);
              }
            `}
          >
            {(isMobile || isTouchDevice()) && (
              <div
                css={`
                display: flex;
                flex-direction: row;
                justify-content flex-end;

                path {
                  fill: #2E4063;
                }
              `}
              >
                <IconButton
                  onTouchStart={() => {
                    setHoverInfo(null);
                  }}
                  css={`
                    padding: 0;
                  `}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            )}
            <GeomapPinTooltip
              allPins={props.pins}
              pin={hoverInfo.properties.data}
            />
          </div>
        )}
      {props.noData && <NoDataLabel />}
    </div>
  );
}
