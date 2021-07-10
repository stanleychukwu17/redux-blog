import {useState} from 'react'

export const UpdateLikes = async (obj) => {
    let [likes, setLikes] = useState(0);

    if (obj.add_new) { obj.ev.target.style.visibility = 'hidden'; }
    let dts = await fetch('http://localhost:8000/likes/').then(re => re.json());

    if (obj.add_new) { setLikes(dts[0].total_likes + 1); }
    else { setLikes(dts[0].total_likes) }

    fetch(`http://localhost:8000/likes/${dts[0].id}`, {method: 'DELETE'})

    fetch('http://localhost:8000/likes/', {
        method: 'POST', headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({'total_likes': likes})
    });

    if (obj.add_new) { obj.ev.target.style.visibility = 'visible'; }

    console.log(likes);
    // return {likes}
}