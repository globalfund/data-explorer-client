import { fontFamilyOptions, MAX_FONT_SIZE, MIN_FONT_SIZE } from "./data";

const supportedFonts = new Map(
  fontFamilyOptions.map(({ value }) => [value.toLowerCase(), value]),
);

function normaliseFontFamily(value: string) {
  const candidates = value
    .split(",")
    .map((font) => font.replace(/["']/g, "").trim());

  for (const candidate of candidates) {
    const supported = supportedFonts.get(candidate.toLowerCase());

    if (supported) {
      return supported;
    }
  }

  return null;
}

function normaliseFontSize(value: string) {
  const match = value.trim().match(/^([\d.]+)(px|pt)?$/i);

  if (!match) {
    return null;
  }

  let size = Number(match[1]);
  const unit = match[2]?.toLowerCase();

  if (!Number.isFinite(size)) {
    return null;
  }

  // CSS conversion: 1pt = 96 / 72 px
  if (unit === "pt") {
    size *= 96 / 72;
  }

  size = Math.round(size);

  if (size < MIN_FONT_SIZE || size > MAX_FONT_SIZE) {
    return null;
  }

  return `${size}px`;
}

function normaliseFontWeight(value: string) {
  if (value === "normal") return "400";
  if (value === "bold") return "700";

  const weight = Number(value);

  if (!Number.isFinite(weight)) {
    return null;
  }

  const supported = [400, 500, 600, 700];

  return supported
    .reduce((closest, current) =>
      Math.abs(current - weight) < Math.abs(closest - weight)
        ? current
        : closest,
    )
    .toString();
}

export function normalisePastedHTML(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");

  doc.body.querySelectorAll<HTMLElement>("*").forEach((element) => {
    const fontFamily = element.style.fontFamily;
    const fontSize = element.style.fontSize;
    const fontWeight = element.style.fontWeight;

    if (fontFamily) {
      const normalised = normaliseFontFamily(fontFamily);

      if (normalised) {
        element.style.fontFamily = normalised;
      } else {
        element.style.removeProperty("font-family");
      }
    }

    if (fontSize) {
      const normalised = normaliseFontSize(fontSize);

      if (normalised) {
        element.style.fontSize = normalised;
      } else {
        element.style.removeProperty("font-size");
      }
    }

    if (fontWeight) {
      const normalised = normaliseFontWeight(fontWeight);

      if (normalised) {
        element.style.fontWeight = normalised;
      } else {
        element.style.removeProperty("font-weight");
      }
    }

    // These currently don't have useful matching option sets in the editor.
    element.style.removeProperty("letter-spacing");
    element.style.removeProperty("line-height");

    element.removeAttribute("class");
    element.removeAttribute("id");

    for (const attribute of Array.from(element.attributes)) {
      if (attribute.name.startsWith("data-")) {
        element.removeAttribute(attribute.name);
      }
    }

    if (!element.getAttribute("style")?.trim()) {
      element.removeAttribute("style");
    }
  });

  return doc.body.innerHTML;
}
