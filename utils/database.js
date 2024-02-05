import mongoose from "mongoose";

let isConnected = false; // allows us to track the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true); // to avoid deprecation warning in the console

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   These are deprecated as of MongoDB Node.js Driver version 4.0.0,
      //   and you can safely remove them from your connection settings.
    });

    isConnected = true; // if the connection is successful, we set isConnected to true

    console.log("MongoDB is connected");
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};

/*  -----How to Set Up MongoDB Atlas-----
1.  we now head to mongodb.com/cloud/atlas to create a new cluster
2.  create a new database user and add the user to the database using the 'Try it now' button
3.  choose MO (Free Tier) and click 'Create Cluster' and optionally name your cluster

Deployment Section:
4.  Click 'New Project' and name your project and click 'Create Project'
5.  Click 'Build a Cluster' and choose the free tier and click 'Create Cluster'
6.  Select 'Shared' and click 'Create Cluster' after you named your cluster
7.  Make sure when you 'Connect' to your cluster, you are using the correct configuration 'Driver' and 'Version'

Security Section:
8.  Under 'Security' click 'Database Access' and click 'Add New Database User'
    Enter a username and password and click 'Add User'
    Change 'Built-In Roles' to 'Read and Write to any Database' and click 'Add User'

Network Access Section:
9.  Under 'Security' click 'Network Access' and click 'Add IP Address'
    Also Click 'Allow Access from Anywhere' and click 'Confirm'
10. You should have added your current IP address to the whitelist
    as well as 0.0.0.0/0 to allow access from anywhere
*/

/*  --------Connecting to MongoDB--------.env.local
   remember to replace <password> with your actual password without <> for MongoDB_URI within your .env.local file

   a MONGODB_URI is required for NextAuth.js to work and is used to store user data
   to get a MONGODB_URI, you can use a cloud service like MongoDB Atlas  https://www.mongodb.com/cloud/atlas
   or you can run a local MongoDB server
*/

/*  -----Checking if the data was saved to MongoDB-----
    1. Select your project cluster 
    2. Go to your MongoDB Atlas dashboard and click 'Collections'
    3. If you see Query Results, you have successfully connected to MongoDB
*/
