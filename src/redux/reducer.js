let initialState = {
    'logged_in':false, 'logged_in_page_open':false, 'udts':{}, 'likes':0,
    'all_users':[]
};

// gets the localStorage details, we want to know if the user is already logged in
let kamil = window.localStorage.getItem('logged_in_dts');
if (kamil != null) {
    kamil = JSON.parse(kamil);
    initialState = {...initialState, logged_in:kamil.logged_in, 'udts':kamil.udts};
}

export const main_reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGGED_IN' : return {...state}
        case 'USER_IN_LOGGING_PAGE' : {
            return {...state, 'logged_in_page_open':action.payload}
        }
        case 'USER_HAS_LOGGED_IN' : {
            return {...state, 'logged_in':true, 'udts':action.payload}
        }
        case 'USER_HAS_LOGGED_OUT' : {
            return {...state, 'logged_in':false}
        }
        case 'NEW_LIKE_4_BLOG_ADDED' : {
            return {...state, 'likes':action.payload}
        }
        default : return state
    }
}