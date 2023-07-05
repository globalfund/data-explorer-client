// @ts-ignore
import domtoimage from "dom-to-image";

export function exportPage(type: string, bgcolor: string) {
  let node = document.getElementById("export-container");
  if (!node) {
    node = document.getElementById("common-chart-render-container");
  }
  // const filter = (n: any) => n.id !== "app-bar" && n.id !== "subheader-toolbar";
  if (type === "jpg") {
    domtoimage
      .toJpeg(node, { bgcolor })
      .then((dataUrl: any) => {
        const link = document.createElement("a");
        link.download = "download.jpg";
        link.href = dataUrl;
        link.click();
      })
      .catch((error: any) => {
        console.error("oops, something went wrong!", error);
      });
  } else if (type === "svg") {
    domtoimage
      .toSvg(node, { bgcolor })
      .then((dataUrl: any) => {
        const link = document.createElement("a");
        link.download = "download.svg";
        link.href = dataUrl;
        link.click();
      })
      .catch((error: any) => {
        console.error("oops, something went wrong!", error);
      });
  } else {
    domtoimage
      .toPng(node, {
        bgcolor,
      })
      .then((dataUrl: any) => {
        const link = document.createElement("a");
        link.download = "download.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((error: any) => {
        console.error("oops, something went wrong!", error);
      });
  }
}
