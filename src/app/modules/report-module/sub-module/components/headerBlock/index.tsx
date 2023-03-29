import { Box, Container } from "@material-ui/core";
import React from "react";
import { ReactComponent as ClockICon } from "../../../asset/clock-img.svg";
import { headerBlockcss } from "./style";

interface Props {
  previewMode: boolean;
  headerDetails: {
    title: string;
    description: string;
  };
  setHeaderDetails: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
    }>
  >;
}

export default function HeaderBlock(props: Props) {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    props.setHeaderDetails({
      ...props.headerDetails,
      [name]: value,
    });
  };

  return (
    <div css={headerBlockcss.container}>
      <Container maxWidth="lg">
        <div css={headerBlockcss.innerContainer}>
          <div>
            <input
              name="title"
              type="text"
              value={props.headerDetails.title}
              disabled={props.previewMode}
              onChange={handleChange}
              placeholder="Add title"
            />
          </div>
          <Box height={17} />

          <div>
            <textarea
              name="description"
              id=""
              rows={3}
              value={props.headerDetails.description}
              disabled={props.previewMode}
              onChange={handleChange}
              placeholder="Write a description"
            />
          </div>
          <div css={headerBlockcss.date}>
            <p>
              <ClockICon />{" "}
            </p>
            <p>Creation date: 28.02.2023</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
