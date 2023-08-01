import React from "react";

interface Props {
  big?: boolean;
}

export default function Icon(props: Props) {
  return (
    <svg
      width={props.big ? "74" : "48"}
      height={props.big ? "74" : "48"}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M41.625 37.125H9.375V7.875C9.375 7.66875 9.20625 7.5 9 7.5H6.375C6.16875 7.5 6 7.66875 6 7.875V40.125C6 40.3312 6.16875 40.5 6.375 40.5H41.625C41.8312 40.5 42 40.3312 42 40.125V37.5C42 37.2938 41.8312 37.125 41.625 37.125ZM14.3344 29.8922C14.4797 30.0375 14.7141 30.0375 14.8641 29.8922L21.3469 23.4422L27.3281 29.4609C27.4734 29.6063 27.7125 29.6063 27.8578 29.4609L40.7672 16.5563C40.9125 16.4109 40.9125 16.1719 40.7672 16.0266L38.9109 14.1703C38.8405 14.1005 38.7453 14.0614 38.6461 14.0614C38.5469 14.0614 38.4517 14.1005 38.3812 14.1703L27.6 24.9469L21.6281 18.9375C21.5576 18.8677 21.4625 18.8286 21.3633 18.8286C21.2641 18.8286 21.1689 18.8677 21.0984 18.9375L12.4828 27.5016C12.413 27.572 12.3739 27.6672 12.3739 27.7664C12.3739 27.8656 12.413 27.9608 12.4828 28.0312L14.3344 29.8922Z"
        fill="#262C34"
      />
    </svg>
  );
}