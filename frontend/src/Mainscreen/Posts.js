import React from 'react'
import './Posts.css'
class Posts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userid: localStorage.getItem("userid"),  
            posts: [],
            friendslist: [], 
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
                this.setState({ friendslist: body.friendslist});
            })
        
        fetch('http://localhost:3001/postFindall')
            .then(response => response.json())
            .then(body => {
                this.setState({posts: body});
            })
    }
    
    render() {
        let postlist = [];
        const posts = this.state.posts;
        for (let i = 0; i < posts.length; i++) {
           if (this.state.friendslist.includes(posts[i].userid) || posts[i].userid === this.state.userid){
                
                postlist.push(posts[i])
           }
        }
        postlist = postlist.reverse();
        
        
        
        return(
            <div>
                <div className='posts'>
                    <ul className = 'postslist'>
                        {
                        postlist.map((post, index) => {
                            
                            const date = new  Date(post.createdAt);
                            const options = {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                              };
                            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

                            return(
                                <div className = "postpadding" key = {index} >
                                    <li className = "post" value={post._id} > 
                                        <div className = 'postname'>
                                            <img className = "postphoto" src="/files/profile.jpg" alt = ""/> 
                                            {post.author} 
                                            <div className = "deleteORupdate">
                                                <button id = 'button'className = "delete" type="button" onClick={() =>{
                                                    const click = document.getElementsByClassName('post')
                                                    if(post.userid !== this.state.userid){
                                                        alert("Failed to delete post");
                                                    }else{
                                                        fetch(
                                                            "http://localhost:3001/deletePost",
                                                            {
                                                              method: "POST",
                                                              headers: {
                                                                "Content-Type": "application/json"
                                                              },
                                                              body: JSON.stringify({id:  `${click.Value}`})
                                                            })
                                                            .then(response => response.json())
                                                            .then(body => {
                                                              if (body.success) { 
                                                                alert("Successfully deleted post"); 
                                                                window.location.reload()
                                                            }
                                                              else { alert("Failed to delete post"); }
                                                            });
                                                        }      
                                                    }
                                                }>
                                                <label className = "deletelabel">Delete</label>
                                                </button> 

                                            
                                            </div>
                                        </div>
                                        <label className = "timestamp">{formattedDate}</label>   
                                        <hr/>
                                        <div className = "content">
                                            {post.content} 
                                        </div>                                   
                                    </li>
                                    
                                </div> 
                            )       
                        })
                        }  
                    </ul>
                </div>          
            </div>
        )
    }
}

export default Posts