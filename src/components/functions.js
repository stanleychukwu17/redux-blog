
export const update_likes = async (obj) => {
    let {blogId, ev} = obj;

    ev.target.style.visibility = 'hidden';
    let dts = await fetch('http://localhost:8000/likes/').then(re => re.json());

    let new_likes = dts[0].total_likes + 1;

    console.log(dts[0], new_likes);

    let del = await fetch(`http://localhost:8000/likes/${dts[0].id}`, {method: 'DELETE'})

    let upd = await fetch('http://localhost:8000/likes/', {
        method: 'POST', headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({'total_likes': new_likes})
    });

    ev.target.style.visibility = 'visible';
}