import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import { BiLike } from "react-icons/bi";

import {newLike4BlogAdded} from '../../redux/actions'

import setup from '../setup'
import './BlogView.css'

async function fecthOnlyThisBlog (id) {
    const blogs = await fetch(`${setup.back_end_url}/blogs/one-blog/${id}`);
    const fbg = await blogs.json();
    return fbg;
}

function submitComment (obj) { console.log(obj) }

const BlogView = (props) => {
    const {id} = useParams();
    let [comment, setComment] = useState('');
    let urlComb = setup.get_url_queries(this);

    const {data, isLoading} = useQuery(['one_blog', id], () => fecthOnlyThisBlog(id), {staleTime: 300000}); // 5 mintues of staletime

    let likeBlog = (ev) => {
        props.newLike4BlogAdded({'add_new':true, 'ev':ev});
        // updateLikes({'add_new':true, 'ev':ev, 'newLike4BlogAdded':props.newLike4BlogAdded})
    };

    useEffect(() => {
        if (urlComb.toComment === 'yes' && document.getElementById('cmtSec')) {
            document.getElementById('cmtSec').focus();
        }
    }, [urlComb]);

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
                                submitComment({comment, 'blogId':id});
                            }}>Post comment</button></div>
                        </div>
                        <div className="it_fl Blvw_cb3"><h2>33kc</h2></div>
                    </div>
                    <div className="CmkAtCvr">All comments</div>
                    <div>
                        <div className="CmkOriCvr">
                            <div className="Cmk1Cvr">
                                <div className="CmkName">Stanley</div>
                                <div className="CmkDts">This president i wont lie is a big mess.. i can't imagine where we got him from</div>
                            </div>
                            <div className="Cmk2Cvr"></div>
                        </div>
                    </div>
                </>
            )}

        </>
    );
}

let mapStateToProps = state => {
    return {'userId':state.udts.id}
}

let mapDispatchToProps = dispatch => {
    return {newLike4BlogAdded : (cur_lks) => dispatch(newLike4BlogAdded(cur_lks))}
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogView);