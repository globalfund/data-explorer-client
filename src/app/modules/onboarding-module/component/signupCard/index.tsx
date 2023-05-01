import React from "react";
import {
  actionbuttoncss,
  socialloginbuttoncss,
  termsOfServiceCss,
} from "./style";
import { ReactComponent as LinkedInIcon } from "../../asset/linkedIn-img.svg";
import { ReactComponent as GoogleIcon } from "../../asset/google-img.svg";
import { ReactComponent as DividerImg } from "../../asset/signup-divider.svg";

import { OnboardingTextInput } from "../textinput";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";

export default function SignupCard() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div
      css={`
        display: flex;
        padding: 16px 0;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        color: #231d2c;
      `}
    >
      <React.Fragment>
        <button type="button" css={socialloginbuttoncss}>
          <GoogleIcon /> Sign up with Google
        </button>
        <button type="button" css={socialloginbuttoncss}>
          <LinkedInIcon />
          Sign up with LinkedIn
        </button>
        <div
          css={`
            margin: 9px 0 25px 0;
          `}
        >
          <DividerImg />
        </div>
        <div
          css={`
            width: 100%;

            > .MuiTextField-root {
              margin-bottom: 16px;
            }
          `}
        >
          <OnboardingTextInput
            type="text"
            label="name"
            value={name}
            setValue={setName}
          />
          <OnboardingTextInput
            type="email"
            label="Email"
            value={email}
            setValue={setEmail}
          />

          <OnboardingTextInput
            type="password"
            label="Password"
            value={password}
            setValue={setPassword}
          />

          <FormControlLabel
            control={<Checkbox name="tna" color="default" />}
            label={
              <p
                css={`
                  color: #231d2c;
                  font-family: "GothamNarrow-Book";
                  font-size: 12px;
                `}
              >
                I agree with DX's{" "}
                <span
                  css={`
                    text-decoration: underline;
                  `}
                >
                  terms of services and privacy policy
                </span>
              </p>
            }
            css={termsOfServiceCss}
          />
          <Box height={48} />
          <button type="button" css={actionbuttoncss}>
            Sign up
          </button>
        </div>
      </React.Fragment>
    </div>
  );
}
