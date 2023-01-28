import './home.css';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import Posts from '../../components/posts/Posts';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export default function Home(){
    const [posts,setPosts]= useState([]);
    const {search} = useLocation();

    

    useEffect(()=>{
        const fetchPosts= async ()=>{
            const res = await axios.get("http://localhost:5000/api/posts"+search)
            setPosts(res.data);
        }
        fetchPosts();
    },[search]);
    return (
        <>
        <Header/>
        <div className="home">
            <Posts posts={posts}/>
            <Sidebar/>
        </div>
        </>
    )
}