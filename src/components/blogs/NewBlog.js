import {useState} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
import { useQuery } from 'react-query';
import './NewBlog.css'

async function fecthUsers () {
    let users = await fetch('http://localhost:8000/users');
    let fusers = users.json();
    return fusers;
}

function saveTheBlog ({title, author, dts, setBlogSaved}) {
    let snd, today, d, m, y;
    if (title.length <= 0) { alert('cannot submit your blog, your title is too short'); return; }
    if (author.length <= 0) { alert('cannot submit your blog, your author name is too short'); return; }
    if (dts.length <= 0) { alert('cannot submit your blog, your blog content is too short'); return; }

    today = new Date();
    d = today.getDate(); m = today.getMonth(); y = today.getFullYear();
    today = `${d}-${m}-${y}`;
    snd = {title, author, dts, 'date_p': today};

    return fetch('http://localhost:8000/blogs', {
        method: 'POST', headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(snd)
    }).then(re => {
        console.log(re);
        alert('New blog saved');
        setBlogSaved(true)
    })
}

const NewBlog = (props) => {
    let [title, setTitle] = useState('');
    let [author, setAuthor] = useState('1');
    let [dts, setDts] = useState('');
    let [blogSaved, setBlogSaved] = useState(false);
    let {data, status} = useQuery('users', fecthUsers, {staleTime : 1000000})

    // if the user is not logged in, we re-direct to the logging page
    if (!props.logged_in) { return <Redirect to='/login' />; }
    if (blogSaved) { return <Redirect to='/' />; }

    return (
        <div>
            <div className="Blgortp">Posting a new blog</div>
            <div className="BlgorCv">
                <div className="Nwbg_inps"><p>Title:</p> <p><input type="text" onChange={(e)=>{setTitle(e.target.value)}} value={title} /></p></div>
                <div className="Nwbg_inps">
                    <p>Author:</p>
                    <p>
                        <select onChange={(e)=>{setAuthor(e.target.value)}} value={author}>{
                            status === 'success' && data.map(itm => <option key={itm.id} value={itm.id}>{itm.name}</option>)
                        }</select>
                    </p>
                </div>
                <div className="Nwbg_inps"><p>Content:</p> <p><textarea onChange={(e)=>{setDts(e.target.value)}} value={dts}></textarea></p></div>
            </div>
            <div className="BlgBtn"><button className="button_blue" onClick={() => {
                saveTheBlog({title, author, dts, setBlogSaved})
            }}>Save new blog</button></div>
        </div>
    );
}

let mapStateToProps = (state) => {
    return {'logged_in':state.logged_in}
}

export default connect(mapStateToProps)(NewBlog);