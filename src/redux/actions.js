export const userLoggedIn = (user_id) => {
    return {'type': 'USER_LOGGED_IN', 'payload':user_id}
}

export const userInLogginPage = (wch) => ({'type': 'USER_IN_LOGGING_PAGE', 'payload':wch});

export const userHasLoggedIn = (udts) => ({'type': 'USER_HAS_LOGGED_IN', 'payload':udts});

export const userHasLoggedOut = () => ({'type': 'USER_HAS_LOGGED_OUT'});