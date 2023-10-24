import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { socialloginbuttoncss, termsOfServiceCss } from "./style";
import { ReactComponent as GoogleIcon } from "../../asset/google-img.svg";
import { ReactComponent as LinkedInIcon } from "../../asset/linkedIn-img.svg";

export default function AuthCard(props: { isLogin?: boolean }) {
  const { loginWithRedirect } = useAuth0();
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const onButtonClick = () => {
    loginWithRedirect();
  };

  return (
    <div
      css={`
        display: flex;
        color: #231d2c;
        padding: 16px 0;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        > button {
          opacity: ${checked || props.isLogin ? "1" : "0.5"};
          pointer-events: ${checked || props.isLogin ? "auto" : "none"};
        }
      `}
    >
      <button type="button" css={socialloginbuttoncss} onClick={onButtonClick}>
        <GoogleIcon /> {props.isLogin ? "Log in" : "Sign up"} with Google
      </button>
      <button type="button" css={socialloginbuttoncss} onClick={onButtonClick}>
        <LinkedInIcon />
        {props.isLogin ? "Log in" : "Sign up"} with LinkedIn
      </button>
      {!props.isLogin && (
        <FormControlLabel
          control={
            <Checkbox
              name="tna"
              color="default"
              checked={checked}
              onChange={handleChange}
            />
          }
          label={
            <p
              css={`
                color: #231d2c;
                font-size: 12px;
                font-family: "GothamNarrow-Book";
              `}
            >
              I agree with DX's{" "}
              <a
                href=""
                target="_blank"
                rel="noreferrer noopener"
                css={`
                  color: #231d2c;
                `}
              >
                terms of services and privacy policy
              </a>
            </p>
          }
          css={termsOfServiceCss}
        />
      )}
    </div>
  );
}
