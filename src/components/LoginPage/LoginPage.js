/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'

import setup from '../setup'
import {userInLogginPage, userHasLoggedIn} from '../../redux/actions'
import './LoginPage.css'

const back_end_url = setup.back_end_url;

function chk_info ([uchk, pchk]) {
    if (uchk.length <= 1 || pchk.length <= 1) { return false; } else { return true; }
}

// function for registering a new user
async function register ([newUser, newPass]) {
    // checks to see if the username or password is okay to be saved
    if (!chk_info([newUser, newPass])) { alert('the length of your username or password might be too short');  return false; }

    // locks all the buttons on this page
    setup.frezeBtn(document.querySelectorAll('button'))

    try {
        let send = await fetch(`${back_end_url}/users/register`, {
            mode: 'cors', method:"POST", headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"username": newUser, "password":newPass})
        });
        let dts = await send.json()

        setup.unfrezeBtn(document.querySelectorAll('button')); // unlocks all the buttons on this page
        return dts
    } catch (err) {
        setup.unfrezeBtn(document.querySelectorAll('button')); // unlocks all the buttons on this page
        return {msg:'bad', 'cause':err}
    }
}

async function login ([user, pass]) {
    // checks to see if the username or password is okay to be saved
    if (!chk_info([user, pass])) { alert('the length of your username or password might be too short'); return false; }

    let send = await fetch(`${back_end_url}/users/login`, {
        mode:'cors', method:"POST", headers:{"Content-Type": "application/json"},
        body: JSON.stringify({"username":user, "password":pass})
    });

    return send.json()
}

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
    if (props.logged_in) history.push('/');
    if (props.logged_in) { return (<div className=""></div>); }

    return (
        <div className="LogBoss">
            <div className="it_fl LogBamCvr">
                <div className="LogDkn">Already a user, then Sign in</div>
                <div>
                    <div className="LogDinp"><p>Username</p> <p><input type="text" value={uLog} onChange={(e)=>setULog(e.target.value.trim())} /></p></div>
                    <div className="LogDinp">
                        <p>Password</p>
                        <p>
                            <input type="password" value={pLog}
                                onChange={(e)=>setPLog(e.target.value.trim())}
                                onKeyDown={(e)=>{
                                    if (e.key === 'Enter') { inChk([uLog, pLog]); }
                                }}
                            />
                        </p>
                    </div>
                    <div className="LogDBtn"><button onClick={() => inChk([uLog, pLog])} className="button_blue">Done, Sign-in</button></div>
                </div>
            </div>
            <div className="it_fl LogBamCvr">
                <div className="LogDkn">New user, then join our community</div>
                <div>
                    <div className="LogDinp"><p>Enter your username</p> <p><input type="text" value={newUser} onChange={(e)=>setNewUser(e.target.value.trim())} /></p></div>
                    <div className="LogDinp"><p>New password</p> <p><input type="password" value={newPass} onChange={(e)=>setNewPass(e.target.value)} /></p></div>
                    <div className="LogDBtn"><button onClick={() => {
                        register([newUser, newPass]).then(re => {
                            if (re.msg === 'okay') {
                                inChk([newUser, newPass]);
                            } else {
                                alert(`Error: ${re.cause}`);
                            }
                        })
                    }} className="button_blue">Register</button></div>
                </div>
            </div>
        </div>
    );

    async function inChk ([user, pass]) {
        login([user, pass]).then(re => {
            console.log(re);

            // if (inIt) {
            //     props.userInLogginPage(false);
            //     props.userHasLoggedIn(udts);
            //     window.localStorage.setItem('logged_in_dts', JSON.stringify({'logged_in':'yes', 'udts':udts[0]}));
            //     history.go(-1);
            // } else {
            //     alert('Invalid username or password received'); return false;
            // }
        });
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