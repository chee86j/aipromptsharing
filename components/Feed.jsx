/*  Feed component for fetching & displaying a list of prompts (posts) 
    It uses a 'PromptCardList' sub-component to render each prompt (posts) 
    including a search input to filter prompts by tag or username
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

// Feed component for displaying feed of prompts
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // () to handle search input changes
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // useEffet hook to fetch prompts from server
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/prompt");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // useEffect hook to filter prompts based on search input
  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
        post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
        post.creator.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchText, posts]);

  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search for a tag, prompt, or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      {/* Use filteredPosts to render PromptCardList */}
      <PromptCardList data={filteredPosts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
