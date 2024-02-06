//  Create your own api endpoint
//  This route will be used to create a new prompt entry in the database
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt"; // next create a prompt model in the models folder

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    å;
    const newPrompt = new Prompt({
      // create a new instance of the Prompt model
      // and set the fields to the values passed in the request body
      creator: userId,
      prompt,
      tag,
    });
    //  This is a lambda function that opens up only when it is called to
    //  make a connection to the database then go in peace
    //  It will connectToDb, do its thing, and then close the connection

    await newPrompt.save();

    // upon saving the new prompt to the database, return a success response with the
    // json representation of the new prompt and a status code of 201
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
    // a 500 status code is a generic error message
  }
};
