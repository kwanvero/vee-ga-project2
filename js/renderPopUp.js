// PopUp title
export function articleId(selectedSource, article) {
    let selectedArticle = x => ``

    switch (selectedSource) {
        case 'Mashable':
            selectedArticle = (article) => {
                return `${article._id}`
            }
            break;
        case 'Reddit':
            selectedArticle = (article) => {
                return `${article.data.id}`
            }
            break;
        case 'Digg':
        default:
            selectedArticle = (article) => {
                return `${article.content.slug_id}`
            }
    }

    return selectedArticle(article)
}


// PopUp template
export function renderPopUp(selectedSource, article) {
    let popUpRender = x => ``

    switch (selectedSource) {
        case 'Mashable':
            popUpRender = (article) => {
                return `<h1>${article.display_title}</h1>
                <p>
                  ${article.content.plain}
                </p>
                <a href="${article.link}" class="popUpAction" target="_blank">Read more from source</a>
              `
            }
            break;
        case 'Reddit':
            popUpRender = (article) => {
                return `<h1>${article.data.title}</h1>
                <p>
                  Author: ${article.data.author}
                </p>
                <a href="http://www.reddit.com${article.data.permalink}" class="popUpAction" target="_blank">Read more from source</a>
              `
            }
            break;
        case 'Digg':
        default:
            popUpRender = (article) => {
                return `<h1>${article.content.title}</h1>
                <h2>${article.content.kicker}</h2>
                <p>
                  ${article.content.description}
                </p>
                <a href="${article.content.original_url}" class="popUpAction" target="_blank">Read more from source</a>
              `
            }
    }
    
    return popUpRender(article)
}
