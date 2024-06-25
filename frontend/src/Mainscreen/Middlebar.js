import React from 'react'

import './Middlebar.css'
import Posts from './Posts'


class Middlebar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userid: localStorage.getItem("userid"),
            content: "",
            firstname: "",
            lastname: "",
        }
        this.content_changeHandler = this.content_changeHandler.bind(this)
        
        this.handlepost = this.handlepost.bind(this)  
    }
    content_changeHandler(e) {
        this.setState({
            content: e.target.value
        })
    }
    
    handlepost(e){
        const post = {
            userid: localStorage.getItem("userid"),
            author: this.state.firstname + " " + this.state.lastname,
            content: document.getElementById("p-content").value
           
        }  
        fetch(
            "http://localhost:3001/addPost",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(post)
            })
            .then(response => response.json())
            .then(body => {
              if (body.success) { 
                alert("Successfully saved post"); 
                window.location.reload()
            }
              else { alert("Failed to save post"); }
            });
    }
    componentDidMount() {
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
                this.setState({ firstname: body.firstname, lastname: body.lastname});
            })
      }
      
    render() {
        return(
            <div className = "middlebar">
                <div className = "middlepadding">
                    <div className='sharepost'>
                        <div className = 'posttop'>
                            <input type = "text" 
                                    id = "p-content"  
                                    value = {this.state.post}
                                    onChange = {this.content_changeHandler} 
                                    placeholder = "What's on your mind, Apraem Cayle?" 
                                    className="input"/>
                        </div>
                        <hr className = "Hr1"/>
                        <div className = 'postbot'>
                            <button className = "sharebutton" type="button" onClick={this.handlepost}>
                                <label className = "buttonlabel">Post now</label>
                            </button>
                        </div>
                    </div>
                </div>
                <Posts data/>
            </div>
            
        )

    }
}

export default Middlebar