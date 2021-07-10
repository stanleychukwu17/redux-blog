
export const update_likes = async (obj) => {
    let {blogId, ev} = obj;

    ev.target.style.visibility = 'hidden';
    let dts = await fetch('http://localhost:8000/likes/1').then(re => re.json());
    ev.target.style.visibility = 'visible';

    let new_likes = dts.total_likes + 1;

    console.log(dts, new_likes);

    fetch('http://localhost:8000/likes/1', {method: 'DELETE'})

    fetch('http://localhost:8000/likes/', {
        method: 'POST', headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({'id':1, 'total_likes': new_likes})
    })
}