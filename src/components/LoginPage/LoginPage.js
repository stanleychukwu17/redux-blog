import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'


import {userInLogginPage, userHasLoggedIn} from '../../redux/actions'
import './LoginPage.css'

const LoginPage = (props) => {
    let history = useHistory();
    let userInLogginPage = props.userInLogginPage;
    let [uLog, setULog] = useState('');
    let [pLog, setPLog] = useState('');
    let [newUser, setNewUser] = useState('');
    let [newPass, setNewPass] = useState('');

    useEffect(() => {
        if (!props.logged_in) userInLogginPage(true);
    }, []);

    // if the use is logged_in, then no need to see this page
    if (props.logged_in) history.go(-1);
    if (props.logged_in) { return (<div className=""></div>); }

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
                    <div className="LogDBtn"><button onClick={register} className="button_blue">Register</button></div>
                </div>
            </div>
        </div>
    );

    async function login (event) {
        let users = await fetch('http://localhost:8000/users')
        let fusers = await users.json()

        // checks to see if the user matches any of the users in the datatbase
        let inIt = fusers.some(obj => (uLog === obj.name && pLog === obj.password));
        let udts = fusers.filter(obj => (uLog === obj.name && pLog === obj.password));

        if (inIt) {
            props.userInLogginPage(false);
            props.userHasLoggedIn(udts);
            window.sessionStorage.setItem('logged_in_dts', JSON.stringify({'logged_in':'yes', 'udts':udts[0]}));
            history.go(-1);
        }
    }

    function register () {
        console.log('we on it fam!');
    }
}

let mapStateToProps = (state) => {
    return {'logged_in': state.logged_in}
}

let mapDispatchToProps = (dispatch) => {
    return {
        'userInLogginPage':(wch) => dispatch(userInLogginPage(wch)),
        'userHasLoggedIn':(udts) => dispatch(userHasLoggedIn(udts))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);