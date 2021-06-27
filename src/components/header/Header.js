const Header = (props) => {
    return (
        <div>
            <div className="it_fl">Stanlo blog</div>
            <div className="it_rl">
                <div><a href="/">Home</a></div>
                <div><a href="new">New blog</a></div>
                <div><a href="Login">Login</a></div>
            </div>
        </div>
    );
}
 
export default Header;