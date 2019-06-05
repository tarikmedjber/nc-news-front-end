import axios from "axios";

const url = "https://nc-news-web.herokuapp.com/api";

export const getArticles = params => {
  return axios
    .get(`${url}/articles`, { params })

    .then(({ data: { articles } }) => {
      return articles;
    });
};
export const getArticleById = article_id => {
  return axios
    .get(`${url}/articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    });
};

export const getTopics = props => {
  return axios.get(`${url}/topics`).then(({ data: { topics } }) => {
    return topics;
  });
};

export const getComments = article_id => {
  return axios
    .get(`${url}/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const getUsers = username => {
  return axios.get(`${url}/users/${username}`).then(({ data: { user } }) => {
    return user;
  });
};
