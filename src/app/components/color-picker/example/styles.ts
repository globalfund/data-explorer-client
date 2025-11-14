import styled from "styled-components";

export const ColorPickerWrapper = styled.div`
  .rcp {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background: var(--Secondary-Grey-Grey-8, #f1f3f5);
    box-shadow: 0px 0px 10px 0px rgba(152, 161, 170, 0.6);
    width: 286px;
    padding: 6px;
    gap: 10px;
  }

  .rcp-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 10px;
  }

  .rcp-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .rcp-interactive {
    width: 100%;
    height: 100%;
    user-select: none;
    touch-action: none;
  }

  .rcp-interactive[aria-disabled="true"] {
    cursor: unset;
    pointer-events: none;
  }

  .rcp-saturation {
    cursor: all-scroll;
    width: 100%;
    position: relative;
    background-image:
      linear-gradient(to bottom, transparent, black),
      linear-gradient(to right, white, transparent);
    border-radius: 4px;
  }

  .rcp-saturation-cursor {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid white;
    border-radius: 100%;
    filter: drop-shadow(0px 1.447px 2.894px rgba(97, 97, 97, 0.2))
      drop-shadow(0px 0.723px 1.447px rgba(97, 97, 97, 0.2));
    transform: translate(-10px, -10px);
  }

  .rcp-hue {
    cursor: ew-resize;
    position: relative;
    width: 100%;
    height: 8px;
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0),
      rgb(255, 255, 0),
      rgb(0, 255, 0),
      rgb(0, 255, 255),
      rgb(0, 0, 255),
      rgb(255, 0, 255),
      rgb(255, 0, 0)
    );
    border-radius: 10px;
  }

  .rcp-hue-cursor {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid white;
    border-radius: 100%;
    filter: drop-shadow(0px 1.447px 2.894px rgba(97, 97, 97, 0.2))
      drop-shadow(0px 0.723px 1.447px rgba(97, 97, 97, 0.2));
    transform: translate(-10px, -4px);
  }

  .rcp-alpha {
    cursor: ew-resize;
    position: relative;
    width: 100%;
    height: 8px;
    border-radius: 10px;
  }

  .rcp-alpha-cursor {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid white;
    border-radius: 100%;
    filter: drop-shadow(0px 1.447px 2.894px rgba(97, 97, 97, 0.2))
      drop-shadow(0px 0.723px 1.447px rgba(97, 97, 97, 0.2));
    transform: translate(-10px, -4px);
  }

  .rcp-input-section {
    display: flex;
    gap: 8px;
    justify-content: space-between;
    align-items: center;
  }
  .rcp-sample-circle {
    width: 28px;
    height: 28px;
    border-radius: 100%;
    flex-shrink: 0;
    filter: drop-shadow(0px 1.447px 2.894px rgba(97, 97, 97, 0.2))
      drop-shadow(0px 0.723px 1.447px rgba(97, 97, 97, 0.2));
  }

  .rcp-input {
    border-radius: 10px;
    border: 1px solid var(--coolGray-200, #e5e7eb);
    background: var(--white, #fff);
    /* shadow-base */
    box-shadow: 0px 1px 2px 0px rgba(31, 41, 55, 0.08);
    padding: 4px 6px;
  }

  .rcp-recently-used-color {
    width: 22px;
    height: 22px;
    border-radius: 100%;
    cursor: pointer;
  }
`;
