/* third-party */
import React from "react";
import { AddIcon } from "app/assets/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import BarChartIcon from "@material-ui/icons/BarChart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { Link, useHistory, useParams } from "react-router-dom";
/* project */
import { styles } from "app/modules/data-themes-module/components/add-section-button/styles";
import { DataThemesAddSectionButtonProps } from "app/modules/data-themes-module/components/add-section-button/data";

export function DataThemesAddSectionButton(
  props: DataThemesAddSectionButtonProps
) {
  const history = useHistory();
  const { page } = useParams<{ page: string }>();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    history.listen(() => setOpen(false));
  }, [history]);

  return (
    <div
      css={styles.container(props.showCreateYourStoryText ? "top" : "bottom")}
    >
      <div css={styles.innercontainer}>
        <IconButton
          onClick={() => setOpen(!open)}
          css={`
            > span:first-of-type {
              background: #fff;
              border-radius: 50%;
            }

            svg {
              transform: rotate(${open ? 45 : 0}deg);
              transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
            }
          `}
        >
          <AddIcon />
        </IconButton>
        {open && (
          <div css={styles.contenttypeicons}>
            <IconButton component={Link} to={`/data-themes/${page}/data`}>
              <BarChartIcon htmlColor="#373D43" />
            </IconButton>
            <IconButton>
              <SearchIcon htmlColor="#373D43" />
            </IconButton>
            <IconButton>
              <DashboardIcon htmlColor="#373D43" />
            </IconButton>
          </div>
        )}
        {!open && props.showCreateYourStoryText && "Create your story"}
      </div>
    </div>
  );
}
