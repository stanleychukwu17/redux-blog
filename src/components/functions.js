
export const update_likes = async (obj) => {
    let {blogId, ev} = obj;

    ev.target.style.display = 'none';
    let dts = await fetch('http://localhost:8000/likes/1').then(re => re.json());
    ev.target.style.display = 'block';

    console.log(dts);
}