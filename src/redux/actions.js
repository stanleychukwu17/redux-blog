import setup from '../components/setup'

export const userLoggedIn = (user_id) => ({'type': 'USER_LOGGED_IN', 'payload':user_id})

export const userInLogginPage = (wch) => ({'type':'USER_IN_LOGGING_PAGE', 'payload':wch});

export const userHasLoggedIn = (udts) => ({'type':'USER_HAS_LOGGED_IN', 'payload':udts});

export const userHasLoggedOut = (udts) => {
    window.localStorage.clear();

    fetch(`${setup.back_end_url}/users/logout`, {
        mode:'cors', method:"POST", headers:{"Content-Type": "application/json"},
        body: JSON.stringify({"uid":udts.uid, "hash":udts.hash})
    });

    return {'type':'USER_HAS_LOGGED_OUT'}
};

export const newLike4BlogAdded = (obj) => {
    return (dispatch) => {
    }
};