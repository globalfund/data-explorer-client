import { colors } from "app/components/ColorModal/Picker/colors";

import Picker from "app/components/ColorModal/Picker/picker";

const styleMap = {
  "color-000000": { color: "#000000" },
};
colors.map((c, i) => {
  styleMap[`color-${c.replace("#", "")}` as keyof typeof styleMap] = {
    color: c,
  };
});

export default {
  Picker: Picker,
  colorStyleMap: styleMap,
};
