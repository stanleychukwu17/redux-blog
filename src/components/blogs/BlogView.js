import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'

import { BiLike } from "react-icons/bi";
import {BsTrash} from "react-icons/bs";

import setup from '../setup'
import './BlogView.css'

async function fecthOnlyThisBlog (id) {
    const blogs = await fetch(`${setup.back_end_url}/blogs/one-blog/${id}`);
    const fbg = await blogs.json();
    return fbg;
}

// for submitting of comments to the backend
function submitComment (obj, callBack) {
    fetch(`${setup.back_end_url}/blogs/makeComment/`, {mode:'cors', method:"POST", headers:{"Content-Type": "application/json"}, body: JSON.stringify(obj)})
    .then(re => re.json()).then(re => {
        callBack(re, 'last_guy_added')
    });
}

// deletes a comment from our database
function deleteComment (comId, userId) {
    fetch(`${setup.back_end_url}/blogs/deleteComment/`,{
        mode:'cors', method:"POST", headers:{"Content-Type": "application/json"}, body: JSON.stringify({comId, userId})
    }).then(re => re.json()).then(re => {});
}



const BlogComments = ({dts, owner, delF}) => {
    return (
        <div className="CmkOriCvr" data-id={dts._id}>
            <div className="Cmk1Cvr" id={dts._id}>
                <div className="CmkName">{dts.name}</div>
                <div className="CmkDts">{dts.comment}</div>
                {owner === dts.userId && <div className="CmTrash" onClick={() => {
                    deleteComment(dts._id, owner);
                    delF(dts._id);
                }}><BsTrash /></div>}
            </div>
            <div className="Cmk2Cvr"></div>
        </div>
    )
}

const BlogView = (props) => {
    const {id} = useParams();

    const [comment, setComment] = useState('');
    const [totComments, setTotComments] = useState(0);
    const [allComments, setAllComments] = useState([]);
    const [totLikes, setTotLikes] = useState(0);
    const queryClient = useQueryClient();

    // fetches the individual blog details
    const {data, isLoading} = useQuery(['one_blog', id], () => fecthOnlyThisBlog(id), {staleTime: 300000}); // 5 mintues of staletime

    // update compontent to show the loaded comments on this blog
    useEffect(() => {
        if (data) {
            setTotComments(data.dts.cdts.total)
            setAllComments(data.dts.cdts.comments)
            setTotLikes(data.dts.likes)
        }
    }, [data])

    // the useEfect below checks to see if the user wants to go straight to the comment section, and if a specific comment should be highlighted
    const urlComb = setup.get_url_queries();
    useEffect(() => {
        if (!data) { return false; }

        if (urlComb.toComment === 'yes' && document.getElementById('cmtSec')) {
            document.getElementById('cmtSec').focus();
        }
        if (urlComb.commentId?.length > 0) {
            const {commentId} = urlComb;
            const grab = document.getElementById(commentId);
            if (grab) {grab.classList.add('dothethang')}
        }
    }, [urlComb, data]);


    // for liking of the blog
    let likeBlog = (blogId) => {
        setTotLikes(c => c + 1);
        setup.likeThisblog(blogId);
    };

    // for updating the comments with the main one returned from the database
    const refreshComment = (dts, wch) => {
        if (wch === 'last_guy_added') {
            queryClient.invalidateQueries('getActivities'); // invalidates the activities on the side, so that new activities can be loaded
            setAllComments(c => {
                return [{'_id':dts._id, 'userId':dts.userId, 'name':props.username, 'comment':comment}, ...c]
            });
        }
    }

    // deletes a comment from the state of comments, filter the comments to remove the comment id received
    function delComment (cmId) {
        setAllComments(cmts => cmts.filter(arr => arr._id !== cmId));
    }

    return (
        <>
            {isLoading && <h2>Loading...</h2>}
            {data && (
                <>
                    <div className="Blvw_mjrC">
                        <div className="Blvw_th1"><h1>{data.dts.title}</h1></div>
                        <div className="Blvw_tdts">{data.dts.content}</div>
                        <div className="Blvw_lika">
                            <div className="it_fl" onClick={(ev) => likeBlog(data.dts._id)}><i><BiLike /></i></div>
                            <div className="it_rl">{totLikes} <i><BiLike /></i></div>
                        </div>
                    </div>
                    <div>
                        <div className="it_fl Blvw_cb1"><h2>Comments</h2></div>
                        <div className="it_fl Blvw_cb2">
                            <div><textarea id="cmtSec" value={comment} onChange={(e) => setComment(e.target.value) }></textarea></div>
                            <div><button className="button_blue" onClick={(e) => {
                                if (comment.length > 0) {
                                    setTotComments(c => c+1);
                                    submitComment({comment, id, 'userId':props.userId}, refreshComment);
                                    setComment('');
                                }
                            }}>Post comment</button></div>
                        </div>
                        <div className="it_fl Blvw_cb3"><h2>{totComments}kc</h2></div>
                    </div>

                    {/*for posting of comments */}
                    {allComments.length > 0 &&  <div className="CmkAtCvr"><h2>All comments</h2></div>}
                    {allComments.length > 0 && allComments.map(ech => {
                        return <BlogComments key={ech._id} dts={ech} owner={props.userId} delF={delComment} />
                    })}
                </>
            )}

        </>
    );
}

let mapStateToProps = state => {
    return {'userId':state.udts.uid, 'username':state.udts.username}
}

export default connect(mapStateToProps)(BlogView);