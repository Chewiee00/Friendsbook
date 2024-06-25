
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import React from 'react'
import './Profile.css'
import Header from './Header'

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedIfLoggedIn: false,
      isLoggedIn: null,
      addStatus: true,
      userid: localStorage.getItem("userid"),
      profileid: localStorage.getItem("profileid"),
      firstname: "",
      lastname: "",
      email: "",
      
    }

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    fetch(
      "http://localhost:3001/checkAddStatus",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({userid: this.state.userid, profileid: this.state.profileid})
      })
      .then(response => response.json())
      .then(body => {
          this.setState({ addStatus: body.addStatus});
      })
    fetch(
      "http://localhost:3001/findByIdPOST",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id: this.state.profileid})
      })
      .then(response => response.json())
      .then(body => {
          this.setState({ firstname: body.firstname, lastname: body.lastname, email: body.email});
      })
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
        if (this.state.addStatus){
          return (
            <div>
            <Header logout = {this.logout}/>
            <h1 className = "name">{this.state.firstname + " " + this.state.lastname} </h1>
            <h2 className = "email">{this.state.email}</h2>
            <div className = "buttonPadding">
              <button className = "button" type="button" onClick={() =>
                fetch(
                "http://localhost:3001/addFriend",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({userid: this.state.userid, profileid: this.state.profileid})
                })
                .then(response => response.json())
                .then(body => {
                    if(body.success){
                    alert("Successfully Added friend");
                    }else{
                    alert("Failed to Add friend");
                    }
                window.location.reload()
                })
              }> Add Friend </button>
            </div>
          </div>
          )
        } else {
          return (
            <div>
            <Header logout = {this.logout}/>
            <h1 className = "name">{this.state.firstname + " " + this.state.lastname} </h1>
            <h2 className = "email">{this.state.email}</h2>
          </div>   
          )
        }
        
      } else {
        // redirect 
        return <Navigate to="/login" />
      }
    }
  }
}

      


export default Profile