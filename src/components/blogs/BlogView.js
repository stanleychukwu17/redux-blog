import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'

import { BiLike } from "react-icons/bi";
import {BsTrash} from "react-icons/bs";

import {newLike4BlogAdded} from '../../redux/actions'

import setup from '../setup'
import './BlogView.css'

async function fecthOnlyThisBlog (id) {
    const blogs = await fetch(`${setup.back_end_url}/blogs/one-blog/${id}`);
    const fbg = await blogs.json();
    return fbg;
}

// for submitting of comments to the backend
function submitComment (obj, callBack) {
    fetch(`${setup.back_end_url}/blogs/makeComment/`, {
        mode:'cors', method:"POST", headers:{"Content-Type": "application/json"},
        body: JSON.stringify(obj)
    }).then(re => re.json()).then(re => {
        callBack(re, 'last_guy_added')
    });
}


const BlogComments = ({dts}) => {
    return (
        <div className="CmkOriCvr">
            <div className="Cmk1Cvr">
                <div className="CmkName">{dts.name}</div>
                <div className="CmkDts">{dts.comment}</div>
                <div className="CmTrash"><BsTrash /></div>
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

    // fetches the indivial blog details
    const {data, isLoading} = useQuery(['one_blog', id], () => fecthOnlyThisBlog(id), {staleTime: 300000}); // 5 mintues of staletime

    // update the state of the comments when the data(i.e the)
    useEffect(() => {
        if (data) {
            setTotComments(data.dts.cdts.total)
            setAllComments(data.dts.cdts.comments)
        }
    }, [data])

    // for liking of the blog
    let likeBlog = (ev) => {
        props.newLike4BlogAdded({'add_new':true, 'ev':ev});
        // updateLikes({'add_new':true, 'ev':ev, 'newLike4BlogAdded':props.newLike4BlogAdded})
    };

    // the useEfect below checks to see if there user wants to go straight to the comment section
    const urlComb = setup.get_url_queries();
    useEffect(() => {
        if (urlComb.toComment === 'yes' && document.getElementById('cmtSec')) {
            document.getElementById('cmtSec').focus();
        }
    }, [urlComb]);

    // for updating the comments with the main one returned from the database
    const refreshComment = (dts, wch) => {
        if (wch === 'last_guy_added') {
            setAllComments(c => {
                return [{'id':dts._id, 'name':props.username, 'comment':comment}, ...c]
            });
        }
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
                            <div className="it_fl" onClick={(ev) => likeBlog(ev)}><i><BiLike /></i></div>
                            <div className="it_rl">{data.dts.likes} <i><BiLike /></i></div>
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
                        return <BlogComments key={ech._id} dts={ech} />
                    })}
                </>
            )}

        </>
    );
}

let mapStateToProps = state => {
    return {'userId':state.udts.uid, 'username':state.udts.username}
}

let mapDispatchToProps = dispatch => {
    return {newLike4BlogAdded : (cur_lks) => dispatch(newLike4BlogAdded(cur_lks))}
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogView);