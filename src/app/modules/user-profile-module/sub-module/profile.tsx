import { Box } from "@material-ui/core";
import { PrimaryButton } from "app/components/Styled/button";
import React from "react";
import PasswordInput from "../component/passwordInput";
import { avicss, flexContainercss, inputcss, profilecss } from "../style";

interface State {
  password: string;
  showPassword: boolean;
}

export default function Profile() {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div css={profilecss}>
      <h4>Profile</h4>
      <form>
        <div css={flexContainercss}>
          <p>Name</p>
          <div>
            <input type="text" css={inputcss} />
          </div>
        </div>
        <div css={flexContainercss}>
          <p>Photo</p>
          <div
            css={`
              width: 100%;
              justify-content: flex-start;
            `}
          >
            <div css={avicss}>
              <b>VI</b>{" "}
            </div>
          </div>
        </div>
        <div css={flexContainercss}>
          <p>Email</p>
          <div>
            <input type="text" css={inputcss} />
          </div>
        </div>
        <div css={flexContainercss}>
          <p>Job Title</p>
          <div>
            <input type="text" css={inputcss} />
          </div>
        </div>
        <div
          css={`
            display: grid;
            grid-template-columns: 31% auto;
            margin-bottom: 20px;
          `}
        >
          <p>Password</p>
          <div>
            <PasswordInput
              handleChange={handleChange}
              label="Current password"
              name="password"
              setValues={setValues}
              values={values}
            />
            <div>
              <p
                css={`
                  font-weight: 400;
                `}
              >
                Reset password
              </p>
              <div>
                <h5
                  css={`
                    line-height: 14.52px;

                    font-size: 12px;
                    font-weight: 400;
                  `}
                >
                  Your new password must be different from previously used
                  <br />
                  passwords.
                </h5>
              </div>
              <input css={inputcss} type="text" />
              <h5
                css={`
                  line-height: 14.52px;
                  font-size: 12px;
                  font-weight: 400;
                `}
              >
                Password must contain at least 1 letter, 1 number, and 1 symbol.
                <br /> Minimum length is 8 characters.
              </h5>
              <input css={inputcss} type="text" />
              <div
                css={`
                  width: 100%;
                  display: flex;
                  justify-content: flex-end;
                `}
              >
                <div
                  css={`
                    width: 30%;
                    display: flex;
                    justify-content: flex-end;
                    color: #ffffff;
                    margin-top: 2rem;
                  `}
                >
                  <PrimaryButton color="#231D2C"> Save</PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
