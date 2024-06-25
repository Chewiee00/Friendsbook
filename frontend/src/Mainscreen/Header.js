import React from 'react'
import './Header.css'
import LogoutIcon from '@mui/icons-material/Logout';
class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          userid: localStorage.getItem("userid"),
          firstname: "",
          lastname: "",
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
                body: JSON.stringify({id: this.state.userid})
            })
            .then(response => response.json())
            .then(body => {
                this.setState({ firstname: body.firstname, lastname: body.lastname});
            })
    }
    
    render() {
        return(
            <div className="header-block">
                <div className= "header-left">
                    <img src= "/files/logo.png" className="header-logo" alt="logo" />
                </div>
            
                <div className= "header-center">
                    <a href="/">
                        <img title = "Home" src= "/files/home.png" className="home-logo" alt="home" />
                    </a>
                    <a href="http://www.youtube.com">
                        <img title = "Marketplace" src= "/files/marketplace.png" className="market-logo" alt="market" />
                    </a>
                    <a href="http://www.facebook.com">
                        <img title = "Groups" src= "/files/groups.png" className="group-logo" alt="group" />
                    </a>
                </div>
                
                <div className= "header-right" title= "Profile" >
                    <div className = "header-links">
                        <img src= "/files/profile2.jpg" className="profile-pic" alt="profile"/>
                        <span className ="profile-name">{this.state.firstname + " " + this.state.lastname}</span>
                    </div>
                    <div className="Menu-links">
                        <div className = "Menu" title = "Menu">
                            <img src= "/files/Menu.png" className="Menu-icon" alt="Menu"/>
                        </div>
                        <div className = "Mail" title = "Messages">
                            <img src= "/files/Mail.png" className="Mail-icon" alt="Mail" />
                        </div>
                        <div className = "Notif" title = "Notifications">
                            <img src= "/files/Alarm.png" className="Alarm-icon" alt="Alarm" />
                        </div>
                        <div className = "Notif" title = "Logout">
                            <LogoutIcon className = "Logout-icon" onClick={this.props.logout}/>
                        </div>    
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Header