# cs-restaurant

[Demo App](https://acrtz.github.io/cs-restaurant/)

### Scripts

In the project directory, you can run:

#### `yarn start`

Run the app locally at http://localhost:3000.

#### `yarn test`

Launches the test runner. (tests use [Jest](https://jestjs.io/) and [testing-library](https://testing-library.com/))

#### `yarn build`

Builds the app for production to the `build` folder. This folder can be hosted statically with a service like S3 or be served with something like node/express.

#### `yarn deploy`

Deploys the app to github-pages. Requires setting up a github repository for the app and adding the 'homepage' url to package.json.
The homepage url follows the following pattern:

`"homepage": "http://GITHUB_USERNAME.github.io/GITHUB_REPO_NAME"`

GITHUB_USERNAME and GITHUB_REPO_NAME need to be replaced with the correct values.

### Application structure

##### Presentational components

Presentational components are all in `./src/components`. `Layout.tsx` is the top level and is responsible for rendering all other presentational components and it is rendered in `App.tsx`.

##### State

Most of the application state is found in `./src/App.tsx`, with small pieces of state showing up in some of the presentational components.

##### Logic

Most of the applications logic can be found in `./src/util/filterUtilities`, but there is also some logic found in the presentational components.

##### Tests

Tests are co-located in the same folder with the component or function they are testing.

##### Styling

css files are also co-located in the same folder with the component or function they are styling.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
