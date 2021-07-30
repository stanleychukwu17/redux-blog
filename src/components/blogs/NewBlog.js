import {useState} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
import './NewBlog.css'

function saveTheBlog ({title, dts, setBlogSaved}) {
    let snd, today, d, m, y;
    if (title.length <= 0) { alert('cannot submit your blog, your title is too short'); return; }
    if (dts.length <= 0) { alert('cannot submit your blog, your blog content is too short'); return; }

    today = new Date();
    d = today.getDate(); m = today.getMonth(); y = today.getFullYear();
    today = `${d}-${m}-${y}`;
    snd = {title, dts, 'date_p': today};

    console.log(snd, 'we are sending this man to the moon');
    // return fetch('http://localhost:8000/blogs', {
    //     method: 'POST', headers: { 'Content-Type': 'application/json'},
    //     body: JSON.stringify(snd)
    // }).then(re => {
    //     alert('New blog saved');
    //     setBlogSaved(true)
    // })
}

const NewBlog = (props) => {
    let [title, setTitle] = useState('');
    let [dts, setDts] = useState('');
    let [blogSaved, setBlogSaved] = useState(false);

    // if the user is not logged in, we re-direct to the logging page
    if (!props.logged_in) { return <Redirect to='/login' />; }
    if (blogSaved) { return <Redirect to='/' />; }

    return (
        <div>
            <div className="Blgortp">Posting a new blog</div>
            <div className="BlgorCv">
                <div className="Nwbg_inps"><p>Title:</p> <p><input type="text" onChange={(e)=>{setTitle(e.target.value)}} value={title} /></p></div>
                <div className="Nwbg_inps"><p>Content:</p> <p><textarea onChange={(e)=>{setDts(e.target.value)}} value={dts}></textarea></p></div>
            </div>
            <div className="BlgBtn"><button className="button_blue" onClick={() => {
                saveTheBlog({title, dts, setBlogSaved})
            }}>Save new blog</button></div>
        </div>
    );
}

let mapStateToProps = (state) => {
    return {'logged_in':state.logged_in}
}

export default connect(mapStateToProps)(NewBlog);