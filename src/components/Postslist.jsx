import React from 'react'; 
import { connect } from 'react-redux';

import config from '../config';
import Post from './Post';

import '../assets/styles/components/Postslist.css';

const Postslist = props => {

    return(
        props.children ? 
        <div className="content">
            {
                props.children.reverse().map(p => {
                    return (
                        <Post 
                            pictureURL = {p.uid.profileURL || config.images_URLs.default_profile}
                            firstName = {p.uid.firstName}
                            lastName = {p.uid.lastName}
                            username = {p.uid.username}
                            content = {p.content}
                            likes = {p.likes} 
                            comments = {p.comments}
                            date = {p.date}
                            postId = {p._id}
                        />
                    )
                })
            }
        </div> : 
        ""
    )
}

const mapStateToProps = state => ({
    posts: state.posts, 
})

export default connect(mapStateToProps, null)(Postslist); 