
export const update_likes = async (obj) => {
    let {blogId, ev} = obj;

    ev.target.style.visibility = 'hidden';
    let dts = await fetch('http://localhost:8000/likes/1').then(re => re.json());
    ev.target.style.visibility = 'visible';

    console.log(dts);
}