const NewBlog = (props) => {
    return (
        <div>
            <div>Posting a new blog</div>
            <div>
                <div class=""><p>Title:</p> <p><input type="text" /></p></div>
                <div><p>Author:</p> <p><input type="text" /></p></div>
                <div><p>Content:</p> <p><input type="text" /></p></div>
            </div>
            <div><button>Save new blog</button></div>
        </div>
    );
}

export default NewBlog;