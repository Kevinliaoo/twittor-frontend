import React, { useState } from 'react'; 
import axios from 'axios';

import config from '../config';
import localStorage from '../utils/localStorage.js';

import '../assets/styles/components/Post.css';

const Post = props => {
    const likeDiv = React.createRef();

    const uid = localStorage.getUser()._id;
    const isLiker = props.likes.includes(uid); 
    const dateRegex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\..*/;
    
    const [updateNow, setUpdateNow] = useState(true)
    const updateFunc = () => {
        setUpdateNow(!updateNow)
    }

    const getDateDifference = () => {
        const dateArray = dateRegex.exec(props.date);
        dateArray.shift(); 
        const integerDateArray = dateArray.map(d => parseInt(d));
        const today = new Date(); 
        const todayArray = [
            today.getFullYear(), 
            today.getMonth() + 1,   // January is 0
            today.getDate(), 
            today.getHours() + config.time_zone, 
            today.getMinutes(),
            today.getSeconds(),
        ];
        const time = [
            'years', 'months', 'days', 'hours', 'minutes', 'seconds'
        ];
        for(let i = 0; i < time.length; i ++) {
            const diff = todayArray[i] - integerDateArray[i]
            if(diff === 0) {
                continue;
            }
            if(diff === 1) {
                return `${diff} ${time[i].substring(0, time[i].length-1)}`
            }
            return `${diff} ${time[i]}`
        }
        return "now";
    }

    const goToPost = ev => {

    }

    const changeLikes = () => {
        // Visually change likes number in frontend

        const likeImage = likeDiv.current.childNodes[0]; 
        const likeNum = likeDiv.current.childNodes[1]; 

        const increment = () => {
            likeNum.innerText = likeNum.innerText + 1; 
            likeImage.src = config.images_URLs.like_red; 
        }

        const decrement = () => {
            likeNum.innerText = likeNum.innerText - 1; 
            likeImage.src = config.images_URLs.like; 
        }

        likeImage.src == config.images_URLs.like ? 
            increment() : decrement();
    }

    const likePost = ev => {
        changeLikes(); 

        const config_ = {
            headers: { Authorization: `Bearer ${localStorage.getJwt()}` }
        }; 
        const bodyParameters = {
            uid: uid 
        };
        let url; 
        if(isLiker) {
            url = `${config.host_URL}/api/posts/unlike/${props.postId}/${uid}`; 
        } else {
            url = `${config.host_URL}/api/posts/like/${props.postId}/${uid}`; 
        }
        axios.patch(url, bodyParameters, config_)
            .then(() => {
                updateFunc()
            })
            .catch(e => console.log(e));
    }
    // El contenido de cada post dsps lo tengo que cambiar cuando pueda hacer peticiones
    console.log('Rendering componet')
    return(
        <>
            <div className="postcontent">
                <div className="maincontent">
                    <div className="maincontent__image">
                        <img className="profilepicture" src={props.pictureURL}/>
                    </div>
                    <div className="separator">
                        <div className="maincontent__maindata">
                            <p className="name">{`${props.firstName} ${props.lastName}`}</p>
                            <p className="username">{`@${props.username} ·`}</p> 
                            <p className="time">{getDateDifference()}</p>
                        </div>  
                        <div className="maincontent__content">
                            {props.content}
                        </div>
                    </div>
                </div>
                <div className="postactions">
                    <div className="like" onClick={likePost} ref={likeDiv}>
                        <img 
                            src={
                                isLiker ? 
                                config.images_URLs.like_red : 
                                config.images_URLs.like
                            } 
                            alt="Like button" 
                        />
                        <p className="likesnumber" id="likesnumber">{props.likes.length}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

/**
 * Comments section
 * 
 * <div className="comment" onClick={goToPost}>
 *      <img src={config.images_URLs.comments} alt="Comment button" />
 *      <p className="commentsnumbers">{props.comments.length}</p>
 * </div>
 */

export default Post;