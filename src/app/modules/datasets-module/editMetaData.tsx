import { Box, Grid, Container } from "@material-ui/core";
import { PageHeader } from "app/components/PageHeader";
import BasicTextarea from "app/components/Textarea/BasicTextarea";
import { metaDatacss } from "app/fragments/datasets-fragment/style";
import { CssTextField } from "app/fragments/datasets-fragment/upload-steps/metaData";
import React from "react";
import { useHistory } from "react-router-dom";
import { PageTopSpacer } from "../common/page-top-spacer";

export default function EditMetaData() {
  const [textareaValue, setTextareaValue] = React.useState("");
  const history = useHistory();
  const onSubmit = () => {
    history.push("/");
  };
  return (
    <div css={metaDatacss}>
      <PageHeader title="Edit data" />
      <Container maxWidth="lg">
        <PageTopSpacer />
        <h1>Describe meta data</h1>
        <div
          css={`
            width: 100%;
          `}
        >
          <form css={``}>
            <Grid lg={12} xs={12} md={12}>
              <CssTextField
                id="outlined-basic"
                label="Data title"
                variant="outlined"
                helperText="Title must be between 6 and 50 characters in lenght."
                fullWidth
              />
            </Grid>
            <Box height={50} />

            <Grid lg={12} xs={12} md={12}>
              <BasicTextarea
                value={textareaValue}
                setValue={setTextareaValue}
                label="Data description "
                placeholder="Brief description of your dataset*"
              />
            </Grid>

            <div
              css={`
                display: flex;
                justify-content: flex-end;
                margin-top: 18rem;
                gap: 1rem;
              `}
            >
              <button
                css={`
                  color: #231d2c;
                  text-transform: uppercase;
                  width: 15%;

                  :hover {
                    opacity: 0.8;
                  }
                `}
                onClick={onSubmit}
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                css={`
                  text-transform: uppercase;
                  background: #231d2c;
                  color: #fff;
                  width: 19%;
                  :hover {
                    opacity: 0.8;
                  }
                `}
              >
                save changes
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
