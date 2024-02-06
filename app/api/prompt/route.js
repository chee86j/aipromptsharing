/*  app/api/prompt/route.js defines an API endpoint 
    for the front-end for fetching all prompt entries 
    from the database
*/

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");
    // performs a query to find all documents in the collection associated with the Prompt model
    // .populate('creator') indicates that it should also fetch associated data from the "creator" field

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
