const initialState = {
    'logged_in':'no'
};

export const main_reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGGED_IN' : return {...state}
        default : return state
    }
}