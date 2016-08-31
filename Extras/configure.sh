#!/bin/sh
PREREQS = "python python-dev perl python-pip build-essential checkinstall libssl-dev git"
NODE = "nodejs npm"
echo "Installing Prerequisites"
apt-get update # Fetches the list of available updates
apt-get upgrade -y # Strictly upgrades the current packages
apt-get dist-upgrade  # Installs updates (new ones)
apt-get install -y $PREREQS # Install the packages
# NODE.JS
apt-get install -y $NODE # Install node.js
sudo ln -s /usr/bin/nodejs /usr/bin/node # create a symbolic link for node.js
# MONGODB
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927 # Import key
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list # Create a list file
sudo apt-get update # Update package
sudo apt-get install -y mongodb-org # Install the latest version of MongoDB