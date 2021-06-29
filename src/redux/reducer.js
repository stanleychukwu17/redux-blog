const initialState = {
    'logged_in':false, 'logged_in_page_open':false
};

export const main_reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGGED_IN' : return {...state}
        case 'USER_IN_LOGGING_PAGE' : {
            console.log('man go soon open the page')
            return state
        }
        default : return state
    }
}