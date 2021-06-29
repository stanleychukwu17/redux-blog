import './NewBlog.css'

const NewBlog = (props) => {
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

export default NewBlog;