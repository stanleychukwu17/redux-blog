import {Link} from 'react-router-dom'
import './Header.css';

import {connect} from 'react-redux'

const Header = (props) => {
    console.log(props);
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

let mapStateToProps = (state) => {
    return {'logged_in': state.logged_in};
}
 
export default connect(mapStateToProps)(Header);