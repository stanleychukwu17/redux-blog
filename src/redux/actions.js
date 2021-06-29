export const userLoggedIn = (user_id) => {
    return {type: 'USER_LOGGED_IN', payload:user_id}
}

export const userInLogginPage = () => ({type: 'USER_IN_LOGGING_PAGE'});