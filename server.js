"use strict"
//first we import our dependencies…
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var Contact = require("./model/contacts");
//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set
//it up, or 3001

var port = process.env.PORT || 3001;

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('build'))
}
mongoose.connect('mongodb://db-mern-user:admin@ds237748.mlab.com:37748/db-mern');

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  //and remove cacheing so we get the most recent contacts
  res.setHeader("Cache-Control", "no-cache");
  next();
});
//now we can set the route path & initialize the API
router.get("/", function(req, res) {
  res.json({ message: "API Initialized!" });
});
//Use our router configuration when we call /api
app.use("/api", router);

//adding the /contacts route to our /api router
router.route("/contacts")
  //retrieve all contacts from the database
  .get(function(req, res) {
    //looks at our Contact Schema
    Contact.find(function(err, contacts) {
      if (err)
        res.send(err);
      //responds with a json object of our database contacts.
      res.json(contacts)
    });
  })
  //post new contact to the database
  .post(function(req, res) {
    var contact = new Contact();
    //body parser lets us use the req.body
    contact.fullname = req.body.fullname;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Contact successfully added!" });
    })
  });
//Add this after our get and post routes
//Adding a route to a specific comment based on the database ID
router.route('/contacts/:contact_id')
  //The put method gives us the chance to update our contact based on
  //the ID passed to the route
  .put(function(req, res) {
    Contact.findById(req.params.contact_id, function(err, contact) {
      if (err) {
        res.send(err);
      }
      console.log(req.body);
      //setting the new fullname and text to whatever was changed. If
      //nothing was changed we will not alter the field.
      (req.body.fullname) ? contact.fullname = req.body.fullname : null;
      (req.body.email) ? contact.email = req.body.email : null;
      (req.body.phone) ? contact.phone = req.body.phone : null;
      //save contact
      contact.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Contact has been updated' });
      });
    });
  })
  //delete method for removing a contact from our database
  .delete(function(req, res) {
    //selects the contact by its ID, then removes it.
    Contact.remove({ _id: req.params.contact_id }, function(err, contact) {
      if (err)
        res.send(err);
      res.json({ message: 'Contact has been deleted' })
    })
  });

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
