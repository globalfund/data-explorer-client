/* eslint-disable no-case-declarations */
// @ts-ignore
import domtoimage from "dom-to-image";

export function exportView(
  id: string,
  type: "jpg" | "png" | "svg" | "map"
): void {
  const node = document.getElementById(id);
  if (node) {
    switch (type) {
      case "jpg":
        domtoimage
          .toJpeg(node)
          .then((dataUrl: any) => {
            const link = document.createElement("a");
            link.download = "download.jpg";
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
            link.download = "download.png";
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
            link.download = "download.svg";
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
          link.download = "download.png";
          link.href = dataUrl;
          link.click();
        }
        break;
      default:
        break;
    }
  }
}