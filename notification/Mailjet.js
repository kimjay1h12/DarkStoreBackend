const Mailjet = require("node-mailjet")

const mailjet = new Mailjet.Client({
  apiKey: "560ea40aeec89a45f1cfc1b64f85c9a3",
  apiSecret: "34c8dc6b5effbffe144686c5b36a1cbd"
})
module.exports = mailjet  