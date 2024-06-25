//Reference for the search algorithm: https://www.youtube.com/watch?v=MY6ZZIn93V8

import React, { useEffect } from 'react'
import { useState } from 'react';
import './Leftbar.css'
import SearchIcon from '@mui/icons-material/Search';
export default function Leftbar(){
    
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
   
    useEffect(() => {
      const fetchData = async () => {
        await fetch(`http://localhost:3001/userFindAll?q=${query}`)
            .then(response => response.json())
            .then(body => {
                setData(body);
            })
      };
      if (query) fetchData();
      else setData([]);
    }, [query]);
  
    return (
      <div className = "leftbar">
        <div className = "leftpadding">
          <div className="search-app">
            <div className = "Searchbar">
              <SearchIcon className = "searchBar-logo"/>
              <input title = "Searchbar" className = "searchBar" placeholder = "Search Friendsbook" type="text" 
              onChange={(e) => setQuery(e.target.value.toLowerCase())} />
              </div>
              <ul className = "itemlist">
                {
                    data.map((item, index) => {
                        
                        return <a href = "/Profile"><li className = "item"  onClick={() =>localStorage.setItem("profileid", item._id)} key = {index}>
                        <img className = "itemphoto" src="/files/profile.jpg" alt = ""/>
                        
                        <span className = "itemname" >{item.firstname + " " + item.lastname}</span>
                        </li>
                        </a>
                    })   
                }
              </ul>
              <div className = "decoration">
                
                <div className = "link">
                    <img src= "/files/friends.png" className="pic" alt="fr"/>
                    <span className ="caption">Friends</span>
                </div>
                <div className = "link">
                    <img src= "/files/market.png" className="pic" alt="mr"/>
                    <span className ="caption">Marketplace</span>
                </div>
                <div className = "link">
                    <img src= "files/saved.png" className="pic" alt="sv"/>
                    <span className ="caption">Saved</span>
                </div>
                <div className = "link">
                    <img src= "files/group.png" className="pic" alt="gp"/>
                    <span className ="caption">Groups</span>
                </div>
                <div className = "link">
                    <img src= "files/watch.png" className="pic" alt="wp"/>
                    <span className ="caption">Watch</span>
                </div>
                <div className = "link">
                    <img src= "files/seemore.png" alt="seemore" className="pic"/>
                    <span className ="caption">See More</span>
                </div>
                <hr className = "Hr"/>
                <header className = "shortcutheader">Your Shortcuts</header>
                <div className = "link">
                    <img src= "files/shortcut1.png"  alt= "shortcut" className="pic"/>
                    <span className ="caption">UPLB Housemates</span>
                </div>
                <div className = "link">
                    <img src= "files/shortcut2.png" alt= "shortcut" className="pic"/>
                    <span className ="caption">Valorant PH</span>
                </div>
                <div className = "link">
                    <img src= "files/shortcut3.png"  alt= "shortcut" className="pic"/>
                    <span className ="caption">PABILI Brgy. Batasan Hills</span>
                </div>

                <hr className = "Hr"/>
                <header className = "shortcutheader">Explore</header>
                <div className = "link">
                    <img src= "files/events.png" alt = "events" className="pic"/>
                    <span className ="caption">Events</span>
                </div>
                <div className = "link">
                    <img src= "files/pages.png" alt = "pages" className="pic"/>
                    <span className ="caption">Pages</span>
                </div>
                <div className = "link">
                    <img src= "files/seemore.png" alt = "seemore" className="pic"/>
                    <span className ="caption">See More</span>
                </div>
              </div>
              
          </div>
        </div>

      
      </div>
      
    );
}

