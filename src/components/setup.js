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
        let jack, john;
        const url = window.location.search.split('&');
        const boxer = {};

        if (url.length <= 0) { return {} }
        url.forEach((ech) => {
            if (ech[0] === '?') { ech = ech.slice(1); }
            [jack, john] = ech.split('=');
            boxer[jack]=john;
        });

        return boxer
    }
}

export default bambi;