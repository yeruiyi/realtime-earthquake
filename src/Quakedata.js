import React, {Component} from 'react';
class QuakeData extends Component {
    render(){
        const {post} = this.props
        return(
            <tr>
                <td>{post.properties.mag}</td>
                <td><a href={post.properties.url}>{post.properties.place}</a></td>
            </tr>    
        )
    }
}

export default QuakeData;