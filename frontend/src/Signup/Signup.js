
import React, {Component} from 'react'
import './Signup.css'

export default class Signup extends Component{
    constructor(props){
        super(props)
        this.state = {
            FirstName: "",
            LastName: "",
            Email: "",
            Password: "",
            Rpassword: ""
        }
        this.fname_changeHandler = this.fname_changeHandler.bind(this)
        this.lname_changeHandler = this.lname_changeHandler.bind(this)
        this.email_changeHandler = this.email_changeHandler.bind(this)
        this.password_changeHandler = this.password_changeHandler.bind(this)
        this.rpassword_changeHandler = this.rpassword_changeHandler.bind(this)
        this.handlesubmit = this.handlesubmit.bind(this)  
    }
    fname_changeHandler(e) {
        this.setState({
            FirstName: e.target.value
        })
    }
    lname_changeHandler(e) {
        this.setState({
            LastName: e.target.value
        })
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
    rpassword_changeHandler(e) {
        if(this.state.Password !== "" && this.state.Password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)){
            this.setState({
                Rpassword: e.target.value
            })
        }else{
            this.setState({
                Rpassword: ""
            })
        }   
    }
    handlesubmit(e){     
        if(this.state.FirstName !== "" && this.state.LastName !== "" && this.state.Email !== "" && this.state.Password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) && this.state.Password === this.state.Rpassword){
            e.preventDefault()
            const user = {
                firstname: document.getElementById("s-fname").value,
                lastname: document.getElementById("s-lname").value,
                email: document.getElementById("s-email").value,
                password: document.getElementById("s-password").value,
            }  
            fetch(
                "http://localhost:3001/signup",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(user)
                })
                .then(response => response.json())
                .then(body => {
                  if (body.success) { alert("Successfully saved user"); }
                  else { alert("Failed to save user"); }
                });
            
        }else{
            alert("User Cannot be Saved!");
            e.preventDefault();
        }
            
    }
    render() {
        return(
            <div className="Signup">
                <div className="SignupWrap">
                    <div className="Topside">
                        <h1 className="Logo">
                            Sign Up
                        </h1>
                        <h4 className="Description"> 
                           It's quick and easy.
                        </h4>
                    </div>
                    <hr/>
                    <form>
                        <label> First Name </label>
                        <input 
                            type="text"
                            id = "s-fname" 
                            placeholder="First Name"
                            value = {this.state.FirstName}
                            onChange = {this.fname_changeHandler} 
                            required>
                        </input>

                        <label> Last Name </label>
                        <input 
                            type="text" 
                            id = "s-lname" 
                            placeholder="Last Name"
                            value = {this.state.LastName}
                            onChange = {this.lname_changeHandler} 
                            required>
                        </input>

                        <label> Email </label>
                        <input 
                            type="email"
                            id = "s-email" 
                            placeholder="Email"
                            value = {this.state.Email}
                            onChange = {this.email_changeHandler} 
                            required>
                        </input>

                        <label> Password </label>
                        <input 
                            type="password" 
                            id = "s-password" 
                            placeholder="Password"
                            value = {this.state.Password}
                            onChange = {this.password_changeHandler} 
                            required>
                        </input>
                        <div className = "password"> {this.state.Password !== "" ? this.state.Password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) ? "" : " Password should have at least 8 characters, 1 number, 1 lowercase letter, and 1 uppercase letter" : ""}</div>
                        <label> Repeat Password </label>
                        <input 
                            className = "repeatpassword"
                            type="password" 
                            placeholder="Repeat Password"
                            value = {this.state.Rpassword}
                            onChange = {this.rpassword_changeHandler} 
                            required>
                        </input>
                        <div className = "password"> 
                            {this.state.Password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) ? this.state.Password === this.state.Rpassword ? "" : "Password does not Match" : ""}
                        </div>
                        <button className = "button" value="Submit" onClick={this.handlesubmit}>Submit</button>
                        <a href= "/Login">Already Have An Account</a>
                    </form>
                </div>
            </div> 
        )
    }
}

