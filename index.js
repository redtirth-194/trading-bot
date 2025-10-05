import express from "express";

import cors from "cors";

import cookieParser from "cookie-parser";

import dotenv from "dotenv";

import { fileURLToPath } from "url";

import { dirname, join } from "path";

import mongoose from "mongoose";

// import router from "./routes/index.js";

import admin from "firebase-admin";

import bodyParser from "body-parser";

// import https from "https";

import fs from "fs";

import xmlparser from "express-xml-bodyparser";

import cron from "node-cron";

// import {
//   checkForRequestTimeOut,
//   makeBatchFromLiveQueue,
//   checkForQueueToQueueRequestTimeOut,
// } from "./controllers/sendNotification.js";

// import { checkForCarLimitInLiveQueue } from

// import { Queue } from "./models/queue.js";

dotenv.config();

// const serviceAccountPath = process.env.ROOTPATH + "/serviceAccountKey.json";

// const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

// admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

app.use(cors());

app.use(xmlparser());

app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(bodyParser.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads/.tmp", express.static(join(__dirname, "/uploads/.tmp")));

// app.use(router);

// const options = {
//   key: fs.readFileSync("/home/redspar2/public_html/eTaxi/cert/ssl.key"),

//   cert: fs.readFileSync("/home/redspar2/public_html/eTaxi/cert/ssl.crt"),

//   ca: fs.readFileSync("/home/redspar2/public_html/eTaxi/cert/ca-bundle.crt"),
// };

// const server = https.createServer(options, app);

const mongoUrl =
  process.env.MONGO_URL ||
  "mongodb+srv://redtirth:Redspark123@cluster0.jmhpiaf.mongodb.net/";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB via Mongoose");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB via Mongoose:", err);

    process.exit(1);
  });


const port = process.env.PORT || 30005;

app.listen(port, () => {
  console.log(`Server is running securely on port ${port}!`);
});

// Graceful Shutdown

process.on("SIGINT", async () => {
  console.log("Gracefully shutting down...");

  await mongoose.connection.close();

  process.exit(0);
});
