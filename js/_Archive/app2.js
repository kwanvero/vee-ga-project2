/*
  Please add all Javascript code to this file.
*/

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

function renderFullArticle(article){
    return `<h1>Article title here</h1>
    <p>
      Article description/content here.
    </p>
    <a href="#" class="popUpAction" target="_blank">Read more from source</a>
  `
}


let state = {
    articles: []
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


    let renderedArticles = []

    articles.forEach((article) => {
        renderedArticles.push(renderArticleSummary(article))
    })

    // console.log(renderedArticles.join('/n'))
    document.querySelector('#main').innerHTML = renderedArticles.join('\n')
})



// On click
document.querySelector('body').addEventListener('click', event => {
    if (event.target.matches('article')){
        console.log(event.target);
        let popUp = document.querySelector('#popUp')
        popUp.classList.toggle('hidden')
        // console.log(popUp.classList);
        popUp.classList.remove('loader')
    }
})
