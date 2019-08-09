require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let JWTSECRET = process.env.JWTSECRET
let GITHUBCLIENTID = process.env.GITHUBCLIENTID
let GITHUBSECRET = process.env.GITHUBSECRET

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT,
  JWTSECRET,
  GITHUBCLIENTID,
  GITHUBSECRET,
}
