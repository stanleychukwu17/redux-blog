import {Link} from 'react-router-dom'
import './Header.css';

import {connect} from 'react-redux'

const Header = (props) => {
    let wch_link = '';
    console.log(props);

    if (props.logged_in) { wch_link = <a href="/logout" onClick={LogoutUser}>Logout</a>  }
    else { wch_link = <Link to="/login">Login</Link>  }

    return (
        <div className="headerTop">
            <div className="it_fl header1">Stanlo blog</div>
            <div className="it_rl header2">
                <div className="it_fl"><Link to="/">Home</Link></div>
                <div className="it_fl"><Link to="/new_blog">New blog</Link></div>
                <div className="it_fl">{wch_link}</div>
            </div>
        </div>
    );

    function LogoutUser (event) {
        console.log(event);
        event.preventDefault();
    }
}

let mapStateToProps = (state) => {
    return {'logged_in': state.logged_in};
}

let mapDispatchToProps = (dispatch) => {
    return {'logout': () => dispatch()}
}
 
export default connect(mapStateToProps)(Header);