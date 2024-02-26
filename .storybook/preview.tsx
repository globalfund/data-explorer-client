import type { Preview } from "@storybook/react";

import React from "react";
import Providers from "../src/app/Providers";

export const decorators = [
  (Story) => (
    <Providers>
      <React.StrictMode>
        <Story />
      </React.StrictMode>
    </Providers>
  ),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
