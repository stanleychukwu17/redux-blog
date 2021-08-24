import { useQueryClient } from "react-query";

const DisRegard = () => {
    const queryClient = useQueryClient();
    console.log('begin to loose the chains')
}

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
    },

    // sends the liking of a blog to the backend
    likeThisblog : (blog_id) => {
        fetch(`${bambi.back_end_url}/blogs/like-new-blog`, {
            mode: 'cors', method:"POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({blog_id})
        }).then(re => re.json()).then(re => {})
    },

    // invalidates a particular query handler so that react-query can reload the data
    invalidat_dis_react_query: function (wch) {
        DisRegard(wch)
    }
}

export default bambi;