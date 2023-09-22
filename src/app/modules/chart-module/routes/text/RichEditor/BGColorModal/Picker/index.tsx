import { colors } from "app/modules/chart-module/routes/text/RichEditor/ColorModal/Picker/colors";

import Picker from "app/modules/chart-module/routes/text/RichEditor/BGColorModal/Picker/picker";

const styleMap = {
  "bg-000000": { background: "#000000" },
};
colors.map((c, _) => {
  styleMap[`bg-${c.replace("#", "")}` as keyof typeof styleMap] = {
    background: c,
  };
});

export default {
  Picker: Picker,
  bgColorStyleMap: styleMap,
};
