const firebase = require("firebase");
const asdf = require("./token.json");

firebase.initializeApp({
    apiKey: asdf.API_KEY,
    authDomain: asdf.AUTH_DOMAIN,
    projectId: asdf.PROJECT_ID
});

const dbService = firebase.firestore();

module.exports = dbService;