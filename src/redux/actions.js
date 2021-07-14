export const userLoggedIn = (user_id) => {
    return {'type': 'USER_LOGGED_IN', 'payload':user_id}
}

export const userInLogginPage = (wch) => ({'type': 'USER_IN_LOGGING_PAGE', 'payload':wch});

export const userHasLoggedIn = (udts) => ({'type': 'USER_HAS_LOGGED_IN', 'payload':udts});

export const userHasLoggedOut = () => ({'type': 'USER_HAS_LOGGED_OUT'});

export const newLike4BlogAdded = (obj) => {
    return (dispatch) => {
        let likes = 0;
        if (obj.add_new) { obj.ev.target.style.visibility = 'hidden'; }
    
        fetch('http://localhost:8000/likes/').then(re => re.json()).then(re => {
            likes = re[re.length - 1].total_likes;
            if (obj.add_new) { likes += 1; }
    
            dispatch({'type': 'NEW_LIKE_4_BLOG_ADDED', 'payload':likes});
    
            fetch('http://localhost:8000/likes/', {
                method: 'POST', headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({'total_likes': likes})
            });
        });
    
        if (obj.add_new) { obj.ev.target.style.visibility = 'visible'; }

    }
};