# setup swap memory
sudo fallocate -l 4G /tmp/swapfile
sudo chmod 600 /tmp/swapfile
sudo mkswap /tmp/swapfile
sudo swapon /tmp/swapfile
sudo swapon --show

# change the node version to the codebase's desired version
. /usr/local/share/nvm/nvm.sh
nvm install 16
nvm use 16

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