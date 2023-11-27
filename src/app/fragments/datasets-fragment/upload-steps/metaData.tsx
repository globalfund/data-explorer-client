import React from "react";
import Box from "@material-ui/core/Box";
import findIndex from "lodash/findIndex";
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { metaDatacss } from "app/fragments/datasets-fragment/style";

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

export interface IFormDetails {
  name: string;
  source: string;
  category: string;
  public?: boolean;
  sourceUrl: string;
  description: string;
}

export const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#231D2C",
    },
    "&.MuiInputLabel-outlined": {
      fontSize: "16px",
      fontFamily: "'GothamNarrow-Book', sans-serif",
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

export const categories = [
  "Arts and Culture",
  "Economy",
  "Education",
  "Environment",
  "Healthcare",
  "Technology",
  "Social",
];

const CssSelectField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#231D2C",
    },
    "&.MuiInputLabel-outlined": {
      fontSize: "16px",
      fontFamily: "'GothamNarrow-Book', sans-serif",
      color: "#231D2C",
    },
    "&.MuiSelect-outlined": {
      padding: "2px 14px",
      height: "48px",
      background: "#fff",
      display: "flex",
      alignItems: "center",
    },
    "&.MuiFormHelperText-root": {
      color: "#231D2C",
      fontSize: "12px",
      fontWeight: 400,
      marginLeft: "0px",
    },
    "&.MuiInput-underline:after": {
      borderBottomColor: "#231D2C",
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
})(Select);

const SelectField = (props: {
  value: string;
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}) => (
  <FormControl variant="outlined" fullWidth>
    <InputLabel id="select-label">Data category</InputLabel>
    <CssSelectField
      fullWidth
      id="select"
      value={props.value}
      label="Data category"
      labelId="select-label"
      onChange={props.handleChange}
      MenuProps={{
        PaperProps: {
          style: {
            borderRadius: "20px",
            marginTop: `${(findIndex(categories, props.value) + 1) * 60}px`,
          },
        },
      }}
      css={`
        fieldset {
          border-radius: 10px;
          padding-bottom: 4px;
          border-color: #231d2c !important;
        }
      `}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {categories.map((category) => (
        <MenuItem key={category} value={category}>
          {category}
        </MenuItem>
      ))}
    </CssSelectField>
  </FormControl>
);

export default function MetaData(props: Props) {
  const { register, handleSubmit, getValues } = useForm<IFormDetails>();

  const [characterCount, setCharacterCount] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    props.setFormDetails({
      ...props.formDetails,
      [name]: value,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { value } = event.target;
    props.setFormDetails({
      ...props.formDetails,
      category: value as string,
    });
  };

  React.useEffect(() => {
    setCharacterCount(props.formDetails.description.length);
  }, [props.formDetails.description]);

  return (
    <div css={metaDatacss}>
      <h1>Describe your data</h1>
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
            <Box height={50} />
            <Grid lg={5} xs={12} md={5} item>
              <SelectField
                value={getValues().category}
                handleChange={handleSelectChange}
              />
            </Grid>
            <Grid lg={7} xs={12} md={7} item>
              <CssTextField
                id="outlined-basic"
                label="Source of the data"
                variant="outlined"
                {...register("source", { required: true })}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid lg={12} xs={12} md={12} item>
              <CssTextField
                id="outlined-basic"
                label="Link to data source"
                variant="outlined"
                {...register("sourceUrl", { required: true })}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
          <div
            css={`
              display: flex;
              justify-content: flex-end;
              margin-top: 12rem;
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
