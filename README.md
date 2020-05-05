# WAreporter

> A Vue.js project for administration of the WADQC framework


## Prerequisites
* WADQC-server (https://bitbucket.org/MedPhysNL/wadqc/downloads/)
* Nodejs (https://nodejs.org/en/download/)
* Vue CLI (https://cli.vuejs.org/guide/installation.html)

## Installation
* Clone the repository
``` bash
> git clone https://github.com/JaapGroen/WADadministrator.git WADadministrator
```
* Enter folder and install dependencies with npm
``` bash
> cd WADadministrator
> npm install
```
* Run a test version with hot-reloading
``` bash
> npm run serve
```

## Production
* Optionally edit the pre-filled api information in src/store/store.js, line 12
``` bash
> nano src/store/store.js
```
* Build the production
``` bash
> npm run build
```
* Add WADadministrator to your webserver with DocumentRoot "WADadministrator-folder/dist"
