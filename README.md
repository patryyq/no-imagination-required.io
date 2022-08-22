# No Imagination Required
## live demo at [no-imagination-required.io ](https://no-imagination-required.io "demo at no-imagination-required.io ")
## collaboration feature video [youtube ](https://www.youtube.com/watch?v=TvYoDQ7h6yk "collaboration feature video ")
## basic functionality video [youtube ](https://www.youtube.com/watch?v=NtGhSmtjDug "basic functionality video ")

# About
Final year project for Web Programming and Cyber Security undegraduate course.
The project is a web-based application, enabling collaboration in a 3D space.
Using either own or default available models, create 3D scenes - visualise the arrangement
of objects in a particular space (garden, warehouse etc.) 

## Technologies

- React
- Node.js (Express)
- Websockets
- AWS S3
- MongoDB
- WebGL (Three.js)
- Nginx

## Requirements

- NPM/Node.js
- MongoDB
- AWS S3 bucket
- Google/Facebook API private/public keys

# Installation and running
Clone the repo

```
git clone https://github.com/patryyq/no-imagination-required
```

CD into directory
```
cd no-imagination-required
```

Checkout to up-to-date develop branch as the project is in early development stage and the main branch is empty for now

```
git checkout develop
```
```
cd server
```
Install dependencies
```
npm i
```
Install client dependencies (dont need to change/cd folders)
```
npm run client-install
```
Run development server with 'concurrently' package, so both front and back end server are runing at the same time.
```
npm run dev
```

# ***Note*** 
### ***Reupload of original private repo, but without credentials. To run this repo, you need AWS S3 bucket, MongoDB, Google/Facebook API private/public keys. Fill blank spaces in the files in config folder.***

# Poster
<img src="poster.png">


