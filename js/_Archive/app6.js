

// import add from './math'

// import {add, subtract} from './math'

// import math, {add, subtract} from './math' // default thin mainly going to use

// console.log(add(1,2));
// console.log(subtract(1,2));
// math()

// fetchArticles(Mashable)
// .then(articles => {
//     state.articles = articles
//     console.log(articles);
// }).then(() => {
//      let articleList = []
//      state.articles.forEach(article => {
//          articleList.push(renderArticle(Mashable, article))
//      })
//      selector.main.innerHTML = articleList.join('\n')
//  })

//  function articles() {
//     // let articleList = []
//     fetchArticles(Mashable)
//     .then(data => {
//         state.articles = data
//     }).then(content => console.log(content))
//     // fetchArticles(Reddit)
//     // fetchArticles(Digg)
// }
//
// fetchArticles(Mashable)
// .then(data => {
//     state.articles = data
//     let articleList = []
//     state.articles.forEach(article => {
//          articleList.push(data)
//     })
//     console.log(data)
//     console.log(articleList)
// })


// function articles(){
//     let articleList = []
//     return fetchArticles(Mashable)
//     .then(contentList => {
//         return contentList.forEach(content => {
//             state.articles.push(content)
//         })
//     })
//     // .then(data => console.log(data))
//     // return articleList
//     console.log(articleList);
// }


// console.log(mashContentList);
// state.articles.title.sort()
let i = 0
console.log(state.articles);
state.articles.forEach(content => {
    state.markUp.push(state.articles[i].markUp)
    // console.log(state.articles[i].markUp);
    i++
})
// mashContentList.forEach(content => {
//     state.articles.push(renderArticle(Mashable, content))
// })





let sortByTitle = function (a,b) {
    if ( a.title < b.title ){
        return -1;
    }
    if ( a.title > b.title ){
        return 1;
    }
    return 0;
}

let sortByDate = function (a,b) {
    if ( a.title < b.title ){
        return -1;
    }
    if ( a.title > b.title ){
        return 1;
    }
    return 0;
}

fetchArticles(Mashable)
.then(mashContentList => {

    // console.log(mashContentList);

    mashContentList.forEach(content => {
        state.articles.push({source: Mashable, title: content.title, timeStamp: Date.parse(content.post_date), markUp: renderArticle(Mashable, content)})
    })

    // let sorting = state.articles.sort(contentSorting)
    //
    // console.log(sorting)

    // selector.main.innerHTML = state.articles.join('\n')
})
.then(digg => fetchArticles(Digg))
.then(diggContentList => {
    diggContentList.forEach(content => {
        state.articles.push({source: Digg, title: content.content.title, timeStamp: content.date, markUp: renderArticle(Digg, content)})
    })
    // console.log(diggContentList);
    // console.log(state.articles);
})
.then(reddit => fetchArticles(Reddit))
.then(redditContentList => {
    redditContentList.forEach(content => {
        state.articles.push({source: Reddit, title: content.data.title, timeStamp: content.data.created, markUp: renderArticle(Reddit, content)})
    })
    // console.log(redditContentList);
    // console.log(state.articles);
    // selector.main.innerHTML = state.articles.join('\n')
})
.then (sort => {
    let sorting = state.articles.sort(sortByDate)
    console.log(sorting)
    // selector.main.innerHTML = state.articles.join('\n')
})
