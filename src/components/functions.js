import React from 'react'

export const update_likes = (obj) => {
    console.log(obj);
    console.log('we uptown boi!')
}

export const Hello = React.memo(({increment}) => {
    console.log('rendered');
    return <button onClick={increment}>Hello</button>
})