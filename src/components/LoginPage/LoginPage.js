import {useEffect} from 'react'
import {connect} from 'react-redux'
import {userInLogginPage} from '../../redux/actions'

const LoginPage = (props) => {
    useEffect(() => {
        props.userInLogginPage();
    }, []);

    return (
        <div>
            <button>click me</button>
        </div>
    );
}

let mapDispatchToProps = (dispatch) => {
    return {'userInLogginPage':() => dispatch(userInLogginPage())}
}
 
export default connect(null, mapDispatchToProps)(LoginPage);