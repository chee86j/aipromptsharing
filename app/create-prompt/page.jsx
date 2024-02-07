"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter(); // Initialize Next.js router for navigation
  const { data: session } = useSession(); // Get the user's session with Next.js useSession hook

  // State to handle form submission
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  // Async() to handle form submission
  const createPrompt = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior.
    // This gives a more native feel to the form submission process with the
    // least amount of reloads as possible.
    setSubmitting(true); // and indicate that the form is submitting

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", //  Set the content type to JSON to avoid CORS issues
        },
        body: JSON.stringify({
          prompt: post.prompt, //  Send the prompt and tag to the server
          userId: session?.user.id, //  along with the user's id
          tag: post.tag, //  and the tag
        }),
      });

      if (response.ok) {
        router.push("/"); // if response ok navigate to the home page
      }
    } catch (error) {
      console.log(error);
    } finally {
      // this finally clause will run regardless of the outcome of the try block
      setSubmitting(false); //  reset submitting state after completion or error
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
