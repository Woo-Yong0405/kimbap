import firebase from "firebase";
import {config} from "dotenv";
config();

firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID
});

const dbService = firebase.firestore();

export default dbService