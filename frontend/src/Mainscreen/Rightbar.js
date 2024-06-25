import React from 'react'
import './Rightbar.css'

class Rightbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userid: localStorage.getItem("userid"),
            friendslist:[],
            friends: [],
            friendrequests: [],
        }
      }
      componentDidMount() {
        fetch(
            "http://localhost:3001/findByIdPOST",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({id: localStorage.getItem("userid")})
            })
            .then(response => response.json())
            .then(body => {
                this.setState({ friendslist: body.friendslist, friendrequests: body.friendrequests});
            })
      }
      componentDidUpdate() {
        fetch(
            "http://localhost:3001/findFriendrequest",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({friendrequests: this.state.friendrequests})
            })
            .then(response => response.json())
            .then(body => {
                this.setState({ friendrequests: body });
            });
        fetch(
          "http://localhost:3001/findFriends",
          {
              method: "POST",
              headers: {
              "Content-Type": "application/json"
              },
              body: JSON.stringify({friendslist: this.state.friendslist})
          })
          .then(response => response.json())
          .then(body => {
              this.setState({ friends: body });
          });   
      }
    
    
    reject(){
        alert("reject");
    }

    render() {
        const friends = this.state.friends;
        const friendrequests = this.state.friendrequests;
        return(
            
            <div className = "rightbar">
                <div className = "contacts">
                    <label className = "friendsLabel">Contacts</label>
                    <hr className = "Hr"/>
                    <ul className = "friendslist">
                        {
                            friends.map((friends, index) => {
                                return <div className="friendspadding">
                                <li className = "friend" key = {index}>
                                <img className = "friendphoto" src="/files/profile.jpg" alt = ""/> 
                                <span className = "friendname">{friends.firstname + " " + friends.lastname }</span>
                                </li>
                                </div>
                            })
                        }
                    </ul>
                </div>



                <div className = "friendreq">
                    <label className = "friendsLabel">Friend Requests</label>
                    <hr className = "Hr"/>
                    <ul className = "friendslist">
                        {
                            friendrequests.map((friendrequests, index) => {
                                return <li className = "friend" key = {index}>
                                <img className = "friendphoto" src="/files/profile.jpg" alt = ""/> 
                                <span className = "friendname">{friendrequests.firstname + " " + friendrequests.lastname}</span>
                                <div className = "acceptorreject"> 
                                    <button className = "acceptpadding" onClick = { ()=> 
                                        fetch(
                                            "http://localhost:3001/acceptRequest",
                                            {
                                                method: "POST",
                                                headers: {
                                                "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({userid: this.state.userid, reqid: friendrequests._id })
                                            })
                                            .then(response => response.json())
                                            .then(body => {
                                                alert("Friend Request Accepted!");
                                                window.location.reload()
                                            }) 
                                    }> 
                                        <span className = "accept">Accept</span>
                                    </button>
                                    <button className = "rejectpadding" onClick = { () =>
                                        fetch(
                                            "http://localhost:3001/rejectRequest",
                                            {
                                                method: "POST",
                                                headers: {
                                                "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({userid: this.state.userid, reqid: friendrequests._id })
                                            })
                                            .then(response => response.json())
                                            .then(body => {
                                                alert("Friend Request Rejected!");
                                                window.location.reload()
                                            }) 
                                    }> 
                                        <span className = "reject">Reject</span>
                                    </button>
                                </div>
                                </li>
                            })
                        }
                    </ul> 
                </div>
               
            </div>
        )
    }
}

export default Rightbar