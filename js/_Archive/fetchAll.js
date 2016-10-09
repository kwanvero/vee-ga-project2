export default function fetchAll(articleArray) {

    let url = ''
    let parse = x => x // identity , basic function

    switch (articleArray) {
        case 'Mashable':
            url = 'http://mashable.com/stories.json'
            parse = data => data.hot
            break;
        case 'Reddit':
            url = 'https://www.reddit.com/top.json'
            parse = data => data.data.children
            break;
        case 'Digg':
        default:
            url = 'http://digg.com/api/news/popular.json'
            parse = data => data.data.feed
    }

    // Get info
    return fetch(`https://accesscontrolalloworiginall.herokuapp.com/${url}`)
    .then(res => res.json())
    .then(parse)
    .catch(err => {
        console.log(err.message);
        document.querySelector('#popUp').remove('loader')
        document.querySelector('#main').innerHTML = `<h1>Error:</h1><h2>Source not available at this time</h2>`
    })
}
