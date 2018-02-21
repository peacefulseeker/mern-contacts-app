const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const Contact = require("../react-ui/model/contacts");
const router = express.Router();


const PORT = process.env.PORT || 5000;


// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();
  mongoose.connect('mongodb://db-mern-user:admin@ds237748.mlab.com:37748/db-mern');

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get('/api', function(req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  //adding the /contacts route to our /api router
  app.get("/api/contacts", function(req, res) {
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
  app.put('/api/contacts/:contact_id', function(req, res) {
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



  // All remaining requests return the React app, so it can handle routing.
  // app.get('*', function(request, response) {
  //   response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  // });

  app.listen(PORT, function() {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}
