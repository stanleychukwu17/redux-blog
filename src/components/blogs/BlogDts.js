import {useState} from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import './BlogDts.css';

async function fecthBlogs () {
    const users = await fetch('http://localhost:8000/blogs');
    const fusers = users.json();
    return fusers;
}

function BlogEch ({inf}) {
    let [likes, setLikes] = useState('');
    let [comments, setComments] = useState('');

    let link_to = `/BlogPage/${inf.id}`

    return (
        <div className="BlgEch">
            <div className="Blgtop"><Link to={link_to}>{inf.title}</Link></div>
            <div className="Blgtt2"><div className="it_fl">Author: {inf.author}</div> <div className="it_rl">{inf.date_p}</div></div>
            <div className="BlgInr">
                <div>{inf.dts}</div>
                <div>
                    <div className="it_fl BlgcOvr">
                        <div className="it_fl"><img src="https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/like-512.png" alt="" /></div>
                        <div className="it_fl BlgcIcon"><img src="https://cdn2.iconfinder.com/data/icons/bitsies/128/Message-256.png" alt="" /></div>
                    </div>
                    <div className="it_rl BlgcStats"><div>{likes} likes</div> <div>{comments} comments</div></div>
                </div>
            </div>
        </div>
    )
}

const BlogDts = (props) => {
    let {data, status} = useQuery('all_blogs', fecthBlogs);

    return (
        <div className="dahlah">
            <div className="">
                <div className="it_fl Blghdr">Latest blogs</div>
                <div className="it_rl ">
                    <input type="text" placeholder="Search with title" /> <select><option value="">Sort blogs</option></select>
                </div>
            </div>
            <div className="">
                <div>{status !== 'success' ? <h2>{status}</h2> : ''}</div>
                {data && data.map((inf) => <BlogEch key={inf.id} inf={inf} />)}
            </div>
        </div>
    );
}
 
export default BlogDts;