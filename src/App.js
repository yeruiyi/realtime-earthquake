import './App.css';
import React, {Component} from 'react';
import axios from 'axios';
import QuakeData from './Quakedata.js';
class App extends Component{
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount(){
      axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02')
          .then(response =>{
              console.log(response)
              this.setState({
                  posts : response.data.features
              },()=>console.log(this.state.posts.features))
          })
          .catch(error =>{
              console.log(error)
              this.setState({
                  error : 'Error retrieving data'
              })
          })
    }

    render() {
      const{posts,error} = this.state
      return(
        <div>
        <table id="earthquakes">
            <thead>
                <tr>
                    <th></th>
                    <th>Magnitude</th>
                    <th>Place</th>
                </tr>
            </thead>
            <tbody>

            {posts.length ?
            posts.map(post=><QuakeData key={post.id} post={post} ></QuakeData>):
            null}

            </tbody>
        </table>
        </div>
         
      )
    }
}

export default App;
