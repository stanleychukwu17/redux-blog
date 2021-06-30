const initialState = {
    'logged_in':false, 'logged_in_page_open':false, 'all_users':[]
};

async function get_users () {
    let users = await fetch('http://localhost:8000/users')
    let fusers = await users.json()

    initialState.all_users = fusers;
}
get_users();


export const main_reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGGED_IN' : return {...state}
        case 'USER_IN_LOGGING_PAGE' : {
            return {...state, 'logged_in_page_open':true}
        }
        default : return state
    }
}