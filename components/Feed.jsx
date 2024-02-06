/*  Feed component for fetching & displaying a list of prompts (posts) 
    It uses a 'PromptCardList' sub-component to render each prompt (posts) 
    including a search input to filter the prompts by tag or username
*/

"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

// Self-contained component for displaying a list of prompt cards
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

// Feed component for displaying the feed of prompts
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {};

  // useEffet hook to fetch the prompts from the server
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data); // updating the posts state with the fetched data
    };

    console.log(posts);

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
