var router = require("express").Router();
const { google } = require("googleapis");
var axios = require('axios')

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

const classroom = google.classroom("v1")
// Creates a client; cache this for further use
const pubSubClient = new PubSub();

var subscription

async function subPull(req, res) {
  
  subscription = pubSubClient.subscription("my-topic-sub");
  res.status(200).send()

}

async function pullTopic2(req, res) {
  console.log("pulling")
    // Create an event handler to handle messages
    let messageCount = 0;
    const messageHandler = message => {
      console.log(`Received message ${message.id}:`);
      console.log(`\tData: ${message.data}`);
      console.log(`\tAttributes: ${message.attributes}`);
      messageCount += 1;
  
      // "Ack" (acknowledge receipt of) the message
      message.ack();
    };
  
    // Listen for new messages until timeout is hit
    subscription.on('message', messageHandler);
  
    setTimeout(() => {
      subscription.removeListener('message', messageHandler);
      console.log(`${messageCount} message(s) received.`);
    }, 2 * 1000);
  res.status(200).send()

}

async function pushTopic(req, res) {
  
  subscription = pubSubClient.subscription("my-topic-sub");
  res.status(200).send()

  const options = {
    pushConfig: {
      // Set to an HTTPS endpoint of your choice. If necessary, register
      // (authorize) the domain on which the server is hosted.
      pushEndpoint: `https://localhost:3000/api/push`,
    },
  };

  await pubSubClient
    .topic("my-topic")
    .createSubscription('my-topic-sub-push', options);
  console.log(`Subscription created.`);
  res.status(200).send()
}

async function pushMethod(req, res) {
  // console.log("awwwooooooga")
  console.log(Buffer.from(req.body.message.data, 'base64').toString());
  // console.log(req.body.message.data)
  // console.log(res.body)
  res.status(200).send()
}




router.get("/oauth4", subPull)
router.get("/oauth3", pullTopic2)
router.get("/oauth2", pushTopic)
router.post("/push", pushMethod)

module.exports = router;
