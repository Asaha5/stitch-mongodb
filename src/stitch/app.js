import { Stitch, UserPasswordCredential } from "mongodb-stitch-browser-sdk";

// TODO: Add your Stitch app's App ID
const APP_ID = "stitch_demo-uqptz";

// TODO: Initialize the app client
const app = Stitch.hasAppClient(APP_ID)
? Stitch.getAppClient(APP_ID)
: Stitch.initializeAppClient(APP_ID);

export { app, UserPasswordCredential };