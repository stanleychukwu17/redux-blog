export const update_likes = (obj) => {
    console.log(obj);
    console.log('we uptown boi!')
}

export function Hello ({increment}) {
    console.log('rendered');
    return <button onClick={increment}>Hello</button>
}