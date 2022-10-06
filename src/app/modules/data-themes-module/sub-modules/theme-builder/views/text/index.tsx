/* third-party */
import React from "react";
import useTitle from "react-use/lib/useTitle";
import { useStoreState } from "app/state/store/hooks";
/* project */
import { styles } from "app/modules/data-themes-module/sub-modules/theme-builder/views/common/styles";
import { RichEditor } from "app/modules/data-themes-module/sub-modules/theme-builder/views/text/RichEditor";

export function DataThemesBuilderTextView() {
  useTitle("Data Themes - Input text");

  const activeTabIndex = useStoreState(
    (state) => state.dataThemes.activeTabIndex.value
  );
  const activeVizIndex = useStoreState(
    (state) => state.dataThemes.activeVizIndex.value
  );

  return (
    <div css={styles.container}>
      <RichEditor
        editMode={true}
        tabIndex={activeTabIndex}
        vizIndex={activeVizIndex}
      />
    </div>
  );
}
