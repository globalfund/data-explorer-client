export const headingOptions = [
  {
    label: "Light",
    value: "paragraph",
    // style: { fontWeight: "400", fontSize: "16px" },
  },
  {
    label: "Medium",
    value: "title",
    // style: { fontWeight: "700", fontSize: "48px" },
  },
  {
    label: "Bold",
    value: "subtitle",
    style: { fontWeight: "700", fontSize: "24px" },
  },
  {
    label: "Extra Bold",
    value: "1",
    style: { fontWeight: "700", fontSize: "18px" },
  },
  {
    label: "Thin Italic",
    value: "2",
    style: { fontWeight: "700", fontSize: "14px" },
  },
  {
    label: "Medium Italic",
    value: "3",
    style: { fontWeight: "400", fontSize: "12px" },
  },
  {
    label: "Bold Italic",
    value: "3",
    style: { fontWeight: "400", fontSize: "12px" },
  },
  {
    label: "Extra Bold Italic",
    value: "3",
    style: { fontWeight: "400", fontSize: "12px" },
  },
];

export const fontFamilyOptions = [
  {
    label: "Amatic SC",
    value: "Amatic SC",
    stateVar: "isFontFamilyAmaticSC",
    fontWeight: "400",
  },
  {
    label: "Arial",
    value: "Arial",
    stateVar: "isFontFamilyArial",
    fontWeight: "400",
  },
  {
    label: "Caveat",
    value: "Caveat",
    stateVar: "isFontFamilyCaveat",
    fontWeight: "700",
  },
  {
    label: "Comfortaa",
    value: "Comfortaa",
    stateVar: "isFontFamilyComfortaa",
    fontWeight: "400",
  },
  {
    label: "Comic Sans MS",
    value: "Comic Sans MS",
    stateVar: "isFontFamilyComicSansMS",
    fontWeight: "700",
  },
  {
    label: "Courier New",
    value: "Courier New",
    stateVar: "isFontFamilyCourierNew",
    fontWeight: "400",
  },
  {
    label: "EB Garamond",
    value: "EB Garamond",
    stateVar: "isFontFamilyEBGaramond",
    fontWeight: "400",
  },
  {
    label: "Finlandica",
    value: "Finlandica",
    stateVar: "isFontFamilyFinlandica",
    fontWeight: "400",
  },
  {
    label: "Impact",
    value: "Impact",
    stateVar: "isFontFamilyImpact",
    fontWeight: "400",
  },
  {
    label: "Inter",
    value: "Inter",
    stateVar: "isFontFamilyInter",
    fontWeight: "400",
  },
];

export const fontSizeOptions = Array.from({ length: 72 }, (_, i) => i + 8).map(
  (size) => ({
    label: `${size}px`,
    value: size.toString(),
  }),
);

export const lineHeightOptions = [
  {
    label: "auto",
    value: "auto",
  },
];
