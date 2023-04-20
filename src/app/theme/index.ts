// @ts-nocheck

import { createTheme } from "@material-ui/core/styles";
import { Palette } from "@material-ui/core/styles/createPalette";

import {
  FontStyle,
  TypographyOptions,
} from "@material-ui/core/styles/createTypography";

interface Icon {
  black: string;
}

interface ProjectPalette extends Palette {
  icon: Icon;
}

export const TextStyle: FontStyle = {
  fontFamily: '"GothamNarrow-Book", "Helvetica", "Arial", sans-serif',
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
};

export const ProjectTextStyles = {
  explanation: {
    fontFamily: TextStyle.fontFamily,
    fontSize: `${0.8571428571428571}rem`,
    fontWeight: TextStyle.fontWeightLight,
    letterSpacing: "0.42px",
    color: "#185568",
  },
};

export const ProjectPalette: ProjectPalette = {
  tonalOffset: 0.2,
  background: { paper: "#fff", default: "#fafafa" },
  contrastThreshold: 3,
  grey: {
    "50": "#fafafa",
    "100": "#f5f5f5",
    "200": "#eeeeee",
    "300": "#e0e0e0",
    "400": "#bdbdbd",
    "500": "#9e9e9e",
    "600": "#757575",
    "700": "#616161",
    "800": "#424242",
    "900": "#a1a3a6",
    A700: "#616161",
    A100: "#d5d5d5",
    A400: "#303030",
    A200: "#aaaaaa",
  },
  text: {
    primary: "#222222",
    // secondary: '#fff',
    secondary: "#6f7173",
    disabled: "rgba(0, 0, 0, 0.38)",
    hint: "rgba(0, 0, 0, 0.38)",
  },
  divider: "rgba(0, 0, 0, 0.12)",
  primary: {
    main: "#262C34",
    light: "#2f3b52",
    dark: "rgb(25, 32, 46)",
    contrastText: "#fff",
  },
  secondary: {
    main: "#25baa4",
    light: "rgb(80,199,182)",
    dark: "rgb(25, 130, 114)",
    contrastText: "#ffffff",
  },
  common: { black: "#000", white: "#fff" },
  error: {
    light: "#e57373",
    main: "#f44336",
    dark: "#d32f2f",
    contrastText: "#fff",
  },
  type: "light",
  action: {
    hoverOpacity: 0.08,
    hover: "rgba(0, 0, 0, 0.08)",
    // selected: "rgba(0, 0, 0, 0.14)",
    selected: "#13183F",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabled: "rgba(0, 0, 0, 0.26)",
    active: "rgba(0, 0, 0, 0.54)",
  },
};

export const ProjectTypography: TypographyOptions = {
  h1: {
    fontFamily: TextStyle.fontFamily,
    fontSize: `${4}rem`,
    fontWeight: TextStyle.fontWeightMedium,
    letterSpacing: "-0.5px",
  },
  h2: {
    fontFamily: TextStyle.fontFamily,
    fontSize: `${3.5}rem`,
    fontWeight: TextStyle.fontWeightRegular,
    lineHeight: "64px",
  },
  h3: {
    fontFamily: TextStyle.fontFamily,
    fontSize: `${3}rem`,
    fontWeight: TextStyle.fontWeightMedium,
    lineHeight: "normal",
    letterSpacing: "normal",
    fontStyle: "normal",
  },
  h4: {
    fontFamily: TextStyle.fontFamily,
    fontSize: `${2.125}rem`,
    fontWeight: TextStyle.fontWeightBold,
    letterSpacing: "0.3px",
  },
  h6: {
    fontFamily: TextStyle.fontFamily,
    fontSize: `${1.25}rem`,
    fontWeight: TextStyle.fontWeightBold,
    lineHeight: "1.5",
    letterSpacing: "normal",
  },
  h5: {
    fontFamily: TextStyle.fontFamily,
    fontSize: `${1.25}rem`,
    fontWeight: TextStyle.fontWeightMedium,
    lineHeight: "1.5",
  },
  subtitle1: {
    fontFamily: TextStyle.fontFamily,
    fontSize: `${0.9}rem`,
    fontWeight: TextStyle.fontWeightRegular,
    lineHeight: "1.2",
    letterSpacing: "0.25px",
  },
  subtitle2: {
    fontFamily: TextStyle.fontFamily,
    fontSize: `${1.1428571428571428}rem`,
    fontWeight: TextStyle.fontWeightMedium,
  },
  button: {
    textTransform: "uppercase",
    color: ProjectPalette.text.primary,
    fontFamily: TextStyle.fontFamily,
    fontSize: `${0.875}rem`,
    fontWeight: 500,
  },
  caption: {
    color: ProjectPalette.primary.light,
    fontFamily: TextStyle.fontFamily,
    lineHeight: `${1.375}em`,
    fontSize: `${0.6}rem`,
    fontWeight: TextStyle.fontWeightBold,
  },
  body1: {
    color: ProjectPalette.text.primary,
    fontFamily: TextStyle.fontFamily,
    lineHeight: `1.5`,
    fontSize: `${1}rem`,
    letterSpacing: "0.5px",
    fontWeight: 300,
  },
  body2: {
    color: ProjectPalette.text.primary,
    fontFamily: TextStyle.fontFamily,
    lineHeight: `${1.71429}em`,
    fontSize: `${0.875}rem`,
    fontWeight: 500,
  },
};

export default createTheme({
  overrides: {
    // Name of the component ⚛️
    // MuiCssBaseline: {
    //   // Name of the rule
    //   "@global": {
    //     "*, *::before, *::after": {
    //       transition: "none !important",
    //       animation: "none !important",
    //     },
    //   },
    // },
    MuiTabs: {
      indicator: {
        height: "4px",
      },
    },
    MuiTab: {
      wrapper: {
        color: ProjectPalette.common.black,
        fontWeight: 600,
        fontSize: "14px",
      },
    },
    MuiCardHeader: {
      root: {
        paddingBottom: 0,
      },
    },
    MuiCard: {
      root: {
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
      },
    },
    MuiFormControlLabel: {
      label: {
        fontSize: 12,
      },
    },
    MuiListItem: {
      button: {
        "&:hover": {
          color: "#262c34",
          backgroundColor: "#fff",
          transition: "background 0.2s ease-in-out",
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: 12,
        color: "#fff",
        backgroundColor: "#373d43",
        fontFamily: '"GothamNarrow-Book", "Helvetica", "Arial", sans-serif',
      },
    },
    MuiBottomNavigationAction: {
      label: {
        fontSize: 12,
        fontFamily: "GothamNarrow-Book",
        "&.Mui-selected": {
          fontSize: 12,
        },
      },
    },
    MuiCheckbox: {
      colorPrimary: "#252c34",
    },
  },
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: { xs: 0, lg: 1280, sm: 600, xl: 1920, md: 960 },
  },
  mixins: {
    toolbar: {
      minHeight: 56,
      "@media (min-width:0px) and (orientation: landscape)": { minHeight: 48 },
      "@media (min-width:600px)": { minHeight: 64 },
    },
  },
  shadows: [
    "none",
    "0px 1px 3px 0px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
    "0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    "0px 1px 8px 0px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 3px 3px -2px rgba(0, 0, 0, 0.12)",
    "0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0, 0, 0, 0.12)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    "0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0, 0, 0, 0.12)",
    "0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
    "0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0, 0, 0, 0.12)",
    "0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0, 0, 0, 0.12)",
    "0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0, 0, 0, 0.12)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0, 0, 0, 0.12)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0, 0, 0, 0.12)",
    "0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0, 0, 0, 0.12)",
    "0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
    "0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0, 0, 0, 0.12)",
    "0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0, 0, 0, 0.12)",
    "0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0, 0, 0, 0.12)",
    "0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0, 0, 0, 0.12)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0, 0, 0, 0.12)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0, 0, 0, 0.12)",
    "0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0, 0, 0, 0.12)",
    "0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0, 0, 0, 0.12)",
    "0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
  ],
  direction: "ltr",
  /* transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      standard: 300,
      short: 250,
      enteringScreen: 225,
      shorter: 200,
      leavingScreen: 195,
      shortest: 150,
      complex: 375,
    },
  }, */
  typography: ProjectTypography,
  zIndex: {
    modal: 1300,
    snackbar: 1400,
    drawer: 1200,
    appBar: 1100,
    mobileStepper: 1000,
    tooltip: 1500,
  },
  shape: { borderRadius: 4 },
  spacing: 8,
  palette: ProjectPalette,
});

// COMMON
const WHITE = "#fff";

const PRIMARY_COLOR_1 = "#262C34";
const PRIMARY_COLOR_2 = "#495057";

const SECONDARY_COLOR_1 = "#373D43";
const SECONDARY_COLOR_2 = "#70777E";
const SECONDARY_COLOR_3 = "#868E96";
const SECONDARY_COLOR_4 = "#98A1AA";
const SECONDARY_COLOR_5 = "#ADB5BD";
const SECONDARY_COLOR_6 = "#CFD4DA";
const SECONDARY_COLOR_7 = "#DFE3E6";
const SECONDARY_COLOR_8 = "#F1F3F5";
const SECONDARY_COLOR_9 = "#FFFFFF";
const SECONDARY_COLOR_10 = "#F5F5F7";
const SECONDARY_COLOR_11 = "#C7CDD1";
const SECONDARY_COLOR_12 = "#595c70";
const SECONDARY_COLOR_13 = "#13183F";
const SECONDARY_COLOR_14 = "#ACAFBC";
const SECONDARY_COLOR_15 = "#C4C4C4";
const SECONDARY_COLOR_17 = "#1B2127";
const SECONDARY_COLOR_18 = "#2E4063";
const SECONDARY_COLOR_19 = "#525252";

const GRAPH_COLOR_1 = "#B1BCC8";
const GRAPH_COLOR_2 = "#D7D8DD";
const GRAPH_COLOR_3 = "#F1ECEC";
const GRAPH_COLOR_4 = "#FFFFFF";
const GRAPH_COLOR_5 = "#E4EBF8";
const GRAPH_COLOR_6 = "#D9D4FA";
const GRAPH_COLOR_7 = "#C3C9EC";
const GRAPH_COLOR_8 = "#CBD1D7";
const GRAPH_COLOR_9 = "#D7D8DD";
const GRAPH_COLOR_10 = "#ECE9E9";
const GRAPH_COLOR_11 = "#F2F2F2";
const GRAPH_COLOR_12 = "#E0E5ED";
const GRAPH_COLOR_13 = "#DFDDF0";
const GRAPH_COLOR_14 = "#D4D7E9";
const GRAPH_COLOR_15 = "#FA7355";
const GRAPH_COLOR_16 = "#FA9A55";
const GRAPH_COLOR_17 = "#FFAA46";
const GRAPH_COLOR_18 = "#FFD646";
const GRAPH_COLOR_19 = "#DAFF46";
const GRAPH_COLOR_20 = "#97FF46";
const GRAPH_COLOR_21 = "#60FF46";
const GRAPH_COLOR_22 = "#73D3CD";
const GRAPH_COLOR_23 = "#11AD6B";

const GRADIENT = "linear-gradient(90deg, #cdd4df 0%, #252c34 100%)";

export const appColors = {
  COMMON: {
    WHITE,
    PRIMARY_COLOR_1,
    PRIMARY_COLOR_2,
    SECONDARY_COLOR_1,
    SECONDARY_COLOR_2,
    SECONDARY_COLOR_3,
    SECONDARY_COLOR_4,
    SECONDARY_COLOR_5,
    SECONDARY_COLOR_6,
    SECONDARY_COLOR_7,
    SECONDARY_COLOR_10,
    SECONDARY_COLOR_11,
    SECONDARY_COLOR_12,
    SECONDARY_COLOR_13,
    SECONDARY_COLOR_14,
    SECONDARY_COLOR_15,
    SECONDARY_COLOR_17,
    SECONDARY_COLOR_18,
    SECONDARY_COLOR_19,
    COMMON_ICON_COLOR: WHITE,
    PAGE_BACKGROUND_COLOR_1: WHITE,
    PAGE_BACKGROUND_COLOR_2: SECONDARY_COLOR_10,
    SELECTED_ITEM_VALUE_COLOR: "#E2E2E2",
  },
  GRAPH_COLORS: {
    GRAPH_COLOR_1,
    GRAPH_COLOR_2,
    GRAPH_COLOR_3,
    GRAPH_COLOR_4,
    GRAPH_COLOR_5,
    GRAPH_COLOR_6,
    GRAPH_COLOR_7,
    GRAPH_COLOR_8,
    GRAPH_COLOR_9,
    GRAPH_COLOR_10,
    GRAPH_COLOR_11,
    GRAPH_COLOR_12,
    GRAPH_COLOR_13,
    GRAPH_COLOR_14,
    GRAPH_COLOR_15,
    GRAPH_COLOR_16,
    GRAPH_COLOR_17,
    GRAPH_COLOR_18,
    GRAPH_COLOR_19,
    GRAPH_COLOR_20,
    GRAPH_COLOR_21,
    GRAPH_COLOR_22,
    GRAPH_COLOR_23,
  },
  BREADCRUMBS: {
    ITEM_BUTTON_BACKGROUND_COLOR: SECONDARY_COLOR_3,
    ITEM_BUTTON_SELECTED_BACKGROUND_COLOR: PRIMARY_COLOR_2,
    ITEM_BUTTON_COLOR: WHITE,
    ITEM_ARROW_COLOR: PRIMARY_COLOR_2,
  },
  APPBAR: {
    MOBILE_HEADER_CHEVRON_ICON_COLOR: WHITE,
    DATASETS_MENU_SCROLLBAR_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    DATASETS_MENU_SCROLLBAR_TRACK_BACKGROUND_COLOR: SECONDARY_COLOR_7,
    DATASETS_MENU_SCROLLBAR_THUMB_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    DATASETS_MENU_ITEM_COLOR: PRIMARY_COLOR_1,
    DATASETS_MENU_ITEM_BORDER_BOTTOM_COLOR: SECONDARY_COLOR_7,
    LINK_COLOR: SECONDARY_COLOR_7,
    LINK_ACTIVE_COLOR: WHITE,
    SEARCH_ICON_COLOR: PRIMARY_COLOR_1,
    SEARCH_CLOSE_ICON_COLOR: WHITE,
    SEARCH_ICON_BACKGROUND_COLOR: SECONDARY_COLOR_7,
  },
  BUDGETS_FLOW: {
    NODE_STROKE_HOVER_COLOR: PRIMARY_COLOR_1,
    TOOLTIP_COLOR: PRIMARY_COLOR_1,
    TOOLTIP_BACKGROUND_COLOR: SECONDARY_COLOR_10,
    MOBILE_TOOLTIP_COLOR: PRIMARY_COLOR_1,
    MOBILE_TOOLTIP_BACKGROUND_COLOR: WHITE,
    MOBILE_TOOLTIP_CLOSE_ICON_COLOR: PRIMARY_COLOR_1,
    MOBILE_TOOLTIP_DRILLDOWN_COLOR: PRIMARY_COLOR_1,
    MOBILE_TOOLTIP_DRILLDOWN_BACKGROUND_COLOR: SECONDARY_COLOR_7,
    MOBILE_TOOLTIP_DRILLDOWN_BACKGROUND_HOVER_COLOR: SECONDARY_COLOR_7,
    SINGLE_NODE_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    TEXT_COLOR: PRIMARY_COLOR_1,
  },
  TIME_CYCLE: {
    NODE_STROKE_HOVER_COLOR: PRIMARY_COLOR_1,
    TOOLTIP_COLOR: PRIMARY_COLOR_1,
    TOOLTIP_BACKGROUND_COLOR: SECONDARY_COLOR_10,
    TOOLTIP_BORDER_COLOR: SECONDARY_COLOR_7,
    MOBILE_TOOLTIP_COLOR: PRIMARY_COLOR_1,
    MOBILE_TOOLTIP_BACKGROUND_COLOR: WHITE,
    MOBILE_TOOLTIP_CLOSE_ICON_COLOR: PRIMARY_COLOR_1,
    MOBILE_TOOLTIP_DRILLDOWN_COLOR: PRIMARY_COLOR_1,
    MOBILE_TOOLTIP_DRILLDOWN_BACKGROUND_COLOR: SECONDARY_COLOR_7,
    MOBILE_TOOLTIP_DRILLDOWN_BACKGROUND_HOVER_COLOR: SECONDARY_COLOR_7,
    PLEDGE_COLOR: "#BFCFEE",
    CONTRIBUTION_COLOR: PRIMARY_COLOR_1,
    AXIS_COLOR: SECONDARY_COLOR_3,
    AXIS_TEXT_COLOR: PRIMARY_COLOR_1,
    AXIS_GRID_COLOR: SECONDARY_COLOR_3,
  },
  TREEMAP: {
    TOOLTIP_COLOR: PRIMARY_COLOR_1,
    TOOLTIP_BACKGROUND_COLOR: SECONDARY_COLOR_10,
    TOOLTIP_BORDER_COLOR: SECONDARY_COLOR_7,
    BACKGROUND_COLOR: PRIMARY_COLOR_1,
    MOBILE_TOOLTIP_COLOR: PRIMARY_COLOR_1,
    TOOLTIP_PROGRESS_BAR_COLOR: SECONDARY_COLOR_1,
    TOOLTIP_PROGRESS_BAR_BACKGROUND_COLOR: SECONDARY_COLOR_11,
    MOBILE_TOOLTIP_BACKGROUND_COLOR: WHITE,
    MOBILE_NODE_BACKGROUND_COLOR: SECONDARY_COLOR_12,
    MOBILE_NODE_COLOR: WHITE,
    CHILD_NODE_COLOR: WHITE,
    NODE_COLOR: PRIMARY_COLOR_1,
    FIRST_LEVEL_BACKROUND_COLOR: SECONDARY_COLOR_7,
    FIRST_LEVEL_COLOR: PRIMARY_COLOR_1,
    SECOND_LEVEL_BACKROUND_COLOR: "#C2C9CD",
    SECOND_LEVEL_COLOR: PRIMARY_COLOR_1,
    THIRD_LEVEL_BACKROUND_COLOR: SECONDARY_COLOR_12,
    THIRD_LEVEL_COLOR: WHITE,
  },
  GEOMAP: {
    TOOLTIP_COLOR: PRIMARY_COLOR_1,
    TOOLTIP_BACKGROUND_COLOR: SECONDARY_COLOR_10,
    TOOLTIP_BORDER_COLOR: SECONDARY_COLOR_7,
    TOOLTIP_PROGRESS_BAR_COLOR: SECONDARY_COLOR_1,
    TOOLTIP_PROGRESS_BAR_BACKGROUND_COLOR: SECONDARY_COLOR_11,
    MOBILE_TOOLTIP_BACKGROUND_COLOR: WHITE,
    LINE_COLOR: SECONDARY_COLOR_13,
    NO_DATA_LAYER_COLOR: "#F7FAFF",
    NO_DATA_BORDER_COLOR: SECONDARY_COLOR_11,
    DATA_LAYER_COLOR_1: "#CDD4DF",
    DATA_LAYER_COLOR_2: "#C0C7D2",
    DATA_LAYER_COLOR_3: "#AFB6C1",
    DATA_LAYER_COLOR_4: "#A0A7B1",
    DATA_LAYER_COLOR_5: "#939AA4",
    DATA_LAYER_COLOR_6: "#868D96",
    DATA_LAYER_COLOR_7: "#787F88",
    DATA_LAYER_COLOR_8: "#6B727B",
    DATA_LAYER_COLOR_9: "#575E67",
    DATA_LAYER_COLOR_10: "#444B53",
    DATA_LAYER_COLOR_11: "#343B43",
    DATA_LAYER_COLOR_12: PRIMARY_COLOR_1,
  },
  GRANTS: {
    DETAIL_LINK_COLOR: "#000",
    TEXT_COLOR: PRIMARY_COLOR_1,
    TOOLTIP_COLOR: PRIMARY_COLOR_1,
    TOOLTIP_BACKGROUND_COLOR: SECONDARY_COLOR_10,
    TOOLTIP_BORDER_COLOR: SECONDARY_COLOR_7,
    MOBILE_TOOLTIP_BACKGROUND_COLOR: WHITE,
    MOBILE_TOOLTIP_BUTTON_COLOR: PRIMARY_COLOR_1,
    MOBILE_TOOLTIP_BUTTON_BACKGROUND_COLOR: SECONDARY_COLOR_7,
    MOBILE_TOOLTIP_BUTTON_BACKGROUND_HOVER_COLOR: SECONDARY_COLOR_7,
    ITEM_LINE_COLOR: PRIMARY_COLOR_1,
    LATEST_RATING_COLOR_1: "#3B873E",
    LATEST_RATING_COLOR_2: "#7BC67E",
    LATEST_RATING_COLOR_3: GRAPH_COLOR_17,
    LATEST_RATING_COLOR_4: GRAPH_COLOR_16,
    LATEST_RATING_COLOR_5: GRAPH_COLOR_15,
    OUTLINE_COLOR: "#60647e",
    COMPONENT_DIVIDER_COLOR: SECONDARY_COLOR_11,
  },
  ELIGIBILITY: {
    DOT_CHART_BORDER_COLOR: SECONDARY_COLOR_14,
    ELIGIBLE_COLOR: GRAPH_COLOR_23,
    NOT_ELIGIBLE_COLOR: GRAPH_COLOR_15,
    TRANSITION_FUNDING_COLOR: GRAPH_COLOR_18,
    ITEM_BORDER_COLOR: SECONDARY_COLOR_17,
    AXIS_TEXT_COLOR: PRIMARY_COLOR_1,
    AXIS_GRID_COLOR: SECONDARY_COLOR_5,
  },
  NETWORK: {
    GRAPH_LINK_COLOR: SECONDARY_COLOR_7,
    ACHIEVEMENT_RATE_COLOR_1: GRAPH_COLOR_15,
    ACHIEVEMENT_RATE_COLOR_2: GRAPH_COLOR_16,
    ACHIEVEMENT_RATE_COLOR_3: GRAPH_COLOR_17,
    ACHIEVEMENT_RATE_COLOR_4: GRAPH_COLOR_18,
    ACHIEVEMENT_RATE_COLOR_5: GRAPH_COLOR_19,
    ACHIEVEMENT_RATE_COLOR_6: GRAPH_COLOR_20,
    ACHIEVEMENT_RATE_COLOR_7: GRAPH_COLOR_21,
    ACHIEVEMENT_RATE_COLOR_8: GRAPH_COLOR_23,
    EXPANDED_VIEW_SELECTOR_COLOR: PRIMARY_COLOR_1,
    TABLE_BORDER_COLOR: SECONDARY_COLOR_5,
    TABLE_ROW_COLOR: "transparent",
    TABLE_ROW_SELECTED_COLOR: SECONDARY_COLOR_6,
    EXPANDED_VIEW_TABS_LIST_SCROLLBAR_BACKGROUND_COLOR: "#ededf6",
    EXPANDED_VIEW_TABS_LIST_SCROLLBAR_TRACK_BACKGROUND_COLOR: "#ededf6",
    EXPANDED_VIEW_TABS_LIST_SCROLLBAR_THUMB_BACKGROUND_COLOR: "#2e4063",
    EXPANDED_VIEW_TAB_ITEM_COLOR: SECONDARY_COLOR_13,
    EXPANDED_VIEW_TAB_ITEM_ACTIVE_COLOR: WHITE,
    EXPANDED_VIEW_TAB_ITEM_HOVER_COLOR: WHITE,
    EXPANDED_VIEW_TAB_ITEM_BACKGROUND_COLOR: SECONDARY_COLOR_11,
    EXPANDED_VIEW_TAB_ITEM_BACKGROUND_ACTIVE_COLOR: PRIMARY_COLOR_1,
    EXPANDED_VIEW_TAB_ITEM_BACKGROUND_HOVER_COLOR: PRIMARY_COLOR_1,
    TABLE_CIRCLE_INDICATOR_BACKGROUND_COLOR:
      "repeating-linear-gradient(-45deg, #262c34 0 0.5px, #fff 1.5px 2px)",
    TOOLTIP_BUTTON_BACKGROUND_COLOR: SECONDARY_COLOR_7,
    TOOLTIP_BUTTON_TEXT_COLOR: PRIMARY_COLOR_1,
    TOOLTIP_CONTAINER_COLOR: PRIMARY_COLOR_1,
    TOOLTIP_CONTAINER_BACKGROUND_COLOR_1: PRIMARY_COLOR_1,
    TOOLTIP_CONTAINER_BACKGROUND_COLOR_2: WHITE,
    TOOLTIP_BOTTOM_BUTTON_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    TOOLTIP_BOTTOM_BUTTON_TEXT_COLOR: WHITE,
    TOOLTIP_BOTTOM_BUTTON_BORDER_COLOR: WHITE,
  },
  PERFORMANCE_RATING: {
    NODE_COLOR: SECONDARY_COLOR_17,
    AXIS_COLOR: SECONDARY_COLOR_3,
    AXIS_TEXT_COLOR: PRIMARY_COLOR_1,
    AXIS_GRID_COLOR: SECONDARY_COLOR_3,
  },
  ALLOCATIONS: {
    TEXT_COLOR: PRIMARY_COLOR_1,
    MOBILE_TOOLTIP_COLOR: PRIMARY_COLOR_1,
    MOBILE_TOOLTIP_BACKGROUND_COLOR: WHITE,
    MOBILE_TOOLTIP_BORDER_COLOR: SECONDARY_COLOR_7,
    MOBILE_TOOLTIP_CLOSE_ICON_COLOR: PRIMARY_COLOR_1,
    MOBILE_TOOLTIP_DRILLDOWN_COLOR: PRIMARY_COLOR_1,
    MOBILE_TOOLTIP_DRILLDOWN_BACKGROUND_COLOR: SECONDARY_COLOR_7,
    MOBILE_TOOLTIP_DRILLDOWN_BACKGROUND_HOVER_COLOR: SECONDARY_COLOR_7,
    RADIAL_TRACK_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    RADIAL_DATA_LABELS_COLOR: PRIMARY_COLOR_1,
    RADIAL_CENTER_LABEL_HOVER_COLOR: SECONDARY_COLOR_6,
    POLAR_BAR_COLORS: ["#595D70", "#C9CAD4", "#252C34"],
    POLAR_BAR_TOOLTIP_COLOR: PRIMARY_COLOR_1,
    POLAR_BAR_TOOLTIP_BACKGROUND_COLOR: SECONDARY_COLOR_10,
    POLAR_BAR_TOOLTIP_BORDER_COLOR: SECONDARY_COLOR_7,
  },
  MOBILE_VIEWS_CONTROL: {
    MENU_PAPER_BORDER_COLOR: "#d3d4d5",
    MENU_SCROLLBAR_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    MENU_SCROLLBAR_TRACK_BACKGROUND_COLOR: SECONDARY_COLOR_7,
    MENU_SCROLLBAR_THUMB_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    MENU_ITEM_BORDER_COLOR: SECONDARY_COLOR_7,
    MENU_ITEM_COLOR: PRIMARY_COLOR_1,
    BUTTON_BACKGROUND_COLOR: SECONDARY_COLOR_7,
    BUTTON_BACKGROUND_HOVER_COLOR: SECONDARY_COLOR_7,
    LINK_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    LINK_BACKGROUND_SELECTED_COLOR: SECONDARY_COLOR_7,
    LINK_ICON_COLOR: "#868A9D",
    LINK_ICON_SELECTED_COLOR: WHITE,
    BUTTON_COLOR: SECONDARY_COLOR_7,
    BUTTON_SELECTED_COLOR: WHITE,
    BUTTON_BACKGROUND_SELECTED_COLOR: WHITE,
  },
  MOBILE_FILTER_BAR: {
    CHIP_COLOR: PRIMARY_COLOR_1,
    CHIP_BACKGROUND_COLOR: SECONDARY_COLOR_7,
    CHIP_DELETE_BUTTON_COLOR: PRIMARY_COLOR_1,
    CONTAINER_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    LABEL_COLOR: WHITE,
    SCROLLBAR_BACKGROUND_COLOR: "#ededf6",
    SCROLLBAR_TRACK_BACKGROUND_COLOR: WHITE,
    SCROLLBAR_THUMB_BACKGROUND_COLOR: PRIMARY_COLOR_1,
  },
  TABS: {
    SCROLLBAR_BACKGROUND_COLOR: "#ededf6",
    SCROLLBAR_TRACK_BACKGROUND_COLOR: "#ededf6",
    SCROLLBAR_THUMB_BACKGROUND_COLOR: "#2e4063",
    ITEM_BACKGROUND_COLOR: SECONDARY_COLOR_11,
    ITEM_BACKGROUND_ACTIVE_COLOR: PRIMARY_COLOR_1,
    ITEM_BACKGROUND_HOVER_COLOR: PRIMARY_COLOR_1,
    LINK_COLOR: SECONDARY_COLOR_13,
    LINK_ACTIVE_COLOR: WHITE,
    LINK_HOVER_COLOR: WHITE,
  },
  PAGE_HEADER: {
    CONTAINER_BACKGROUND_COLOR: SECONDARY_COLOR_7,
    TITLE_COLOR: PRIMARY_COLOR_1,
  },
  SEARCH: {
    CONTAINER_BACKGROUND: WHITE,
    TAB_TEXT_COLOR: PRIMARY_COLOR_1,
    TAB_BORDER_COLOR: "transparent",
    TAB_BORDER_ACTIVE_COLOR: PRIMARY_COLOR_1,
    TAB_BORDER_HOVER_COLOR: PRIMARY_COLOR_1,
    MOBILE_TAB_ACTIVE_COLOR: WHITE,
    MOBILE_TAB_ACTIVE_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    MOBILE_TAB_BACKGROUND_COLOR: SECONDARY_COLOR_7,
    RESULT_BORDER_COLOR: SECONDARY_COLOR_7,
    RESULT_HOVER_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    RESULT_HOVER_TEXT_COLOR: WHITE,
    RESULT_TEXT_COLOR: PRIMARY_COLOR_1,
    CATEGORY_ICONS_COLOR: "#868A9D",
    DROPDOWN_BACKGROUND_COLOR: SECONDARY_COLOR_7,
    DROPDOWN_SCROLLBAR_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    DROPDOWN_SCROLLBAR_TRACK_BACKGROUND_COLOR: SECONDARY_COLOR_7,
    DROPDOWN_SCROLLBAR_THUMB_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    DROPDOWN_ITEM_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    DROPDOWN_ITEM_HOVER_COLOR: WHITE,
    DROPDOWN_ITEM_HOVER_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    DROPDOWN_ITEM_ACTIVE_COLOR: WHITE,
    DROPDOWN_ITEM_ACTIVE_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    DROPDOWN_BUTTON_BACKGROUND_COLOR: SECONDARY_COLOR_6,
    DROPDOWN_BUTTON_TEXT_HOVER_COLOR: WHITE,
    DROPDOWN_BUTTON_BACKGROUND_HOVER_COLOR: PRIMARY_COLOR_1,
    DROPDOWN_BUTTON_TEXT_COLOR: PRIMARY_COLOR_1,
    CONTAINER_BORDER_COLOR: PRIMARY_COLOR_1,
    INPUT_COLOR: PRIMARY_COLOR_1,
    INPUT_BACKGROUND_COLOR: WHITE,
  },
  TABLE: {
    BORDER_BOTTOM_COLOR: SECONDARY_COLOR_7,
    ROW_BACKGROUND_COLOR_1: WHITE,
    ROW_BACKGROUND_COLOR_2: SECONDARY_COLOR_10,
    ROW_BACKGROUND_HOVER_COLOR: PRIMARY_COLOR_1,
    ROW_TEXT_HOVER_COLOR: WHITE,
    ROW_TEXT_COLOR: PRIMARY_COLOR_1,
    DOWNLOAD_ICON_COLOR: PRIMARY_COLOR_2,
    TOOLBAR_BACKGROUND_COLOR: "#dfe3e5",
    TOOLBAR_ICON_BUTTON_HOVER_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    TOOLBAR_ICON_BUTTON_HOVER_COLOR: WHITE,
    TOOLBAR_SEARCH_TEXT_COLOR: PRIMARY_COLOR_1,
    TOOLBAR_SEARCH_BACKGROUND_COLOR: WHITE,
    TOOLBAR_ICON_COLOR: PRIMARY_COLOR_1,
  },
  TOOLBOX: {
    SECTION_BORDER_BOTTOM_COLOR: SECONDARY_COLOR_7,
    FILTERS_SCROLLBAR_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    FILTERS_SCROLLBAR_TRACK_BACKGROUND_COLOR: SECONDARY_COLOR_10,
    FILTERS_SCROLLBAR_THUMB_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    VIEWS_ICON_COLOR: "#868A9D",
    VIEWS_ICON_ACTIVE_COLOR: SECONDARY_COLOR_13,
    MENU_EXPORT_BORDER_COLOR: "#d3d4d5",
    MENU_EXPORT_TEXT_COLOR: PRIMARY_COLOR_1,
    REPORTING_PERIODS_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    FILTERS_EXPANDED_GROUP_SEARCH_BACKGROUND_COLOR: SECONDARY_COLOR_7,
    FILTERS_EXPANDED_GROUP_SEARCH_ICON_COLOR: SECONDARY_COLOR_4,
    FILTERS_EXPANDED_GROUP_SEARCH_TEXT_COLOR: PRIMARY_COLOR_1,
    FILTERS_EXPANDED_GROUP_APPLY_BUTTON_TEXT_COLOR: WHITE,
    FILTERS_EXPANDED_GROUP_APPLY_BUTTON_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    FILTER_PILL_TEXT_COLOR: PRIMARY_COLOR_1,
    FILTER_PILL_BACKGROUND_COLOR: WHITE,
    BACKGROUND_COLOR: SECONDARY_COLOR_10,
    BUTTON_COLOR: WHITE,
    BUTTON_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    BUTTON_BACKGROUND_HOVER_COLOR: SECONDARY_COLOR_13,
  },
  LOCATION: {
    OVERVIEW_VISUALISATION_COLORS: ["#727F95", "#21262B", "#595C70"],
  },
  GRANT_LIST: {
    DIVIDER: SECONDARY_COLOR_7,
    PROGRESS_BAR_COLOR: SECONDARY_COLOR_1,
    PROGRESS_BAR_BACKGROUND_COLOR: SECONDARY_COLOR_11,
    ITEM_TEXT_COLOR: PRIMARY_COLOR_1,
    ITEM_BACKGROUND_COLOR: SECONDARY_COLOR_10,
    ITEM_BACKGROUND_HOVER_COLOR: SECONDARY_COLOR_13,
    ITEM_TEXT_HOVER_COLOR: WHITE,
    SEARCH_CONTAINER_BACKGROUND_COLOR: SECONDARY_COLOR_7,
    SEARCH_INPUT_COLOR: PRIMARY_COLOR_1,
    SEARCH_INPUT_BACKGROUND_COLOR: SECONDARY_COLOR_7,
  },
  DATASETS_GRID: {
    ITEM_TEXT_COLOR: PRIMARY_COLOR_1,
    ITEM_BACKGROUND_COLOR: WHITE,
    ITEM_BORDER_HOVER_COLOR: SECONDARY_COLOR_13,
    ICON_LINK_COLOR: "#868a9d",
    ICON_LINK_HOVER_COLOR: SECONDARY_COLOR_13,
  },
  RESULTS_LIST: {
    ITEM_TEXT_COLOR: PRIMARY_COLOR_1,
    ITEM_BACKGROUND_COLOR: SECONDARY_COLOR_10,
    ITEM_BACKGROUND_HOVER_COLOR: SECONDARY_COLOR_13,
    ITEM_TEXT_HOVER_COLOR: WHITE,
    ITEM_ACTIVE_COLOR: SECONDARY_COLOR_11,
    ITEM_ACTIVE_BORDER_COLOR: SECONDARY_COLOR_13,
    ITEM_BUTTON_UP_COLOR: WHITE,
    ITEM_BUTTON_DOWN_COLOR: PRIMARY_COLOR_1,
    ITEM_BUTTON_UP_BACKGROUND_COLOR: PRIMARY_COLOR_1,
    ITEM_BUTTON_DOWN_BACKGROUND_COLOR: "transparent",
    ITEM_BUTTON_BORDER_COLOR: SECONDARY_COLOR_7,
    LOCATION_LIST_ITEM_COLOR: WHITE,
    LOCATION_LIST_BACKGROUND_COLOR: PRIMARY_COLOR_1,
  },
  RANGE_SLIDER: {
    TRACK_BACKGROUND_COLOR: "linear-gradient(to right,#fff,#7e8a96,#0a0b0c)",
    THUMB_BOX_SHADOW_COLOR: "#AAA",
  },
  ABOUT_PAGE: {
    LINK_COLOR: "#000",
    LINK_BACKGROUND_COLOR: SECONDARY_COLOR_7,
    LINK_BORDER_COLOR: SECONDARY_COLOR_7,
  },
};
