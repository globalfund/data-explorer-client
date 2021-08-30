/* eslint-disable no-case-declarations */
// @ts-ignore
import domtoimage from "dom-to-image";

function getFileName(
  pathname: string,
  options: {
    selectedAggregation: string;
    investmentsMapView: string;
    donorMapView: string;
    isDetail: boolean;
  }
): string {
  const isComponent = options.selectedAggregation === "componentName";
  switch (pathname) {
    case "/viz/investments/disbursements":
      return "investments-treemap";
    case "/viz/investments/time-cycle":
      return "investments-bar";
    case "/viz/investments/geomap":
      return `investments-${options.investmentsMapView}`;
    case "/viz/budgets/flow":
      return "budgets-flow";
    case "/viz/budgets/time-cycle":
      return "budgets-time-cycle";
    case "/viz/budgets/geomap":
      return `budgets-${options.investmentsMapView}`;
    case "/viz/allocations":
      return "allocations";
    case "/viz/allocations/geomap":
      return `allocations-${options.investmentsMapView}`;
    case "/viz/allocation":
      return "allocations";
    case "/viz/eligibility":
      if (options.isDetail) {
        return "location-eligibility";
      }
      return `eligibility-by-${isComponent ? "component" : "location"}`;
    case "/viz/pledges-contributions/time-cycle":
      return "pledges-contributions-time-cycle";
    case "/viz/pledges-contributions/geomap":
      return `pledges-contributions-${options.donorMapView
        .toLowerCase()
        .replace(/ /g, "-")}`;
    case "/grants":
      return "grants";
    case "/viz/grants":
      return "grants";
    case "/results":
      return "results";
    default:
      return "";
  }
}

export function exportView(
  id: string,
  type: "jpg" | "png" | "svg" | "map",
  pathname: string,
  options: {
    selectedAggregation: string;
    investmentsMapView: string;
    donorMapView: string;
    isDetail: boolean;
  }
): void {
  const node = document.getElementById(id);
  if (node) {
    const filename = getFileName(pathname, options);
    switch (type) {
      case "jpg":
        domtoimage
          .toJpeg(node)
          .then((dataUrl: any) => {
            const link = document.createElement("a");
            link.download = `${filename}.jpg`;
            link.href = dataUrl;
            link.click();
          })
          .catch((error: any) => {
            console.error("oops, something went wrong!", error);
          });
        break;
      case "png":
        domtoimage
          .toPng(node)
          .then((dataUrl: any) => {
            const link = document.createElement("a");
            link.download = `${filename}.png`;
            link.href = dataUrl;
            link.click();
          })
          .catch((error: any) => {
            console.error("oops, something went wrong!", error);
          });
        break;
      case "svg":
        domtoimage
          .toSvg(node)
          .then((dataUrl: any) => {
            const link = document.createElement("a");
            link.download = `${filename}.svg`;
            link.href = dataUrl;
            link.click();
          })
          .catch((error: any) => {
            console.error("oops, something went wrong!", error);
          });
        break;
      case "map":
        const mapCanvas = document.querySelector(".mapboxgl-canvas");
        if (mapCanvas) {
          const dataUrl = (mapCanvas as HTMLCanvasElement).toDataURL();
          const link = document.createElement("a");
          link.download = `${filename}.png`;
          link.href = dataUrl;
          link.click();
        }
        break;
      default:
        break;
    }
  }
}
