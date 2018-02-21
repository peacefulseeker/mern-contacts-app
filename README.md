## Contacts APP, build with MERN Technology Stack

As a base for project was used the following technologies:
 - MongoDB as a data storage. Was using Mlab service to create the database and MongoDB Compass to manage the database locally withing nice interface
 - Node.js + Express as a server side language and server
 - React as a JavaScript framework
 - Heroku for live deployment
 - SCSS as a CSS preprocessor


In order to start a development server with watching React and SCSS files, run the following command:
`yarn run start-dev`

The connection to Mlab is provided in [server.js](/server.js#L14) file on line 13


P.S. For faster development I have used awesome tutorial on MERN topic, which can be found here:
[React Getting Started — The MERN Stack Tutorial! (feat. ES6!)](https://medium.com/@bryantheastronaut/react-getting-started-the-mern-stack-tutorial-feat-es6-de1a2886be50)
And customized for app needs.
Need to say that I could not understood the practical point of using styles inside javascript variable, so replaced it with normal SCSS and used globally for entire app


### Deployed Version
Can be found on deployed branch:
[Deployed](/tree/deployed)
