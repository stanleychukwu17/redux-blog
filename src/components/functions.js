
export const updateLikes = (obj) => {
    let likes = 0;
    if (obj.add_new) { obj.ev.target.style.visibility = 'hidden'; }

    fetch('http://localhost:8000/likes/').then(re => re.json()).then(re => {
        if (obj.add_new) { likes = re[0].total_likes + 1; }
        else { likes = re[0].total_likes; }

        console.log(likes);
        fetch(`http://localhost:8000/likes/${re[0].id}`, {method: 'DELETE'})

        fetch('http://localhost:8000/likes/', {
            method: 'POST', headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({'total_likes': likes})
        });
    });

    if (obj.add_new) { obj.ev.target.style.visibility = 'visible'; }
}