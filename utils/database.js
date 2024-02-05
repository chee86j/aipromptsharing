import mongoose from "mongoose";

let isConnected = false; // allows us to track the connection status

export const connectToDB = async () => {
  mongoose.set("strickQuery", true); // to avoid deprecation warning in the console

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dnName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true; // if the connection is successful, we set isConnected to true
    console.log("MongoDB is connected");
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};

// How to Set Up MongoDB Atlas
// we now head to mongodb.com/cloud/atlas to create a new cluster
// create a new database user and add the user to the database using the 'Try it now' button
// choose MO (Free Tier) and click 'Create Cluster' and optionally name your cluster
