import './NewBlog.css'

const NewBlog = (props) => {
    return (
        <div>
            <div className="tTopOvr">Posting a new blog</div>
            <div>
                <div className="Nwbg_inps"><p>Title:</p> <p><input type="text" /></p></div>
                <div className="Nwbg_inps"><p>Author:</p> <p><input type="text" /></p></div>
                <div className="Nwbg_inps"><p>Content:</p> <p><input type="text" /></p></div>
            </div>
            <div><button>Save new blog</button></div>
        </div>
    );
}

export default NewBlog;