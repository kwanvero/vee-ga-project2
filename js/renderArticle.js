export default function renderArticle(selectedSource, article) {

    let render = x => `` // identity , basic function

    switch (selectedSource) {
        case 'Mashable':
            render = (article) => { return `<article class="article">
              <section class="featuredImage">
                <img src="${article.image}" alt="${article.display_title}" />
              </section>
              <section class="articleContent">
                  <a href="#"><h3 id="${article._id}">${article.display_title}</h3></a>
                  <h6>${article.channel_label}</h6>
              </section>
              <section class="impressions">
                ${article.shares.total}
              </section>
              <div class="clearfix"></div>
            </article>
            `}
            break;
        case 'Reddit':
            render = (article) => {

            if (article.data.thumbnail === `default` || article.data.thumbnail === `self`) {
                article.data.thumbnail = `./images/default.gif`
            }

            return `<article class="article">
            <section class="featuredImage">
              <img src="${article.data.thumbnail}" alt="${article.data.title}" />
            </section>
            <section class="articleContent">
                <a href="#"><h3 id="${article.data.id}">${article.data.title}</h3></a>
                <h6>${article.data.subreddit}</h6>
            </section>
            <section class="impressions">
              ${article.data.ups}
            </section>
            <div class="clearfix"></div>
          </article>
            `}
            break;
        case 'Digg':
        default:
            render = (article) => {

            let tagList = []
            let i = 0
             article.content.tags.forEach(tag => {
                 tagList.push(article.content.tags[i].display)
                 i++
             })

            let tags = tagList.join(', ')

            return `<article class="article">
            <section class="featuredImage">
              <img src="${article.content.media.images[0].url}" alt="${article.content.title}" />
            </section>
            <section class="articleContent">
                <a href="#"><h3 id="${article.content.slug_id}">${article.content.title_alt}</h3></a>
                <h6>${tags}</h6>
            </section>
            <section class="impressions">
              ${article.digg_score}
            </section>
            <div class="clearfix"></div>
          </article>
            `}
    }

    return render(article)
}
