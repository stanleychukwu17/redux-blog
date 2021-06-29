import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
import './NewBlog.css'

const NewBlog = (props) => {
    console.log(props);
    // if the user is not logged in, we re-direct to the logging page
    if (!props.logged_in) {
        return <Redirect to='/login' />;
    }

    return (
        <div>
            <div className="Blgortp">Posting a new blog</div>
            <div className="BlgorCv">
                <div className="Nwbg_inps"><p>Title:</p> <p><input type="text" /></p></div>
                <div className="Nwbg_inps"><p>Author:</p> <p><select><option value="">Stanley</option></select></p></div>
                <div className="Nwbg_inps"><p>Content:</p> <p><textarea></textarea></p></div>
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