import { deviceType, primaryInput } from "detect-it";

export function isTouchDevice() {
  if (deviceType === "mouseOnly") {
    return false;
  }
  if (deviceType === "touchOnly") {
    return true;
  }
  if (deviceType === "hybrid") {
    if (primaryInput === "mouse") {
      return false;
    }
    return true;
  }
}
