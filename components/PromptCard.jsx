"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
// Next.js hooks for navigation, usePathname is used to get the current path
// useRouter is used to navigate to a different page

// PromptCard component for displaying a single individual prompt card
const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession(); // extract session data from the useSession hook
  const pathName = usePathname(); // get the current url path
  const router = useRouter(); // get router object to programmatically navigate between pages

  // State to manage the 'copied' status of the prompt text
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt); // set copied state to the prompt text
    navigator.clipboard.writeText(post.prompt); // copy the prompt text to the clipboard using the Clipboard API that is available in modern browsers
    setTimeout(() => setCopied(""), 3000); // reset copied state after 3 secs
  };

  return (
    <div className="prompt_card hover:scale-110">
      {/* Section displaying the post creator's information */}
      <div className="flex justify-between items-start gap-5">
        {/* User image and name */}
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          {/* User profile image */}
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          {/* User name and email */}
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        {/* Copy button for the prompt */}
        <div className="copy_btn" onClick={handleCopy}>
          {/* Icon changes to a tick when the prompt is copied */}
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>

      {/* Displaying the prompt text */}
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      {/* Displaying the prompt tag */}
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {/* Conditional rendering: Edit and Delete options appear only if the logged-in user is the creator of the post */}
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          {/* Edit prompt option */}
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          {/* Delete prompt option */}
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
