// components/UpdatePrompt.jsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/dist/client/use-router";

// Import Form component used for editing prompts
import Form from "@components/Form";

// Define the UpdatePrompt component
const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Extract prompt ID from search parameters
  const promptId = searchParams.get("id");

  // State for prompt data (text and tag)
  const [post, setPost] = useState({ prompt: "", tag: "" });
  // State to track whether form is currently submitting
  const [submitting, setIsSubmitting] = useState(false);

  // useEffect hook to fetch prompt details when component mounts or promptId changes
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      // Update post state with fetched data
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    // Fetch prompt details if promptId is available
    if (promptId) getPromptDetails();
  }, [promptId]);

  // Function to handle prompt updates
  const updatePrompt = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsSubmitting(true); // Indicate that form is submitting

    // Alert if promptId is missing
    if (!promptId) return alert("Missing PromptId!");

    try {
      // Make a PATCH request to update prompt
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt, // Include updated prompt and tag in request body
          tag: post.tag,
        }),
      });

      // If response is OK, navigate to home page
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Reset submitting state
      setIsSubmitting(false);
    }
  };

  // Render Form component with necessary props
  return (
    <Form
      type="Edit" // Indicate that form is for editing
      post={post} // Pass current prompt data to form
      setPost={setPost} // Function to update prompt data
      submitting={submitting} // Submitting state
      handleSubmit={updatePrompt} // Function to handle form submission
    />
  );
};

export default UpdatePrompt;
