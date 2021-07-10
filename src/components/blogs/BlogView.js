import { useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import { BiLike } from "react-icons/bi";

import {update_likes} from '../functions'
import './BlogView.css'

async function fecthOnlyThisBlog (id) {
    const users = await fetch(`http://localhost:8000/blogs/${id}`);
    const fusers = users.json();
    return fusers;
}

function submitComment (obj) {
    console.log(obj)
}

const BlogView = (props) => {
    const {id} = useParams();
    let userId = props.userId;
    let [comment, setComment] = useState('');
    let [likes, setLikes] = useState(0);

    const {data, isLoading} = useQuery(['one_blog', id], () => fecthOnlyThisBlog(id), {staleTime: 300000}); // 5 mintues of staletime


    let likeBlog = useCallback((ev) => {
        setLikes(c => c+1);
        update_likes({'blogId':id, 'ev':ev})
        
    }, [])

    return (
        <>
            {isLoading && <h2>Loading...</h2>}
            {data && (
                <>
                    <div className="Blvw_mjrC">
                        <div className="Blvw_th1"><h1>{data.title}</h1></div>
                        <div className="Blvw_tdts">{data.dts}</div>
                        <div className="Blvw_lika">
                            <div className="it_fl" onClick={(ev) => likeBlog(ev)}><i><BiLike /></i></div>
                            <div className="it_rl">{likes} <i><BiLike /></i></div>
                        </div>
                    </div>
                    <div>
                        <div className="it_fl Blvw_cb1"><h2>Comments</h2></div>
                        <div className="it_fl Blvw_cb2">
                            <div><textarea value={comment} onChange={(e) => setComment(e.target.value) }></textarea></div>
                            <div><button className="button_blue" onClick={(e) => {
                                submitComment({comment, userId, 'blogId':id});
                            }}>Post comment</button></div>
                        </div>
                        <div className="it_fl Blvw_cb3"><h2>33kc</h2></div>
                    </div>
                </>
            )}

        </>
    );
}

let mapStateToProps = state => {
    return {'userId':state.udts.id}
}

export default connect(mapStateToProps)(BlogView);