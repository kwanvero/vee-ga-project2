/*
  Please add all Javascript code to this file.
*/

import fetchArticles from './fetchArticles'
import renderArticle from './renderArticle'
import {renderPopUp, articleId} from './renderPopUp'

// Article popUp info list - State
let state = {
  articles: [],
  selectedSource: ''
}

let selector = {
  main: document.querySelector('#main'),
  sourceName: document.querySelector('#sourceName'),
  popUp: document.querySelector('#popUp'),
  closeButton: document.querySelector('.closePopUp')
}

// On click
document.querySelector('body').addEventListener('click', event => {
  // Reload page
  if (event.target.matches('#pageLogo')) {
    window.location.reload()
  }
  // Select Source
  if (event.target.matches('.nav-item')) {
    selector.popUp.classList.add('loader')
    selector.closeButton.classList.add('hidden')
    selector.popUp.classList.toggle('hidden')
    state.selectedSource = event.target.innerHTML // save our click to a state
    fetchArticles(state.selectedSource) // I give you my state selected source, gimme my articles
    .then(articles => {
      state.articles = articles // push them into my object
      console.log(articles)
    }).then(() => {
      let articleList = []
      state.articles.forEach(article => {
        articleList.push(renderArticle(state.selectedSource, article))
      })
      console.log(articleList)
      selector.main.innerHTML = articleList.join('\n')
      selector.sourceName.innerHTML = state.selectedSource
      selector.popUp.classList.toggle('hidden')
    })
  }

  // Popup Display
  if (event.target.matches('h3')) {
    selector.popUp.classList.toggle('hidden')
    selector.popUp.classList.remove('loader')
    selector.closeButton.classList.remove('hidden')

    if (selector.sourceName.innerHTML === 'Select Source') {
      state.articles.find(content => {
          selector.popUp.classList.add('loader')
          if (event.target.id === content.id) {
              state.selectedSource = content.source
              fetchArticles(state.selectedSource)
              .then(compareSource => {
                  let article = compareSource.find(article => { // like for each
                    return articleId(state.selectedSource, article) === event.target.id
                  })
                  console.log(article);
                  document.querySelector('#popUp .container').innerHTML = renderPopUp(state.selectedSource, article)
                  selector.popUp.classList.remove('loader')
              })
          }
      })
  } else {
      let article = state.articles.find(article => { // like for each
        return articleId(state.selectedSource, article) === event.target.id
      })
      console.log(article);
      document.querySelector('#popUp .container').innerHTML = renderPopUp(state.selectedSource, article)
    }
  }

  // Close Popup
  if (event.target.matches('.closePopUp')) {
    selector.popUp.classList.toggle('hidden')
  }

  // Search
  if (event.target.matches('.searchIcon') || event.target.matches('.searchIcon img')) {
    document.querySelector('#search').classList.toggle('active')
  }
})

let Mashable = 'Mashable'
let Reddit = 'Reddit'
let Digg = 'Digg'

// let sortByTitle = function (a, b) {
//   if (a.title < b.title) {
//     return -1
//   }
//   if (a.title > b.title) {
//     return 1
//   }
//   return 0
// }

let sortByDate = function (a, b) {
  if (a.timeStamp < b.timeStamp) {
    return -1
  }
  if (a.timeStamp > b.timeStamp) {
    return 1
  }
  return 0
}

selector.popUp.classList.add('loader')
selector.closeButton.classList.add('hidden')
selector.popUp.classList.toggle('hidden')
fetchArticles(Mashable)
.then(mashContentList => {
  mashContentList.forEach(content => {
    state.articles.push({source: Mashable, id: content._id, title: content.title, timeStamp: Date.parse(content.post_date) / 1000, markUp: renderArticle(Mashable, content)})
  })
})
.then(() => fetchArticles(Digg))
.then(diggContentList => {
  diggContentList.forEach(content => {
    state.articles.push({source: Digg, id: content.content.slug_id, title: content.content.title, timeStamp: content.date, markUp: renderArticle(Digg, content)})
  })
})
.then(() => fetchArticles(Reddit))
.then(redditContentList => {
  redditContentList.forEach(content => {
    state.articles.push({source: Reddit, id: content.data.id, title: content.data.title, timeStamp: content.data.created, markUp: renderArticle(Reddit, content)})
  })
})
.then(() => {
  state.articles.sort(sortByDate)
})
.then(() => {
  let articleList = []
  let i = 0
  state.articles.forEach(article => {
    articleList.push(state.articles[i].markUp)
    i++
  })
  selector.main.innerHTML = articleList.join('\n')
  selector.popUp.classList.toggle('hidden')
})
