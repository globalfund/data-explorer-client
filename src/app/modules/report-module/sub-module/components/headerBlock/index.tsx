import React, { useRef } from "react";
import moment from "moment";
import get from "lodash/get";
import { useDrop } from "react-dnd";
import { EditorState } from "draft-js";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { useLocation, useParams } from "react-router-dom";
import { RichEditor } from "app/modules/chart-module/routes/text/RichEditor";
import { ReactComponent as ClockIcon } from "app/modules/report-module/asset/clock-img.svg";
import { headerBlockcss } from "app/modules/report-module/sub-module/components/headerBlock/style";
interface Props {
  previewMode: boolean;
  headerDetails: {
    title: string;
    showHeader: boolean;
    description: EditorState;
    createdDate: Date;
    backgroundColor: string;
    titleColor: string;
    descriptionColor: string;
    dateColor: string;
  };
  setHeaderDetails: React.Dispatch<
    React.SetStateAction<{
      title: string;
      showHeader: boolean;
      description: EditorState;
      backgroundColor: string;
      titleColor: string;
      descriptionColor: string;
      dateColor: string;
    }>
  >;
}

export default function HeaderBlock(props: Props) {
  const location = useLocation();
  const { page } = useParams<{ page: string }>();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "header",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    }),
    drop: () => {
      props.setHeaderDetails({
        ...props.headerDetails,
        showHeader: true,
      });
    },
  }));

  const setHandleDisplay = React.useState(false)[1];

  const viewOnlyMode =
    page !== "new" && get(location.pathname.split("/"), "[3]", "") !== "edit";

  const handlers = viewOnlyMode
    ? {}
    : {
        onMouseEnter: () => setHandleDisplay(true),
        onMouseLeave: () => setHandleDisplay(false),
      };

  const titleRef = useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    titleRef.current?.focus();
  }, []);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    props.setHeaderDetails({
      ...props.headerDetails,
      [name]: value,
    });
  };

  const setTextContent = (text: EditorState) => {
    props.setHeaderDetails({
      ...props.headerDetails,
      description: text,
    });
  };

  if (!props.headerDetails.showHeader) {
    return (
      <div
        ref={drop}
        css={`
          z-index: 1;
          width: 100%;
          height: 50px;
          position: absolute;
          background-color: ${isOver ? " #262C34;" : "transparent"};
        `}
      />
    );
  }

  return (
    <div
      css={headerBlockcss.container(
        props.headerDetails.backgroundColor,
        props.headerDetails.titleColor
      )}
      {...handlers}
    >
      {/* <TabButtons /> */}
      <Container maxWidth="lg">
        <div css={headerBlockcss.innerContainer}>
          <div>
            <input
              ref={titleRef}
              name="title"
              type="text"
              placeholder="Add title"
              onChange={handleChange}
              disabled={props.previewMode}
              value={props.headerDetails.title}
            />
          </div>
          <Box height={17} />
          <div
            css={`
              width: 60%;
              max-height: 52px;
              overflow-y: hidden;
              color: ${props.headerDetails.descriptionColor} !important;
              font-size: 14px;
              font-weight: 400;
              min-width: 600px;
              line-height: 16.8px;
              background: inherit;
              position: relative;
              letter-spacing: 0.692603px;
              ${props.previewMode && "pointer-events: none;"}

              ::placeholder {
                color: ${props.headerDetails.descriptionColor};
              }

              > div {
                padding: 0;
                > div {
                  > div {
                    > div {
                      min-height: 60px !important;
                    }
                  }
                }
              }
            `}
          >
            <RichEditor
              invertColors
              editMode={true}
              setTextContent={setTextContent}
              placeholder="Write a description for your report"
              textContent={props.headerDetails.description}
            />
          </div>
          <div css={headerBlockcss.date(props.headerDetails.dateColor)}>
            <p>
              <ClockIcon />
            </p>
            <p>
              Creation date:{" "}
              {moment(props.headerDetails.createdDate).format("DD.MM.YYYY")}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
