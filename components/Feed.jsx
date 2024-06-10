'use client';

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

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

const Feed = () => {
  // States
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [tagClick, setTagClick] = useState('');

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data); // Set initial filtered posts to all posts
        console.log('Fetched posts:', data); // Log fetched posts
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    fetchPosts();
  }, []);

  // Filter posts based on search text
  useEffect(() => {
    const filterPosts = () => {
      if (!searchText) {
        setFilteredPosts(posts);
      } else {
        const filtered = posts.filter(post =>
          post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
          post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
          post.creator.username.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredPosts(filtered);
      }
    };
    filterPosts();
  }, [searchText, posts]);

  // Handle tag click
  const handleTagClick = (tag) => {
    setTagClick(tag);
  };

  // Filter posts based on tag click
  useEffect(() => {
    const filterTagPosts = () => {
      if (tagClick) {
        const filteredTag = posts.filter(post =>
          post.tag.toLowerCase() === tagClick.toLowerCase()
        );
        setFilteredPosts(filteredTag);
      }
    };
    filterTagPosts();
  }, [tagClick, posts]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or username or tag"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
