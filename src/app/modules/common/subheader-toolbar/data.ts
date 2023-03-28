export interface SubheaderToolbarProps {
  pageType: "chart" | "report";
  visualOptions?: any;
  name: string;
  setName: (name: string) => void;
}
