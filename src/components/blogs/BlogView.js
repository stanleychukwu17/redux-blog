import { useRef, useState } from 'react';
import { useQuery } from 'react-query';
import {useParams} from 'react-router-dom'
import './BlogView.css'

async function fecthOnlyThisBlog (id) {
    console.log(`http://localhost:8000/blogs/${id}`)
    const users = await fetch(`http://localhost:8000/blogs/${id}`);
    const fusers = users.json();
    return fusers;
}

function submitComment (obj) {
    console.log(obj)
}

const BlogView = (props) => {
    const {id} = useParams();
    let [comment, setComment] = useState('');

    const {data, isLoading} = useQuery(['one_blog', id], () => fecthOnlyThisBlog(id), {staleTime: 300000});

    return (
        <>
            {isLoading && <h2>Loading...</h2>}
            {data && (
                <>
                    <div className="Blvw_mjrC">
                        <div className="Blvw_th1"><h1>{data.title}</h1></div>
                        <div className="Blvw_tdts">{data.dts}</div>
                    </div>
                    <div>
                        <div className="it_fl Blvw_cb1"><h2>Comments</h2></div>
                        <div className="it_fl Blvw_cb2">
                            <div><textarea value={comment} onChange={(e) => {
                                setComment(e.target.value);
                            }}></textarea></div>
                            <div><button className="button_blue" onClick={(e) => {
                                submitComment({comment:comment.current});
                            }}>Post comment</button></div>
                        </div>
                        <div className="it_fl Blvw_cb3"><h2>33kc</h2></div>
                    </div>
                </>
            )}

        </>
    );
}
 
export default BlogView;