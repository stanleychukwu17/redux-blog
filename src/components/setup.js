const bambi = {
    'back_end_url' : 'http://localhost:8080',

    // locks a button
    'frezeBtn' : (grab) => {
        grab.forEach(elem => {elem.setAttribute('disabled', true); elem.classList.add("disable_btn");})
    },

    // unlocks a button
    'unfrezeBtn' : (grab) => {
        grab.forEach(elem => { elem.removeAttribute('disabled'); elem.classList.remove("disable_btn"); })
    },

    get_url_queries : () => {
        const url = window.location.search.split('&')
        console.log(url)
    }
}

export default bambi;