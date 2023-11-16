import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { homeFootercss } from "app/modules/home-module/components/Footer/style";
import { ReactComponent as CopyIcon } from "app/modules/home-module/components/Footer/asset/copy.svg";
import { ReactComponent as LogoIcon } from "app/modules/home-module/components/Footer/asset/logo.svg";
import { Link } from "react-router-dom";
import NewsletterForm from "app/modules/common/newsletterForm";
import { FieldErrors } from "react-hook-form";

export default function HomeFooter() {
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [isSubscriptionFailed, setIsSubscriptionFailed] = React.useState(false);
  const [formError, setFormError] = React.useState<
    FieldErrors<{
      email: string;
    }>
  >({});
  return (
    <div css={homeFootercss}>
      <Container
        maxWidth="lg"
        css={`
          padding: 0;
        `}
      >
        <Grid
          container
          alignContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid
            item
            lg={3}
            md={4}
            css={`
              a {
                font-size: 16px;
                font-weight: 400;
                text-decoration: none;
                color: #000;

                font-family: "Gotham Narrow", sans-serif;
              }
            `}
          >
            <ul
              css={`
                display: flex;
                flex-direction: column;
                gap: 18px;
                font-weight: bold;
                li:first-child {
                  margin-bottom: 20px;
                }
              `}
            >
              <li>
                <Link to="/">
                  <LogoIcon />
                </Link>
              </li>
              <li>
                <Link to="/why-dataXplorer">Why DataXplorer?</Link>{" "}
              </li>
              <li>
                <Link to="/explore">Explore</Link>{" "}
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/partners">Partners</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </Grid>
          <Grid
            item
            lg={3}
            md={4}
            css={`
              ul {
                margin-top: 20px;
              }
              a {
                text-decoration: none;
              }
              li {
                color: #000;
                font-family: "Gotham Narrow", sans-serif;
                font-size: 12px;
                :nth-child(1),
                :nth-child(2) {
                  margin-bottom: 17px;
                }
                p {
                  margin: 0px;
                  line-height: 1.1;
                }
              }
            `}
          >
            <ul>
              <li>Tel: +3185 401 5241</li>
              <li>
                {" "}
                <a href="mailto:contact@dataxplorer.org">
                  Email: contact@dataxplorer.org
                </a>{" "}
              </li>
              <li>
                <p>Keizersgracht 555</p>

                <p>1017 DR Amsterdam</p>

                <p>The Netherlands</p>
              </li>
            </ul>
          </Grid>

          <Grid item lg={4} md={4}>
            <p
              css={`
                font-size: 16px;
                font-weight: 350;
                color: #000;
                font-family: "Gotham Narrow", sans-serif;
              `}
            >
              Subscribe to our newsletter
            </p>
            <label
              css={`
                font-family: "Inter", sans-serif;
                font-size: 12px;
                text-align: left;
                width: 100%;
                padding-left: 10px;
                color: #e75656;
              `}
            >
              {formError.email && "Please enter a valid email address."}
            </label>
            <div
              css={`
                border-radius: 40px;
                background: #f7f7f7;
                width: 611px;
                height: 47px;
                display: flex;

                input {
                  outline: none;
                  border: none;
                  border-radius: 34.5px 0 0 34.5px;
                  width: 70%;
                  padding-left: 24px;
                  background: #f7f7f7;
                }
                button {
                  border: none;
                  outline: none;
                  border-radius: 0 34.5px 34.5px 0;
                  background: #231d2c;
                  text-transform: uppercase;
                  color: #fff;
                  font-family: "Inter", sans-serif;
                  font-size: 14px;
                  width: 30%;
                  font-weight: 700;
                }
              `}
            >
              <NewsletterForm
                setIsSubscribed={setIsSubscribed}
                setIsSubscriptionFailed={setIsSubscriptionFailed}
                setFormError={setFormError}
              />
            </div>
            <p
              css={`
                line-height: normal;
                font-size: 12px;
              `}
            >
              {isSubscribed
                ? "Thank you for subscribing!"
                : isSubscriptionFailed
                ? "Oops! Something went wrong with the request! Please fill your email again."
                : "  You will receive occasional emails from DX. You always have choice to unsubscribe within every Email."}
            </p>
          </Grid>
        </Grid>
        <div
          css={`
            display: flex;
            gap: 38px;
            align-items: center;
            border-top: 1px solid #d9d9d9;
            padding-top: 4px;
            padding-bottom: 20px;

            margin-top: 40px;
            a {
              text-decoration: none;
              color: #000;
            }
          `}
        >
          <p>
            <span
              css={`
                svg {
                  margin-bottom: -2.5px;
                }
              `}
            >
              <CopyIcon />
            </span>{" "}
            2023 DataXplorer All Rights Reserved
          </p>
          <p>
            {" "}
            <a
              href="https://drive.google.com/file/d/1andhlQEoaEq5qDxMbtnApXiZborsg-bG/view"
              className="privacy-link"
              target="_blank"
              rel="noreferrer"
            >
              Privacy
            </a>{" "}
          </p>
          <p>
            {" "}
            <a
              href="https://drive.google.com/file/d/1wgY5HYdE5-redIOF85E5fZZJT_YueOWP/view?usp=sharing"
              className="privacy-link"
              target="_blank"
              rel="noreferrer"
            >
              Terms and conditions
            </a>{" "}
          </p>
        </div>
      </Container>
    </div>
  );
}
