import React from 'react'; 
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Navbar from '../components/Navbar'; 
import Search from '../components/Search';
import Postslist from '../components/Postslist';

import config from '../config';
import localStorage from '../utils/localStorage.js';

import '../assets/styles/pages/Profile.css';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        try {
            localStorage.reloadUserdata(); 
            localStorage.reloadSearchUser();
        } catch(e) {
            localStorage.deleteJwt();
            localStorage.deleteUser();
            this.props.history.push('/login');
        }
        this.state = {};
        this.searchUser = localStorage.getSearchUser();
        this.user = localStorage.getUser();
        this.posts = [];
        this.isFollowing = this.searchUser.followers.includes(this.user._id);
    }
    componentDidMount() {
        const URL = `${config.host_URL}/api/posts/${this.searchUser._id}`; 
        axios.get(URL)
            .then(response => {
                this.posts = response.data.body; 
                this.setState({});
            })
            .catch(err => console.log(err));
    }
    toggleFollow() {
        const config_ = {
            headers: { Authorization: `Bearer ${localStorage.getJwt()}` }
        }; 
        const bodyParameters = {
            uid: this.user._id, 
        };
        if(this.isFollowing) {
            const URL = `${config.host_URL}/api/users/unfollow/${this.searchUser._id}`
            axios.patch(URL, bodyParameters, config_)
                .then(() => window.location.reload())
                .catch(() => alert('Error'))
        } else {
            const URL = `${config.host_URL}/api/users/follow/${this.searchUser._id}`
            axios.patch(URL, bodyParameters, config_)
                .then(() => {
                    // Recargar la pagina 
                    this.render()
                })
                .catch(() => alert('Error'))
        }
    }
    editProfile() {
        this.props.history.push('/editprofile');
    }
    render() {
        return (
            <div className="homepage__content">
                <div className="left">
                    <Navbar />
                </div>
                <div className="middle">
                    <div className="middle--profile">
                        <div className="content__header">
                            <Link to="/">
                                <img className="arrowimg" src={config.images_URLs.arrow} alt="Prev" />
                            </Link>
                            <div className="userinfo">
                                <p className="userinfo__name">{`${this.searchUser.firstName} ${this.searchUser.lastName}`}</p>
                                <p className="userinfo__postscount">{`${this.posts.length} posts`}</p>
                            </div>
                        </div>
                        <div className="profilecontent">
                            <img 
                                src={this.searchUser.portraitURL || config.images_URLs.default_portrait} 
                                alt="Portrait image" 
                                className="portrait"
                            />
                            <div className="userprofile">
                                <div className="image_and_button">
                                    <img 
                                        src={this.searchUser.profileURL || config.images_URLs.default_profile} 
                                        alt="User's profile pictire" 
                                        className="userprofile__profilepicture"
                                    />
                                    {
                                        this.user._id === this.searchUser._id ? 
                                            <button className="followBtn" onClick={this.editProfile.bind(this)}>
                                                Edit
                                            </button> :
                                            <button className="followBtn" onClick={this.toggleFollow.bind(this)} >
                                                {
                                                    this.isFollowing ? 
                                                    "Unfollow" : 
                                                    "Follow"
                                                }
                                            </button>
                                    } 
                                </div>
                                <div className="userprofile__userinfo">
                                    <p className="userinfo__name">{`${this.searchUser.firstName} ${this.searchUser.lastName}`}</p>
                                    <p className="userprofile__username">{`@${this.searchUser.username}`}</p>
                                    <p className="userprofile__bio">{this.searchUser.bio}</p>
                                    <div className="userprofile__follows">
                                        <p className="follow">{`${this.searchUser.following.length} Following`}</p>
                                        <p className="userprofile__dot"> · </p>
                                        <p className="follow">{`${this.searchUser.followers.length} Followers`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Postslist className="postsList">
                            {this.posts}
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

const mapStateToProps = state => ({
    searchUser: state.searchUser,
    user: state.user,
    posts: state.posts,
});

export default connect(mapStateToProps, null)(Profile);