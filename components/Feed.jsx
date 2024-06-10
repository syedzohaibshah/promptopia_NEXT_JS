'use client';

import { useState,useEffect } from "react";

import  PromptCard  from "./PromptCard";



const PromptCardList=({data,handleTagClick})=>{

    return (
    <div className="mt-16 prompt_layout">
    {data.map((post)=>(
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
// states

    const[searchText,setSearchText]=useState('');
    const[posts,setPosts]=useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [tagClick,setTagClick]=useState('');

    // this part will implement search functionality

    const handleSearchChange =(e)=>{

        setSearchText(e.target.value);


    }
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
    
    // this  will fetch post
useEffect(()=>{
    const fetchPosts=async ()=>{
        const response=await fetch('/api/prompt');
        const data = await response.json();
        setPosts(data);
    }
    fetchPosts();
},[]);

// this part will handle tag Click
const handleTagClick=(tag)=>{
    setTagClick(tag);
}
useEffect(()=>{

    const TagPost= ()=>{

        if(tagClick){     
        const filteredTag = posts.filter(post => 
            
            post.tag.toLowerCase() ===tagClick.toLowerCase()
            
        );
        setFilteredPosts(filteredTag);
    }
    }
    TagPost();
},[tagClick,posts])

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
                data={filteredPosts}
                handleTagClick={handleTagClick}
            />
    </section>
  )
}
export default Feed;

 