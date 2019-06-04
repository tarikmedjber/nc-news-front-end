import axios from "axios";

const articlesURL = "https://nc-news-web.herokuapp.com/api";

export const getArticles = props => {
  return axios.get(`${articlesURL}/articles`).then(({ data: { articles } }) => {
    return articles;
  });
};
export const getArticleById = article_id => {
  return axios
    .get(`${articlesURL}/articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    });
};
