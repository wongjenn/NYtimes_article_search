$(document).ready(addFormEventHandler)

function addFormEventHandler(){
  $('.js--search-form').submit(handleFormSubmit)
}

function handleFormSubmit(event){
  event.preventDefault()
  findAndRenderArticles()
}

function findAndRenderArticles() {
  const URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
  const APIKEY = "2acca949e80543aeb7a50158de38ceb0"
  let $input = $('input#query')
  let userInput = $input.val()
  let $input1 = $('input#query1')
  let startDate = $input1.val()
  let $input2 = $('input#query2')
  let endDate = $input2.val()
  let query = userInput
  let dateQuery = `${startDate}&=${endDate}`
  $input.val('')
  $input1.val('')
  $input2.val('')
    debugger
  $.ajax({
    url: `${URL}?api-key=${APIKEY}&q=${query}&=${dateQuery}`,
    success: renderArticles
  })
}

function renderArticles(data){
  let articleList = $('.js--articles-list')
  let articles = data.response.docs
  articleList.html("")


  function renderArticle(article){
    let title = article.headline.main
    let snippet = article.snippet
    let web_url = article.web_url
    articleList.append(`<li><strong>${title}</strong><br>${snippet}<br>
      <a href="${web_url}" target="_blank">see article</a> <br></li><hr>`)
  }

  articles.forEach(renderArticle)
}
