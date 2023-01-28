import { useEffect, useState } from 'react';
import './sidebar.css';
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Sidebar(){
    const [cats,setCats]= useState([]);

    useEffect(()=>{
        const getCats= async ()=>{
            const res= await axios.get("http://localhost:5000/api/categories")
            setCats(res.data);
        }
        getCats();
    },[])
    return (
        <div className="sidebar">
           <div className="sidebarItem">
               <span className="sidebarTitle">About</span>
               <img src="https://images.pexels.com/photos/12380980/pexels-photo-12380980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
               <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam magnam rem excepturi! Nisi delectus</p>
           </div>
           <div className="sidebarItem">
               <span className="sidebarTitle">CATEGORIES</span>
               <ul className="sidebarList">
                   
                   {cats.map((c)=> (
                    <Link to={`/?cat=${c.name}`} className="link">
                        <li className="sidebarListItem"> {c.name} </li>
                    </Link>
                   ))}
               </ul>
           </div>

           <div className="sidebarItem">
               <span className="sidebarTitle">FOLLOW US</span>
               <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-facebook"></i>
                    <i className="sidebarIcon fa-brands fa-twitter"></i>
                    <i className="sidebarIcon fa-brands fa-pinterest"></i>
                    <i className="sidebarIcon fa-brands fa-instagram"></i>
               </div>
           </div>
        </div>
    )
}