Setup
=====

Initial setup
-------------

```
nodeenv env --prebuilt
. env/bin/activate
npm install -g @ionic/cli
ionic start Wuerfler
cd Wuerfler/
ionic serve
ionic build
ionic cap add android
ionic cap copy
ionic cap open android
```

Developer setup
---------------

```
# https://linuxconfig.org/how-to-install-android-studio-on-ubuntu-20-04-focal-fossa-linux
sudo apt install openjdk-13-jdk
sudo snap install android-studio --classic
git clone git@github.com:ppoile/ionic-wuerfeler
cd ionic-wuerfeler
nodeenv env --prebuilt
. env/bin/activate
npm install
npm install -g @ionic/cli
```

Development
===========

Development in Browser
----------------------

```
ng serve
```

Development for phone 
---------------------

ionic cap add android
ionic cap copy
cordova-res android --skip-config --type icon --copy
ionic cap open android
