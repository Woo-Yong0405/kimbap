const firebase = require("firebase/app");
const asdf = require("./token.json");
require("firebase/firestore")

firebase.initializeApp({
    apiKey: asdf.API_KEY,
    authDomain: asdf.AUTH_DOMAIN,
    projectId: asdf.PROJECT_ID
});

const dbService = firebase.firestore();

module.exports = dbService;