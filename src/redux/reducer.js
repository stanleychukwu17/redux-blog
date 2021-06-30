const initialState = {
    'logged_in':false, 'logged_in_page_open':false,
    'udts':{},
    'all_users':[]
};

export const main_reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGGED_IN' : return {...state}
        case 'USER_IN_LOGGING_PAGE' : {
            return {...state, 'logged_in_page_open':action.payload}
        }
        case 'USER_HAS_LOGGED_IN' : {
            return {...state, 'logged_in':true, 'udts':action.payload}
        }
        default : return state
    }
}