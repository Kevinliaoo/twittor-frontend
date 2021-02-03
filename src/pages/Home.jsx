import React from 'react'; 
import { connect } from 'react-redux';
import axios from 'axios';

import Postslist from '../components/Postslist';
import NewPost from '../components/NewPost';
import Navbar from '../components/Navbar';
import Search from '../components/Search';

import localStorage from '../utils/localStorage.js'
import config from '../config';

import '../assets/styles/pages/Home.css'

class Home extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {}; 
        try {
            localStorage.reloadUserdata(); 
        } catch(e) {
            this.props.history.push('/login');
        }
    }
    async componentDidMount() {
        if(!localStorage.getJwt()) {
            this.props.history.push('/login');
        }
        this.followingPosts = await this.getAllPosts(); 
        this.setState({});
    }

    async getAllPosts() {
        const userFollow = (localStorage.getUser() || {}).following;
        if (!userFollow) return;
        let allPosts = [];
        for(let uid of userFollow) {
            const URL = `${config.host_URL}/api/posts/${uid}`; 
            const response = await axios.get(URL)
            allPosts = allPosts.concat(response.data.body)
        }
        return allPosts;
    }

    render() {
        return(
            <div className="homepage__content">
                <div className="left">
                    <Navbar />
                </div>
                <div className="middle">
                    <NewPost />
                    <Postslist>
                        {this.followingPosts}
                    </Postslist>
                </div>
                <div className="right">
                    <Search>
                        {this.props}
                    </Search>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts, 
        user: state.user,
        jwt: state.jwt,
    }
}

const mapDispatchesToProps = dispatch => ({
    loadPostsRequest(payload) {
        dispatch({
            type: 'LOAD_POSTS_REQUEST',
            payload
        })
    }, 
}); 

export default connect(mapStateToProps, mapDispatchesToProps)(Home); 