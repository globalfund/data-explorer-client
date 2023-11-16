import React from "react";
import EmpowerBlock from "../partners/components/empowerBlock";
import { Box, Container, Snackbar, TextField } from "@material-ui/core";
import HomeFooter from "../../components/Footer";
import { ReactComponent as FullEllipse } from "app/modules/home-module/assets/contact-lg-ellispe.svg";
import NewsletterForm from "app/modules/common/newsletterForm";
import { FieldErrors } from "react-hook-form";
import axios, { AxiosError, AxiosResponse } from "axios";

const DXLogo = (
  <svg
    width="184"
    height="32"
    viewBox="0 0 184 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.524 26H7.652C14.672 26 19.496 20.888 19.496 13.508V13.256C19.496 5.84 14.672 0.799998 7.652 0.799998H0.524V26ZM7.58 3.284C13.088 3.284 16.688 7.316 16.688 13.292V13.544C16.688 19.52 13.088 23.516 7.58 23.516H3.224V3.284H7.58ZM28.9989 26.396C31.7709 26.396 33.6069 25.028 34.7229 23.264V26H37.2789V13.94C37.2789 11.744 36.6309 10.016 35.4789 8.864C34.2549 7.64 32.4909 6.992 30.2229 6.992C27.9189 6.992 26.0829 7.64 24.3189 8.504L25.1469 10.628C26.4429 9.944 28.0629 9.368 29.9349 9.368C32.9589 9.368 34.7229 10.988 34.7229 14.012V15.128C33.3189 14.696 31.8789 14.372 29.8989 14.372C25.7589 14.372 22.9869 16.568 22.9869 20.42V20.564C22.9869 24.272 25.8669 26.396 28.9989 26.396ZM29.5749 24.236C27.3429 24.236 25.5789 22.76 25.5789 20.42V20.312C25.5789 17.936 27.2349 16.388 30.2229 16.388C32.0589 16.388 33.5709 16.712 34.7589 17.144V19.484C34.7589 22.22 32.4549 24.272 29.5749 24.236ZM47.6486 26.288C48.7286 26.288 49.6286 26.036 50.4566 25.64V23.408C49.7006 23.732 48.9806 23.912 48.2606 23.912C46.6406 23.912 45.5606 23.192 45.5606 21.212V9.548H50.4566V7.244H45.5606V1.772H42.9686V7.244H40.7006V9.548H42.9686V21.644C42.9686 24.992 44.9846 26.288 47.6486 26.288ZM59.409 26.396C62.181 26.396 64.017 25.028 65.133 23.264V26H67.689V13.94C67.689 11.744 67.041 10.016 65.889 8.864C64.665 7.64 62.901 6.992 60.633 6.992C58.329 6.992 56.493 7.64 54.729 8.504L55.557 10.628C56.853 9.944 58.473 9.368 60.345 9.368C63.369 9.368 65.133 10.988 65.133 14.012V15.128C63.729 14.696 62.289 14.372 60.309 14.372C56.169 14.372 53.397 16.568 53.397 20.42V20.564C53.397 24.272 56.277 26.396 59.409 26.396ZM59.985 24.236C57.753 24.236 55.989 22.76 55.989 20.42V20.312C55.989 17.936 57.645 16.388 60.633 16.388C62.469 16.388 63.981 16.712 65.169 17.144V19.484C65.169 22.22 62.865 24.272 59.985 24.236ZM95.4374 31.4H98.0294V22.508C99.2534 24.56 101.125 26.36 104.113 26.36C107.929 26.36 111.601 23.012 111.601 16.784V16.424C111.601 10.196 107.929 6.884 104.113 6.884C101.161 6.884 99.2894 8.72 98.0294 10.844V7.244H95.4374V31.4ZM103.609 24.02C100.657 24.02 97.9214 21.212 97.9214 16.82V16.46C97.9214 12.068 100.657 9.224 103.609 9.224C106.489 9.224 108.937 11.924 108.937 16.496V16.784C108.937 21.392 106.561 24.02 103.609 24.02ZM116.22 26H118.812V0.00799775H116.22V26ZM131.679 26.396C136.503 26.396 140.031 22.184 140.031 16.712V16.496C140.031 11.024 136.539 6.884 131.715 6.884C126.891 6.884 123.363 11.06 123.363 16.532V16.784C123.363 22.256 126.855 26.396 131.679 26.396ZM131.715 24.056C128.511 24.056 126.027 20.924 126.027 16.712V16.532C126.027 12.356 128.367 9.224 131.679 9.224C134.883 9.224 137.403 12.356 137.403 16.568V16.748C137.403 20.888 135.027 24.056 131.715 24.056ZM144.34 26H146.932V17.072C146.932 12.248 149.74 9.8 153.232 9.8H153.376V6.992C150.316 6.848 148.048 8.756 146.932 11.384V7.244H144.34V26ZM163.495 26.396C166.303 26.396 168.247 25.316 169.939 23.588L168.463 21.932C167.167 23.228 165.655 24.092 163.603 24.092C160.651 24.092 158.095 21.788 157.807 17.648H170.407C170.443 17.324 170.443 16.82 170.443 16.568C170.443 10.916 167.635 6.884 162.919 6.884C158.527 6.884 155.179 10.88 155.179 16.604V16.784C155.179 22.724 158.923 26.396 163.495 26.396ZM157.807 15.632C158.059 11.708 160.147 9.152 162.919 9.152C165.979 9.152 167.671 12.068 167.851 15.632H157.807ZM174.609 26H177.201V17.072C177.201 12.248 180.009 9.8 183.501 9.8H183.645V6.992C180.585 6.848 178.317 8.756 177.201 11.384V7.244H174.609V26Z"
      fill="#231D2C"
    />
    <path
      d="M85.8305 0.799998L81.4745 8.972L77.1905 0.799998H71.2505L78.3785 13.184L70.9265 26H76.7225L81.3665 17.36L85.9745 26H91.9145L84.4265 13.112L91.6265 0.799998H85.8305Z"
      fill="#CEA8BC"
    />
  </svg>
);

export default function ContactModule() {
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [isSubscriptionFailed, setIsSubscriptionFailed] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [formError, setFormError] = React.useState<
    FieldErrors<{
      email: string;
    }>
  >({});

  const [contactFormDetails, setContactFormDetails] = React.useState([
    { name: "email", value: "" },
    { name: "firstname", value: "" },
    { name: "lastname", value: "" },
    { name: "company", value: "" },
    { name: "message", value: "" },
  ]);

  const resetForm = () => {
    setContactFormDetails([
      { name: "email", value: "" },
      { name: "firstname", value: "" },
      { name: "lastname", value: "" },
      { name: "company", value: "" },
      { name: "message", value: "" },
    ]);
  };
  const [contactFormFailed, setContactFormFailed] = React.useState(false);

  const handleContactFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setContactFormDetails((prevState) => {
      const newState = prevState.map((item) => {
        if (item.name === name) {
          return { ...item, value };
        }
        return item;
      });
      return newState;
    });
  };

  const handleContactFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(
        `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.REACT_APP_HUBSPOT_PORTAL_ID}/${process.env.REACT_APP_HUBSPOT_CONTACT_FORM_ID}`,
        {
          portalId: process.env.REACT_APP_HUBSPOT_PORTAL_ID,
          formGuid: process.env.REACT_APP_HUBSPOT_CONTACT_FORM_ID,
          fields: contactFormDetails,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setOpenSnackbar(true);
          setMessage(response.data.inlineMessage);
          resetForm();
        } else {
          setContactFormFailed(true);
        }
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setContactFormFailed(true);
      });
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        message={message}
      />
      <EmpowerBlock view="contact" />
      <Container maxWidth="lg">
        <div
          css={`
            position: relative;
            z-index: 1;

            height: 874px;

            margin: auto;
            margin-top: 50px;

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          `}
        >
          <FullEllipse
            css={`
              position: absolute;
              z-index: -1;
            `}
          />
          <form
            onSubmit={handleContactFormSubmit}
            css={`
              width: 522px;
              height: 100%;
              margin: auto;
              h4 {
                font-family: "Gotham Narrow Bold", sans-serif;
                font-size: 36px;
                line-height: 43px;
                color: #231d2c;
                text-align: center;
              }
              p {
                font-weight: 325;
                font-size: 24px;
                line-height: 29px;
                text-align: center;
                font-family: "Gotham Narrow", sans-serif;
                margin-top: 0;
              }
              .MuiFormControl-root {
                margin-top: 20px;
              }
            `}
          >
            <h4>Contact us!</h4>
            <p>
              Schedule a free demo now or ask us any data related question you
              may have.
            </p>
            <TextField
              id="standard-basic"
              label="E-mail"
              variant="standard"
              fullWidth
              required
              name="email"
              type="email"
              onChange={handleContactFormChange}
              value={contactFormDetails[0].value}
            />
            <TextField
              id="standard-basic"
              label="First Name"
              variant="standard"
              fullWidth
              name="firstname"
              value={contactFormDetails[1].value}
              onChange={handleContactFormChange}
            />
            <TextField
              id="standard-basic"
              label="Last Name"
              variant="standard"
              fullWidth
              name="lastname"
              value={contactFormDetails[2].value}
              onChange={handleContactFormChange}
            />
            <TextField
              id="standard-basic"
              label="Company Name"
              variant="standard"
              fullWidth
              name="company"
              value={contactFormDetails[3].value}
              onChange={handleContactFormChange}
            />
            <TextField
              id="standard-basic"
              label="Message"
              variant="standard"
              fullWidth
              required
              name="message"
              value={contactFormDetails[4].value}
              onChange={handleContactFormChange}
            />
            <Box height={60} />
            <button
              type="submit"
              css={`
                border: none;
                outline: none;
                background: #6061e5;
                border-radius: 50.7829px;
                height: 64px;
                width: 100%;
                color: #ffffff;
                font-weight: 700;
                font-size: 24px;
                font-family: "Inter", sans-serif;
                :hover {
                  cursor: pointer;
                  opacity: 0.9;
                }
              `}
            >
              SUBMIT
            </button>
          </form>
        </div>
        <div
          css={`
            height: 97px;
          `}
        />
        <div
          css={`
            border-radius: 24px;
            padding: 55px 40px 55px 40px;
            background: #231d2c;
            box-shadow: 0px 4px 30px 4px rgba(206, 168, 188, 0.08);
            width: 100%;
            height: 270px;
            display: flex;
            align-items: center;
            gap: 50px;
          `}
        >
          <div>
            <p
              css={`
                color: #fff;
                font-family: "Gotham Narrow", sans-serif;
                font-size: 40px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
              `}
            >
              Want to stay up to date with new releases?{" "}
            </p>
            <p
              css={`
                color: #fff;
                font-family: Gotham Narrow;
                font-size: 20px;
                font-style: normal;
                font-weight: 325;
              `}
            >
              Stay informed with exclusive updates, offers, and exclusive
              content delivered straight to your inbox!
            </p>
          </div>
          <div>
            <p
              css={`
                color: #fff;
                font-family: "Gotham Narrow", sans-serif;
                font-size: 22px;
                font-style: normal;
                font-weight: 350;
                line-height: normal;
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
                }
                button {
                  border: none;
                  outline: none;
                  border-radius: 0 34.5px 34.5px 0;
                  background: #6061e5;
                  text-transform: uppercase;
                  color: #fff;
                  font-family: "Inter", sans-serif;
                  font-size: 16px;
                  width: 30%;
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
                color: #fff;
              `}
            >
              {isSubscribed
                ? "Thank you for subscribing!"
                : isSubscriptionFailed
                ? "Oops! Something went wrong with the request! Please fill your email again."
                : ""}
            </p>
          </div>
        </div>
        <div
          css={`
            width: 40%;
            margin: auto;
            margin-top: 213px;
            text-align: center;
            font-weight: 325;
            font-size: 24px;
            line-height: 29px;
            text-align: center;
            color: #231d2c;
            font-family: "Gotham Narrow", sans-serif;

            a {
              color: #231d2c;
              text-decoration: none;
            }
          `}
        >
          {DXLogo}
          <p
            css={`
              margin-bottom: 0;
            `}
          >
            Keizersgracht 555 <br /> 1017 DR Amsterdam
          </p>
          <p
            css={`
              margin-top: 0;
            `}
          >
            The Netherlands
          </p>
          <p
            css={`
              margin-bottom: 0px;
            `}
          >
            E-mail:{" "}
            <a href="mailto:contact@dataxplorer.org">contact@dataxplorer.org</a>
          </p>
          <p
            css={`
              margin-top: 8px;
            `}
          >
            Tel: <a href="tel:0031854015241">+3185 401 5241</a>
          </p>
        </div>
      </Container>
      <div css="width: 100%;height: 232px" />
      <HomeFooter />
    </>
  );
}
