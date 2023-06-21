import { Grid } from "@material-ui/core";
import React from "react";
import { ReactComponent as MailImg } from "app/modules/report-module/asset/mail-img.svg";
import NewsLetterImg from "app/modules/report-module/asset/ai-newsletter.svg";

export default function AITemplate() {
  const [subscribed, setSubscribed] = React.useState(false);
  const handleSubscribeAction = () => {
    setSubscribed(true);
  };
  return (
    <Grid
      container
      css={`
        height: calc(100vh - 48px);
      `}
    >
      <Grid
        item
        xs={12}
        md={6}
        css={`
          height: 100%;
        `}
      >
        <div
          css={`
            width: 100%;
            height: 100%;
            img {
              height: 100%;
              width: 100%;
              object-fit: cover;
            }
          `}
        >
          <img src={NewsLetterImg} alt="newsletter-img" />
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        {subscribed ? (
          <div
            css={`
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding-left: 40px;
              padding-right: 48px;
            `}
          >
            <div
              css={`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;
                b:nth-child(1),
                b:nth-child(2) {
                  text-align: center;
                  font-weight: 325;
                  font-size: 18px;
                  line-height: 22px;
                  color: #231d2c;
                  font-family: "Gotham Narrow", sans-serif;
                }
                p {
                  font-family: "Gotham Narrow", sans-serif;

                  text-align: center;
                }
                p:last-child {
                  font-size: 14px;
                  color: #b6b6b6;
                }
              `}
            >
              <MailImg />
              <div
                css={`
                  height: 47px;
                `}
              />
              <p>
                <b>Thank you for subscribing!</b>
              </p>

              <p>
                <b>
                  You will be the first to know when we launch our AI-powered
                  template as well
                  <br /> as new other new releases and exciting news!{" "}
                </b>
              </p>

              <p>You should receive a confirmation email soon.</p>
            </div>
          </div>
        ) : (
          <div
            css={`
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding-left: 40px;
              padding-right: 48px;
            `}
          >
            <div
              css={`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;
              `}
            >
              <MailImg />
              <div
                css={`
                  height: 47px;
                `}
              />
              <p
                css={`
                  text-align: center;
                  font-weight: 325;
                  font-size: 14px;
                  line-height: 17px;
                  font-family: "Gotham Narrow", sans-serif;
                `}
              >
                Sign up now by entering your email below. Be among the first to
                experience the future of <br />
                reporting unfold right in your inbox. 🚀
              </p>
              <div
                css={`
                  height: 44px;
                `}
              />
              <div
                css={`
                  display: flex;
                  height: 47px;
                  width: 100%;
                  border-radius: 40px;
                  input {
                    background: #f7f7f7;
                    border-top-left-radius: 40px;
                    border-bottom-left-radius: 40px;
                    outline: none;
                    border: none;
                    height: 100%;
                    padding-left: 24px;
                    width: 70%;
                    font-size: 16px;
                    font-family: "Inter", sans-serif;
                    color: #000000;
                  }
                  button {
                    background: #231d2c;
                    border-radius: 0px 34.5px 34.5px 0px;
                    outline: none;
                    border: none;
                    font-family: "Inter", sans-serif;
                    font-size: 16px;
                    line-height: 19px;
                    color: #ffffff;
                    height: 100%;
                    width: 30%;
                    :hover {
                      cursor: pointer;
                      opacity: 0.9;
                    }
                  }
                `}
              >
                <input type="text" placeholder="Email address" />
                <button type="button" onClick={handleSubscribeAction}>
                  SUBSCRIBE
                </button>
              </div>
              <p
                css={`
                  text-align: left;
                  width: 100%;
                  padding-left: 10px;
                `}
              >
                You will receive occasional emails from DX. You always have
                choice to unsubscribe within every Email.
              </p>
            </div>
          </div>
        )}
      </Grid>
    </Grid>
  );
}
