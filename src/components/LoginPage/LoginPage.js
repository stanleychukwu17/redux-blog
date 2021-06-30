import {useState, useEffect} from 'react'
import {connect} from 'react-redux'


import {userInLogginPage} from '../../redux/actions'
import './LoginPage.css'

const LoginPage = (props) => {
    let userInLogginPage = props.userInLogginPage;
    let [uLog, setULog] = useState('');
    let [pLog, setPLog] = useState('');

    let login = (event) => {
        console.log(uLog, pLog, 'time to loggin in new brather!');
    }

    useEffect(() => {
        userInLogginPage();
    }, [userInLogginPage]);

    return (
        <div className="LogBoss">
            <div className="it_fl LogBamCvr">
                <div className="LogDkn">Already a user, then Sign in</div>
                <div>
                    <div className="LogDinp"><p>Username</p> <p><input type="text" value={uLog} onChange={(e)=>setULog(e.target.value)} /></p></div>
                    <div className="LogDinp"><p>Password</p> <p><input type="password" value={pLog} onChange={(e)=>setPLog(e.target.value)} /></p></div>
                    <div className="LogDBtn"><button onClick={login} className="button_blue">Done, Sign-in</button></div>
                </div>
            </div>
            <div className="it_fl LogBamCvr">
                <div className="LogDkn">New user, then join our community</div>
                <div>
                    <div className="LogDinp"><p>Username</p> <p><input type="text" /></p></div>
                    <div className="LogDinp"><p>Password</p> <p><input type="password" /></p></div>
                    <div className="LogDBtn"><button className="button_blue">Register</button></div>
                </div>
            </div>
        </div>
    );
}

let mapDispatchToProps = (dispatch) => {
    return {'userInLogginPage':() => dispatch(userInLogginPage())}
}
 
export default connect(null, mapDispatchToProps)(LoginPage);