import { Box, Grid, TextField, withStyles } from "@material-ui/core";
import { PageHeader } from "app/components/PageHeader";
import BasicTextarea from "app/components/Textarea/BasicTextarea";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import React from "react";
import { metaDatacss } from "../style";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export interface IFormDetails {
  name: string;
  description: string;
  category?: string;
  public?: boolean;
}
interface Props {
  onSubmit: (data: IFormDetails) => void;
  handleBack: () => void;
  formDetails: {
    name: string;
    description: string;
    category: string;
    public: boolean;
  };
  setFormDetails: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      category: string;
      public: boolean;
    }>
  >;
}
export const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#231D2C",
    },

    "&.MuiInputLabel-outlined": {
      fontSize: "16px",
      fontFamily: "'Inter', sans-serif",
      color: "#231D2C",
    },
    "& .MuiOutlinedInput-input": {
      padding: "2px 14px",
      height: "48px",
      backgroundColor: "#Fff",
    },
    "& .MuiFormHelperText-root": {
      color: "#231D2C",
      fontSize: "12px",
      fontWeight: 400,
      marginLeft: "0px",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#231D2C",
    },
    "& .MuiOutlinedInput-multiline ": {
      backgroundColor: "#Fff",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#231D2C",
        borderRadius: "10px",
        paddingBottom: "4px",
      },
      "&:hover fieldset": {
        borderColor: "#231D2C",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#231D2C",
      },
    },
  },
})(TextField);

export default function MetaData(props: Props) {
  const { register, handleSubmit } = useForm<IFormDetails>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    props.setFormDetails({
      ...props.formDetails,
      [name]: value,
    });
  };
  const [characterCount, setCharacterCount] = React.useState(0);

  React.useEffect(() => {
    setCharacterCount(props.formDetails.description.length);
  }, [props.formDetails.description]);

  return (
    <div css={metaDatacss}>
      <h1>Describe meta data</h1>
      <div
        css={`
          width: 100%;
        `}
      >
        <form onSubmit={handleSubmit(props.onSubmit)}>
          <Grid container spacing={6}>
            <Grid lg={12} xs={12} md={12} item>
              <CssTextField
                id="outlined-basic"
                label="Data title "
                variant="outlined"
                {...register("name", { required: true })}
                helperText="Title must be between 6 and 50 characters in lenght."
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Box height={50} />
            <Grid lg={12} xs={12} md={12} item>
              <div
                css={`
                  position: relative;
                `}
              >
                <CssTextField
                  id="outlined-basic"
                  label="Brief description of your dataset*  "
                  variant="outlined"
                  {...register("description", { required: true })}
                  fullWidth
                  multiline
                  minRows={3}
                  inputProps={{
                    maxLength: 150,
                  }}
                  onChange={handleChange}
                />
                <p
                  css={`
                    position: absolute;
                    bottom: -12px;
                    right: 20px;
                    font-weight: 325;
                    font-size: 12px;
                    color: #231d2c;
                  `}
                >
                  {characterCount}/150
                </p>
              </div>
            </Grid>
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
              onClick={props.handleBack}
              css={`
                color: #231d2c;
                text-transform: uppercase;
                width: 125px;

                :hover {
                  opacity: 0.5;
                }
              `}
            >
              previous
            </button>
            <button
              type="submit"
              css={`
                color: #231d2c;
                text-transform: uppercase;
                width: 125px;
                background: #231d2c;
                color: #fff;
                :hover {
                  opacity: 0.8;
                }
              `}
            >
              next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
