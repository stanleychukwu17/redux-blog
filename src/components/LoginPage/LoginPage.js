import {useState, useEffect} from 'react'
import {connect} from 'react-redux'


import {userInLogginPage} from '../../redux/actions'
import './LoginPage.css'

const LoginPage = (props) => {
    let userInLogginPage = props.userInLogginPage;
    let [uLog, setULog] = useState('');
    let [pLog, setPLog] = useState('');

    let login = async (event) => {
        let users = await fetch('http://localhost:8000/users')
        let fusers = await users.json()

        console.log(fusers);
        let inIt = fusers.some(obj => {
            console.log(obj);
            return (uLog === obj.name && pLog === obj.password);
        });

        console.log(uLog, pLog, inIt);
    }

    useEffect(() => {
        userInLogginPage();
    }, [userInLogginPage]);

    return (
        <div className="LogBoss">
            <div className="it_fl LogBamCvr">
                <div className="LogDkn">Already a user, then Sign in</div>
                <div>
                    <div className="LogDinp"><p>Username</p> <p><input type="text" value={uLog} onChange={(e)=>setULog(e.target.value.trim())} /></p></div>
                    <div className="LogDinp"><p>Password</p> <p><input type="password" value={pLog} onChange={(e)=>setPLog(e.target.value.trim())} /></p></div>
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