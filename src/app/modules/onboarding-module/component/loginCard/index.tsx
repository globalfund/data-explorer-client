import React from "react";
import { actionbuttoncss, socialloginbuttoncss } from "./style";
import { ReactComponent as LinkedInIcon } from "../../asset/linkedIn-img.svg";
import { ReactComponent as GoogleIcon } from "../../asset/google-img.svg";
import { ReactComponent as DividerImg } from "../../asset/login-divider.svg";

import { OnboardingTextInput } from "../textinput";
import { Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";

interface Prop {
  splitForm?: boolean;
  setSplitForm?: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function LoginCard(props: Prop) {
  const history = useHistory();
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
      `}
    >
      <React.Fragment>
        <button type="button" css={socialloginbuttoncss}>
          <GoogleIcon /> Log in with Google
        </button>
        <button type="button" css={socialloginbuttoncss}>
          <LinkedInIcon />
          Log in with LinkedIn
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

          <button
            type="button"
            css={`
              padding: 0;
              width: 100%;
              color: #231d2c;
              cursor: pointer;
              font-size: 1wpx;
              line-height: 20px;
              text-align: start;
              border-style: none;
              margin-top: -0.7rem;
              font-family: "Inter";
              /* margin-bottom: 12px; */
              display: flex;
              justify-content: flex-end;
              background: transparent;
            `}
          >
            Forgot password?
          </button>
          <Box height={48} />
          <button
            type="button"
            onClick={() => history.push("/user-management/profile")}
            css={actionbuttoncss(props.splitForm as boolean)}
          >
            Log in
          </button>
        </div>
      </React.Fragment>
    </div>
  );
}
