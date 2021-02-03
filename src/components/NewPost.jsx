import React from 'react'; 
import axios from 'axios';

import config from '../config';
import localStorage from '../utils/localStorage';

import '../assets/styles/components/NewPost.css';

class NewPost extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {};
        this.user = localStorage.getUser() || {};
    }

    componentDidMount() {
        const twitButton = document.getElementById('twitbutton'); 
        twitButton.disabled = true;
        twitButton.style.backgroundColor = config.colors.disabledButton;
    }

    handleClick() {
        const input = document.getElementById('content__input'); 
        const user = localStorage.getUser();
        const jwt = localStorage.getJwt()
        const config_ = {
            headers: { Authorization: `Bearer ${jwt}` }
        }; 
        const bodyParameters = {
            uid: user._id, 
            content: input.value
        };
        const URL = `${config.host_URL}/api/posts/`;
        axios.post(URL, bodyParameters, config_)
            .then(res => {
                input.value = ""; 
                alert('New post posted');
            })
            .catch(e => console.log(e))
    }

    handleTextarea() {
        const textarea = document.getElementById('content__input'); 
        const twitButton = document.getElementById('twitbutton'); 
        if(textarea.value.length > 0) {
            twitButton.disabled = false;
            twitButton.style.backgroundColor = config.colors.enabledButton;
        } else {
            twitButton.disabled = true;
            twitButton.style.backgroundColor = config.colors.disabledButton;
        }
    }

    render() {
        return (
            <div className="newpost">
                <div className="newpost__content">
                    <img 
                        className="newpost__profilepic" 
                        src={this.user.profileURL || config.images_URLs.default_profile} 
                        alt="Profile picture" 
                    />
                    <textarea 
                        className = "content__input" 
                        id = "content__input"
                        type = "text" 
                        placeholder = "What do you want to say?"
                        onChange = {this.handleTextarea}
                    />
                </div>
                <div className="buttons">
                    <button id="twitbutton" className="twitbutton" onClick={this.handleClick.bind(this)}>
                        Twit
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    jwt: state.jwt,
    user: state.user,
})

export default NewPost;