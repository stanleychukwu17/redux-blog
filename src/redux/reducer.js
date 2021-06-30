const initialState = {
    'logged_in':false, 'logged_in_page_open':false, 'all_users':[]
};

export const main_reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGGED_IN' : return {...state}
        case 'USER_IN_LOGGING_PAGE' : {
            return {...state, 'logged_in_page_open':action.payload}
        }
        default : return state
    }
}