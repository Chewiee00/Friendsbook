
import React, {Component} from 'react'
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";
import './Login.css'


export default class Login extends Component{
  constructor(props){
    super(props)
    this.state = {
        Email: "",
        Password: "",
        checkedIfLoggedIn: false,
        isLoggedIn: null,
        userid: localStorage.getItem("userid"),
        isvalid: false
    }
    this.email_changeHandler = this.email_changeHandler.bind(this)
    this.password_changeHandler = this.password_changeHandler.bind(this)
    this.handlesubmit = this.handlesubmit.bind(this)  
  }
  email_changeHandler(e) {
    this.setState({
        Email: e.target.value
    })
  }
  password_changeHandler(e) {
    this.setState({
        Password: e.target.value,
    })
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
  }

  handlesubmit(e){     
    if(this.state.Email !== "" && this.state.Password !== ""){
      e.preventDefault();

      const credentials = {
        email: document.getElementById("l-email").value,
        password: document.getElementById("l-password").value
      }
  
      // Send a POST request
      fetch(
        "http://localhost:3001/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(credentials)
        })
        .then(response => response.json())
        .then(body => {
          if (!body.success) { alert("Failed to log in"); }
          else {
            // successful log in. store the token as a cookie
  
            const cookies = new Cookies();
            cookies.set(
              "authToken",
              body.token,
              {
                path: "localhost:3001/",
                age: 60*60,
                sameSite: "lax"
              });
  
              localStorage.setItem("userid", body.userid);
              this.setState({ isValid: true});
          }
        })   
    }else{
        alert("Cannot Login");
        this.setState({ isValid: false});
        e.preventDefault();
    }          
  }
    render() {
      if (!this.state.checkedIfLoggedIn) {
        // delay redirect/render
        return (<div></div>)
      } else {
        if (!this.state.isValid) {
          // render the page
          return(
            <div className="Login">
                <div className="LoginWrap">
                    <div className="Topside">
                        <h1 className="Logo">
                            Login
                        </h1>
                        <h4 className="Description"> 
                            It's quick and easy.
                        </h4>
                    </div>
                    <hr/>
                    <form>
                        <label> Email </label>
                        <input 
                            type="email"
                            id = "l-email" 
                            placeholder="Email"
                            value = {this.state.Email}
                            onChange = {this.email_changeHandler} 
                            required>
                        </input>

                        <label> Password </label>
                        <input 
                            type="password" 
                            id = "l-password" 
                            placeholder="Password"
                            value = {this.state.Password}
                            onChange = {this.password_changeHandler} 
                            required>
                        </input>
                        <button className = "button" value="Login" onClick={this.handlesubmit}>Submit</button>
                        <a href= "/Signup">Create An Account</a>
                    </form>
                </div>
            </div> 
          )
          } else {
            // redirect
            return <Navigate to="/main" />
          }
        }
    }

}