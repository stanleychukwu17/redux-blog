import {connect} from 'react-redux'
import './NewBlog.css'

const NewBlog = (props) => {
    console.log(props);
    return (
        <div>
            <div className="Blghdr">Posting a new blog</div>
            <div className="BlgorCv">
                <div className="Nwbg_inps"><p>Title:</p> <p><input type="text" /></p></div>
                <div className="Nwbg_inps"><p>Author:</p> <p><input type="text" /></p></div>
                <div className="Nwbg_inps"><p>Content:</p> <p><input type="text" /></p></div>
            </div>
            <div className="BlgBtn"><button className="button_blue">Save new blog</button></div>
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        'logged_in':state.logged_in
    }
}

export default connect(mapStateToProps)(NewBlog);