import React, {Component} from "react";
import axios from 'axios';

const api = axios.create({
  baseURL:'http://localhost:3000',
})

class App extends Component {
  state = {
    newPostContent:"",
    posts:[],
  }
  
async componentDidMount(){
  const {data:posts} = await api.get("/posts");
  this.setState({posts});
}

  handlePostSave = async(e) => {
    e.preventDefault();
    const {data: post} = await api.post("/posts", {content:this.state.newPostContent});
    this.setState({posts:[...this.state.posts, post], newPostContent:""});
  };

  render(){
    return (
      <div className="App">
          <form onClick={this.handlePostSave}>
            <textarea 
              onChange={e => this.setState({newPostContent:e.target.value})}
              value={this.state.newPostContent}        
            />
            <button type="submit">Post</button>
          <ul>
            {this.state.posts.map(post => (
              <li key={post.id}>{post.content}</li>
            ))}
            <li>Teste1</li>
            <li>Teste2</li>
          </ul>
          </form>
      </div>
    );
  }
  
}

export default App;
