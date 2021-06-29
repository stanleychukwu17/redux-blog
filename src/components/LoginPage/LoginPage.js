import {useEffect} from 'react'
import {connect} from 'react-redux'


import {userInLogginPage} from '../../redux/actions'
import './LoginPage.css'

const LoginPage = (props) => {
    useEffect(() => {
        props.userInLogginPage();
    }, []);

    return (
        <div className="LogBoss">
            <div className="it_fl LogBamCvr">
                <div className="LogDkn">Already a user, then Sign in</div>
                <div>
                    <div><p>Username</p> <p><input type="text" /></p></div>
                    <div><p>Password</p> <p><input type="password" /></p></div>
                    <div><button className="button_blue">Done, Sign-in</button></div>
                </div>
            </div>
            <div className="it_fl LogBamCvr">
                <div className="LogDkn">New user, then join our community</div>
                <div>
                    <div><p>Username</p> <p><input type="text" /></p></div>
                    <div><p>Password</p> <p><input type="password" /></p></div>
                    <div><button className="button_blue">Register</button></div>
                </div>
            </div>
        </div>
    );
}

let mapDispatchToProps = (dispatch) => {
    return {'userInLogginPage':() => dispatch(userInLogginPage())}
}
 
export default connect(null, mapDispatchToProps)(LoginPage);