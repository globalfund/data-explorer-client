
# setup @rawgraphs/rawgraphs-charts submodule
git submodule init
git submodule update
cd rawgraphs-charts
yarn install
yarn build
yarn link
cd ..

# install dependencies
yarn link "@rawgraphs/rawgraphs-charts"
yarn install

# run the app
yarn start