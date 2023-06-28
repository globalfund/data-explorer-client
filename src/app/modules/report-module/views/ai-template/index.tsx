import React from "react";
import Grid from "@material-ui/core/Grid";
import axios, { AxiosError, AxiosResponse } from "axios";
import { emailValidation } from "app/utils/emailValidation";
import { ReactComponent as MailImg } from "app/modules/report-module/asset/mail-img.svg";
import { ReactComponent as TopEllipse } from "app/modules/report-module/asset/ai-newsletter-top-ellipse.svg";
import { ReactComponent as BigEllipse } from "app/modules/report-module/asset/ai-newsletter-big-ellipse.svg";
import { ReactComponent as MidEllipse } from "app/modules/report-module/asset/ai-newsletter-md-btm-ellipse.svg";
import { ReactComponent as BtmGreenEllipse } from "app/modules/report-module/asset/ai-newsletter-btm-green-ellipse.svg";
import { ReactComponent as BtmPurpleEllipse } from "app/modules/report-module/asset/ai-newsletter-sm-purple-ellispe.svg";
import { ReactComponent as ReportIllustration } from "app/modules/report-module/asset/report-illustration.svg";
import { ReactComponent as DatasetIllustration } from "app/modules/report-module/asset/dataset-illustration.svg";
import { ReactComponent as ChartIllustration } from "app/modules/report-module/asset/chart-illustration.svg";
import {
  bigEllipsecss,
  btmGreenEllipsecss,
  btmPurpleEllipsecss,
  chartIllustrationcss,
  datasetIllustrationcss,
  midEllipsecss,
  newsletterIllustrationcss,
  notSubscribedcss,
  reportIllustrationcss,
  subscribedcss,
  topEllipsecss,
} from "./style";

export default function AITemplate() {
  const [email, setEmail] = React.useState("");
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleSubscribeAction = () => {
    if (emailValidation(email)) {
      axios
        .post(
          `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.REACT_APP_HUBSPOT_PORTAL_ID}/${process.env.REACT_APP_HUBSPOT_SUBSCRIBE_FORM_ID}`,
          {
            portalId: process.env.REACT_APP_HUBSPOT_PORTAL_ID,
            formGuid: process.env.REACT_APP_HUBSPOT_SUBSCRIBE_FORM_ID,
            fields: [
              {
                name: "email",
                value: email,
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response: AxiosResponse) => {
          if (response.status === 200) {
            setEmail("");
            setIsSubscribed(true);
          }
        })
        .catch((error: AxiosError) => {
          console.log(error.response);
        });
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
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
        <div css={newsletterIllustrationcss}>
          <h1>Subscribe to our newsletter</h1>
          <p>
            Want to be the first one to know when we launch our brand new
            AI-powered template for reports? Don't miss out on this exciting
            opportunity!
          </p>
          <div
            css={`
              position: relative;
              width: 100%;
            `}
          >
            <BigEllipse css={bigEllipsecss} />
            <MidEllipse css={midEllipsecss} />
            <BtmGreenEllipse css={btmGreenEllipsecss} />
            <BtmPurpleEllipse css={btmPurpleEllipsecss} />
            <DatasetIllustration css={datasetIllustrationcss} />
            <ChartIllustration css={chartIllustrationcss} />
            <ReportIllustration css={reportIllustrationcss} />
          </div>
          <TopEllipse css={topEllipsecss} />
        </div>
      </Grid>

      <Grid item xs={12} md={6}>
        {isSubscribed ? (
          <div css={subscribedcss}>
            <div>
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
          <div css={notSubscribedcss}>
            <div>
              <MailImg />
              <div
                css={`
                  height: 47px;
                `}
              />
              <p>
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
                `}
              >
                <input
                  type="text"
                  placeholder="Email address"
                  onChange={handleEmailChange}
                />
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
