import {useState} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import setup from '../setup'
import './NewBlog.css'

function saveTheBlog ({title, content, uid}) {
    let snd, today, d, m, y;
    if (title.length <= 0) { alert('cannot submit your blog, your title is too short'); return; }
    if (content.length <= 0) { alert('cannot submit your blog, your blog content is too short'); return; }

    today = new Date();
    d = today.getDate(); m = today.getMonth(); y = today.getFullYear();
    today = `${d}-${m}-${y}`;
    snd = {uid, title, content, 'date_p': today};

    return fetch(`${setup.back_end_url}/blogs/new-blog`, {
        mode: 'cors', method:"POST", headers: {"Content-Type": "application/json"},
        body: JSON.stringify(snd)
    }).then(re => re.json())
}

// the component for saving a new blog
const NewBlog = (props) => {
    let [title, setTitle] = useState('');
    let [content, setContent] = useState('');
    let [blogSaved, setBlogSaved] = useState(false);
    let queryClient = useQueryClient();

    // if the user is not logged in, we re-direct to the logging page
    if (!props.logged_in) { return <Redirect to='/login' />; }
    if (blogSaved) {
        queryClient.invalidateQueries('all_blogs'); // invalidates the blogs loaded at the home page so that the new blogs can be loaded
        queryClient.invalidateQueries('getActivities'); // invalidates the activities on the side, so that new activities can be loaded
        return <Redirect to='/' />;
    }

    return (
        <div>
            <div className="Blgortp">Posting a new blog</div>
            <div className="BlgorCv">
                <div className="Nwbg_inps"><p>Title:</p> <p><input type="text" onChange={(e)=>{setTitle(e.target.value)}} value={title} /></p></div>
                <div className="Nwbg_inps"><p>Content:</p> <p><textarea onChange={(e)=>{setContent(e.target.value)}} value={content}></textarea></p></div>
            </div>
            <div className="BlgBtn"><button className="button_blue" onClick={() => {
                saveTheBlog({title, content, 'uid':props.uid}).then((re) => {
                    if (re.msg !== 'okay') { alert(re.cause); return; }
                    alert('New blog saved')
                    setBlogSaved(true)
                })
            }}>Save new blog</button></div>
        </div>
    );
}

let mapStateToProps = (state) => {
    return {'logged_in':state.logged_in, 'uid':state.udts.uid};
}

export default connect(mapStateToProps)(NewBlog);