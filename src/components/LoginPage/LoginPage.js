import {useEffect} from 'react'
import {connect} from 'react-redux'


import {userInLogginPage} from '../../redux/actions'
import './LoginPage.css'

const LoginPage = (props) => {
    useEffect(() => {
        props.userInLogginPage();
    }, []);

    return (
        <div>
            <div className="it_fl">
                <div>Already a user, then Sign in</div>
                <div>

                </div>
            </div>
            <div className="it_fl">
                <div>New user, Register here!</div>
                <div>

                </div>
            </div>
        </div>
    );
}

let mapDispatchToProps = (dispatch) => {
    return {'userInLogginPage':() => dispatch(userInLogginPage())}
}
 
export default connect(null, mapDispatchToProps)(LoginPage);