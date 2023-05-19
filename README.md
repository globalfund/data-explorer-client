# Dataxplorer client (app)

---

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/zimmerman.team/dx.client/blob/main/LICENSE.MD)

## What is the Dataxplorer?

It makes use of [Data API Middleware](https://github.com/zimmerman.team/dx.server/) in order to retrieve all data needed for the visualisations/tables/filters and detail pages.

## About the project

- Website: <a href="https://data.theglobalfund.org" target="_blank">app.dataxplorer.org</a>
- Authors: <a href="https://www.zimmerman.team/" target="_blank">Zimmerman</a>
- Github Repo:
  - Frontend: <a href="https://github.com/zimmerman.team/dx.client" target="_blank">https://github.com/zimmerman.team/dx.client</a>
  - Backend: <a href="https://github.com/globalfund/data-explorer-server" target="_blank">https://github.com/zimmerman.team/dx.server</a>

## Installation

In order to be able to successfully run or build the app you need to create an environment file `.env` in the project root directory and fill it with the following:

```
REACT_APP_API=<data middleware api url>
REACT_APP_MAPBOX_TOKEN=<mapbox account token>
REACT_APP_GOOGLE_ANALYTICS_ID=<google analytics app id>
REACT_APP_CMS_API=<cockpit cms api url>
REACT_APP_CMS_TOKEN=<cockpit cms api token>
REACT_APP_USE_DEFAULT_DATASETS=<boolean true or false>
```

`REACT_APP_API`: is the url where the data middleware API runs on. If running [Data API Middleware](https://github.com/globalfund/data-explorer-server/) locally then you can use `http://localhost:4200`.

`REACT_APP_MAPBOX_TOKEN`: to get a mapbox token you will need to register on their [website](https://www.mapbox.com).The token will be used to identify you and start serving up map tiles. The service is free until a certain level of traffic is exceeded.

`REACT_APP_GOOGLE_ANALYTICS_ID`(optional): Google Analytics ID in order to be able to make use of Google Analytics services.

`REACT_APP_CMS_API`: is the url where the [Cockpit CMS API](https://github.com/zimmerman-team/the-data-explorer-cms/) runs on.

`REACT_APP_CMS_TOKEN`: is the API token retrieved from the Cockpit CMS interface.

`REACT_APP_USE_DEFAULT_DATASETS`: is the setting to determine whether or not we use the Global Fund default datasets, or external datasets.

`PORT`: can be used to specify on which port to run the client.

---

In the project directory, you can run:

### `yarn install`

Installs all necessary dependencies.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## How should I contribute?

- As we use semantic-release for automated git releases your commits must comply with the following commit types:

```
feat: A new feature
fix: A bug fix
docs: Documentation only changes
style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
refactor: A code change that neither fixes a bug nor adds a feature
perf: A code change that improves performance
test: Adding missing or correcting existing tests
chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
```

- Always try to reference issues in commit messages or pull requests ("related to #614", "closes #619" and etc.).
- Avoid huge code commits where the difference can not even be rendered by browser based web apps (Github for example). Smaller commits make it much easier to understand why and how the changes were made, why (if) it results in certain bugs and etc.
- If there's a reason to commit code that is commented out (there usually should be none), always leave a "FIXME" or "TODO" comment so it's clear for other developers why this was done.
- Automatic code quality / testing checks (continuous integration tools) are implemented to check all these things automatically when pushing / merging new branches. Quality is the key!
