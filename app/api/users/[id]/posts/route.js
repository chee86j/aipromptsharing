// to fetch all prompts created by a specific user
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// async() GET handler for fetching all prompts created by a specific user
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    // fetch prompts from db where 'creator' field matches the user id
    // then populate the 'creator' field with the user's details
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};

/*  This code essentially creates an API route for fetching all prompts 
    created by a specific user. The user's ID is expected to be part of 
    the URL (thanks to the file naming [id]), and it's used to query  
    db for prompts associated w/that user. The use of 
    populate('creator') enriches prompt data with detailed information 
    about the creator, which is useful for front-end displays that include 
    user details.
*/
