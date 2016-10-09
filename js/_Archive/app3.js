/*
  Please add all Javascript code to this file.
*/
// Article template
function renderArticleSummary(article){
    return `<article class="article">
      <section class="featuredImage">
        <img src="${article.image}" alt="${article.title}" />
      </section>
      <section class="articleContent">
          <a href="#"><h3>${article.display_title}</h3></a>
          <h6>${article.channel_label}</h6>
      </section>
      <section class="impressions">
        ${article.shares.total}
      </section>
      <div class="clearfix"></div>
    </article>
    `
}
// PopUp template
function renderFullArticle(article){
    return `<h1>${article.display_title}</h1>
    <p>
      ${article.content.plain}
    </p>
    <a href="${article.link}" class="popUpAction" target="_blank">Read more from source</a>
  `
}

// Article popUp info list
let state = {
    articles: []
    selectedSource: ''
}

// Get info
fetch('https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/stories.json')
.then( res => res.json())
// .then(data => data.hot[0].display_title)
// .then(data => console.log(data))
.then(data => data.hot)
// .then(articles => {
    // document.querySelector('#main').innerHTML = renderArticleSummary(article)
// )
.then(articles => {

    state.articles = articles

    let renderedArticles = []

    articles.forEach((article) => {
        renderedArticles.push(renderArticleSummary(article))
    })

    // console.log(renderedArticles.join('/n'))
    document.querySelector('#main').innerHTML = renderedArticles.join('\n')
})



// On click
document.querySelector('body').addEventListener('click', event => {
    let popUp = document.querySelector('#popUp')

    if (event.target.matches('h3')){
        console.log(event.target);
        popUp.classList.toggle('hidden')
        // console.log(popUp.classList);
        popUp.classList.remove('loader')
        console.dir(event.target.innerHTML); // we get the objects and it's properties
        console.log(state.articles);
        let article = state.articles.find(article => {//like for each
            return article.display_title === event.target.innerHTML
        })

        document.querySelector('#popUp .container').innerHTML = renderFullArticle(article)
    }

    if (event.target.matches('.closePopUp')) {
        popUp.classList.toggle('hidden')
    }

    if (event.target.matches('.nav-item')) {
        console.log(event.target);
        state.selectedSource = event.target.innerHTML // save our click to a state
        
    }
})
