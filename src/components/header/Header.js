import './Header.css';

const Header = (props) => {
    return (
        <div className="headerTop">
            <div className="it_fl header1">Stanlo blog</div>
            <div className="it_rl">
                <div class="it_fl"><a href="/">Home</a></div>
                <div class="it_fl"><a href="new">New blog</a></div>
                <div class="it_fl"><a href="Login">Login</a></div>
            </div>
        </div>
    );
}
 
export default Header;