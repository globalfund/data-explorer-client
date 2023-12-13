import {
  createBlockAlignmentButton,
  createBlockStyleButton,
  createInlineStyleButton,
} from "@draft-js-plugins/buttons";
import React from "react";

export const HeaderOneButton = createBlockStyleButton({
  blockType: "header-one",
  children: (
    <svg
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.18 17.5H3.66V10.66H9.18V17.5H12.66V0.699999H9.18V7.444H3.66V0.699999H0.18V17.5ZM17.9678 17.5H21.3997V0.579999H18.9998L14.8478 1.828L15.3998 4.852L17.9678 4.156V17.5Z"
        fill="#231D2C"
      />
    </svg>
  ),
});

export const HeaderTwoButton = createBlockStyleButton({
  blockType: "header-two",
  children: (
    <svg
      width="24"
      height="15"
      viewBox="0 0 21 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.76 13H3.37V7.87H7.51V13H10.12V0.399999H7.51V5.458H3.37V0.399999H0.76V13ZM12.1748 13H20.3648V10.66H15.5588L17.6648 8.518C19.5368 6.7 20.3468 5.692 20.3468 3.928V3.892C20.3468 1.606 18.7088 0.219999 16.3868 0.219999C14.5688 0.219999 13.2908 1.012 12.1928 2.506L13.8848 4.108C14.6948 3.118 15.3068 2.614 16.1888 2.614C17.0528 2.614 17.7008 3.154 17.7008 4.108C17.7008 5.026 17.2148 5.71 15.8828 7.078L12.1748 10.894V13Z"
        fill="#231D2C"
      />
    </svg>
  ),
});

export const HeaderThreeButton = createBlockStyleButton({
  blockType: "header-three",
  children: (
    <svg
      width="16"
      height="13"
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.34 9H2.08V5.58H4.84V9H6.58V0.599999H4.84V3.972H2.08V0.599999H0.34V9ZM10.5059 9.144C12.2099 9.144 13.3499 8.028 13.3499 6.42V6.384C13.3499 4.932 12.3419 4.26 11.2619 4.044L13.2299 1.98V0.599999H8.17788V2.148H11.0939L9.24588 4.2L9.44988 5.304H9.95388C11.0339 5.304 11.6339 5.724 11.6339 6.444V6.468C11.6339 7.14 11.1419 7.56 10.4699 7.56C9.72588 7.56 9.20988 7.2 8.77788 6.744L7.73388 7.968C8.38188 8.664 9.28188 9.144 10.5059 9.144Z"
        fill="#231D2C"
      />
    </svg>
  ),
});
