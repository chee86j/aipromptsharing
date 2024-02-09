// API Route for GET, PATCH, & DELETE requests for specific prompt

// import Prompt model and connectToDB function
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// async() GET handler for fetching a specific prompt
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    // Find prompt by ID and populate 'creator' field with user details
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

// async() PATCH handler for updating a specific prompt
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    // Find existing prompt by ID
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    // Update prompt with new data
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 });
  }
};

// async() DELETE handler for deleting a specific prompt
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find prompt by ID and remove it
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
