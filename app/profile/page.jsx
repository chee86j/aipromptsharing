"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

// MyProfile component to display the profile of the user and their prompts
const MyProfile = () => {
  const router = useRouter(); // initialize the router
  const { data: session } = useSession(); // access the current session

  const [myPosts, setMyPosts] = useState([]); // initialize the state to store the user's prompts

  // useEffect hook to fetch the user's prompts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data); // update the state with fetched user's prompts
    };

    // fetch the user's prompts if the user is logged in
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  // () to delete the prompt
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        // filter deleted prompt from the state
        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        // update the state with remaining prompts
        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // render Profile component with user's prompts & event handlers
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
