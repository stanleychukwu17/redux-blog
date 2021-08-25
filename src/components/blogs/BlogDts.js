import {useState} from 'react'
import { useQuery } from 'react-query';
import { Link, useHistory } from 'react-router-dom';

import setup from '../setup'
import './BlogDts.css';

// fetches the blog from backend
async function fecthBlogs () {
    const users = await fetch(`${setup.back_end_url}/blogs/all-blogs`);
    const fusers = users.json();
    return fusers;
}

// for each of the blogs returned from the server
function BlogEch ({inf}) {
    const [likes, setLikes] = useState(inf.likes);
    const history = useHistory();

    let L1 = `/BlogPage/${inf._id}`
    let L2 = `/BlogPage/${inf._id}?toComment=yes`

    const sendAmToComment = () => { history.push(L2); }

    return (
        <div className="BlgEch">
            <div className="Blgtop"><Link to={L1}>{inf.title}</Link></div>
            <div className="Blgtt2"><div className="it_fl">Author: {inf.author}</div> <div className="it_rl">{inf.date_p}</div></div>
            <div className="BlgInr">
                <div>{inf.content}</div>
                <div>
                    <div className="it_fl BlgcOvr">
                        <div className="it_fl"><img src="https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/like-512.png" alt="like" onClick={() => {
                            setLikes(c => c + 1);
                            setup.likeThisblog(inf._id)
                        }} /></div>
                        <div className="it_fl BlgcIcon" onClick={sendAmToComment}><img src="https://cdn2.iconfinder.com/data/icons/bitsies/128/Message-256.png" alt="" /></div>
                    </div>
                    <div className="it_rl BlgcStats"><div>{likes} likes</div> <div>{inf.comments} comments</div></div>
                </div>
            </div>
        </div>
    )
}

// the main parent container for both the search bar and the blogs
const BlogDts = (props) => {
    let {data, status} = useQuery('all_blogs', fecthBlogs, {staleTime:300000});

    return (
        <div className="dahlah">
            <div className="">
                <div className="it_fl Blghdr">Latest blogs</div>
                <div className="it_rl ">
                    <input type="text" placeholder="Search with title" />
                    <select><option value="">Sort blogs</option></select>
                </div>
            </div>
            <div className="">
                <div>{status !== 'success' ? <h2>{status}</h2> : ''}</div>
                {data && data.dts.map((inf) => <BlogEch key={inf._id} inf={inf} />)}
            </div>
        </div>
    );
}
 
export default BlogDts;