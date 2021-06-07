# Tron-React Poll DAPP


This is an open-source Poll DAPP (Decentralized application) on the Tron blockchain 


## Packages

- **[docker-tron-quickstart](https://github.com/TRON-US/docker-tron-quickstart)**
- **[Tronbox](https://github.com/tronprotocol/tronbox)**
- **[Tronweb](https://github.com/tronprotocol/tronweb)**
- **[React](https://github.com/facebook/react)**
- **[Redux](https://github.com/reduxjs/redux)**
- **[React Router Dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)**
- **[Styled Components](https://github.com/styled-components/styled-components)**


## Start a local Tron node

```shell
docker run -it -p 9090:9090 --rm -v $PWD\tronbox\:/tron/tronbox -v $PWD/accounts-data:/config trontools/quickstart

```
or
```shell
docker run -it -p 9090:9090 --rm -v $PWD\tronbox\:/tron/tronbox -e "mnemonic=sunny butter catalog penalty merge soap wave priority victory prevent hollow remind" trontools/quickstart

```

## Compile and Deploy Smart contracts

create a .env file in the tronbox folder

```shell
cd tronbox && cp sample-env .env 
```
Add your real private-keys in the .env file


```shell
cd tronbox && source .env && tronbox migrate --reset 

```
and to deploy on the Shasta test net
```shell
cd tronbox && source .env && tronbox migrate --reset --network shasta

```

`tronPollDappContract` and `tronPollTokenContract` in `src/tronServices/constants.js` should get replaced with your contract addresses.

## Prerequisites
```
npm install
```


## Start DAPP
```
npm run start
```

## Demo
[url to demo page](https://vahidfzm.github.io/tron-high-risk-dapp/index.html)

![demo](./demo.png)

PS: The demo-contract is published on Shasta network (a test network in tron blockchain) and to use it, you need to switch to shasta-node in Tronlink wallet. 

