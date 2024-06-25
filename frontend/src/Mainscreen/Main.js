import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import React from 'react'
import './Main.css'
import Header from './Header'
import Leftbar from './Leftbar'
import Middlebar from './Middlebar'
import Rightbar from './Rightbar'

class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          checkedIfLoggedIn: false,
          isLoggedIn: null,
          userid: localStorage.getItem("userid"),
          friendslist: [],
          friends: []
        }
        this.logout = this.logout.bind(this);
      }
    
      componentDidMount() {
        // Send POST request to check if user is logged in
        fetch("http://localhost:3001/checkifloggedin",
          {
            method: "POST",
            credentials: "include"
          })
          .then(response => response.json())
          .then(body => {
            if (body.isLoggedIn) {
              this.setState({ checkedIfLoggedIn: true, isLoggedIn: true, userid: localStorage.getItem("userid")});
            } else {
              this.setState({ checkedIfLoggedIn: true, isLoggedIn: false });
            }
          });
          
        fetch(
          "http://localhost:3001/findByIdPOST",
          {
              method: "POST",
              headers: {
              "Content-Type": "application/json"
              },
              body: JSON.stringify({id: this.state.userid})
          })
          .then(response => response.json())
          .then(body => {
              this.setState({ friendslist: body.friendslist});
          })

        
      }
    
      logout(e) {
        e.preventDefault();
        // Delete cookie with authToken
        const cookies = new Cookies();
        cookies.remove("authToken");
    
        // Delete username in local storage
        localStorage.removeItem("userid");
        localStorage.removeItem("profileid");
    
        this.setState({ isLoggedIn: false });
      }
    
      render() {
        if (!this.state.checkedIfLoggedIn) {
          // delay redirect/render
          return (<div></div>)
        }else {
          if (this.state.isLoggedIn) {
            // render the page
            return (
                <div>
                <Header logout = {this.logout}/>
                   
                <div className = "Main"> 
                  
                  <Leftbar/>
                  
                  <Middlebar/>
                  <Rightbar data = {this.state.friendslist}/>
                </div>
            </div>   
            )
          } else {
            // redirect 
            return <Navigate to="/login" />
          }
        }
      }
    }
    
  


export default Main