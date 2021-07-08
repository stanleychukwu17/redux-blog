import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {userHasLoggedOut} from '../../redux/actions'
import './Header.css';

const Header = (props) => {
    let wch_link = '';

    if (props.logged_in) { wch_link = <a href="/" onClick={LogoutUser}>Logout</a>  }
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
        props.userHasLoggedOut();
        event.preventDefault();
        window.localStorage.clear();
    }
}

let mapStateToProps = (state) => {
    return {'logged_in': state.logged_in};
}

let mapDispatchToProps = (dispatch) => {
    return {'userHasLoggedOut': () => dispatch(userHasLoggedOut())}
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Header);