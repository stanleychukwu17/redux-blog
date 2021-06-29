import {Link} from 'react-router-dom'
import './Header.css';

const Header = (props) => {
    return (
        <div className="headerTop">
            <div className="it_fl header1">Stanlo blog</div>
            <div className="it_rl header2">
                <div className="it_fl"><Link to="/">Home</Link></div>
                <div className="it_fl"><Link to="/new_blog">New blog</Link></div>
                <div className="it_fl"><Link to="/login">Login</Link></div>
            </div>
        </div>
    );
}
 
export default Header;