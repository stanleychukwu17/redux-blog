import { useQuery } from 'react-query';

import './BlogDts.css';

async function fecthBlogs () {
    const users = await fetch('http://localhost:8000/blogs');
    const fusers = users.json();
    return fusers;
}

function BlogEch ({inf}) {
    return (
        <div className="BlgEch">
            <div className="Blgtop">{inf.title}</div>
            <div className="Blgtt2"><div className="it_fl">Author: {inf.author}</div> <div className="it_rl">2 days ago</div></div>
            <div className="BlgInr">
                <div>{inf.dts}</div>
                <div>
                    <div className="it_fl BlgcOvr">
                        <div className="it_fl"><img src="https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/like-512.png" alt="" /></div>
                        <div className="it_fl BlgcIcon"><img src="https://cdn2.iconfinder.com/data/icons/bitsies/128/Message-256.png" alt="" /></div>
                    </div>
                    <div className="it_rl BlgcStats"><div>30 likes</div> <div>20 comments</div></div>
                </div>
            </div>
        </div>
    )
}

const BlogDts = (props) => {
    let {data, status} = useQuery('all_blogs', fecthBlogs);

    return (
        <div className="dahlah">
            <div className="Blghdr">Latest blogs</div>
            <div className="">
                <div>{status !== 'success' ? <h2>{status}</h2> : ''}</div>
                {data && data.map((inf) => <BlogEch key={inf.id} inf={inf} />)}
            </div>
        </div>
    );
}
 
export default BlogDts;