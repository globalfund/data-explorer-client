import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "app/utils/emailValidation";
import axios, { AxiosResponse, AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";

export default function NewsletterForm(props: {
  setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubscriptionFailed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ email: string }>({ resolver: yupResolver(emailSchema) });
  const [email, setEmail] = React.useState("");

  const handleSubscribeAction = () => {
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
          props.setIsSubscribed(true);
        } else {
          props.setIsSubscriptionFailed(true);
        }
      })
      .catch((error: AxiosError) => {
        props.setIsSubscriptionFailed(true);
        console.log(error.response, "res");
      });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <form
      css={`
        width: 100%;
        display: flex;
      `}
      onSubmit={handleSubmit(handleSubscribeAction)}
    >
      <input
        type="text"
        placeholder="Email address"
        {...register("email", { required: true })}
        onChange={handleEmailChange}
      />
      <button type="submit">SUBSCRIBE</button>
    </form>
  );
}
