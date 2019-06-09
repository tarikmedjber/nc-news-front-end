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

export const getTopics = () => {
  return axios.get(`${url}/topics`).then(({ data: { topics } }) => {
    return topics;
  });
};

export const getComments = article_id => {
  return axios
    .get(`${url}/articles/${article_id}/comments?order=desc`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const getUser = username => {
  return axios.get(`${url}/users/${username}`).then(({ data: { user } }) => {
    return user;
  });
};

export const postComment = (article_id, body) => {
  return axios
    .post(`${url}/aicles/${article_id}/comments`, body)
    .then(({ data: { comment } }) => {
      return comment;
    });
};

export const deleteComment = comment_id => {
  return axios.delete(`${url}/comments/${comment_id}`).then(res => {
    return res;
  });
};

export const updateArticleVotes = (article_id, direction) => {
  return axios
    .patch(`${url}/articles/${article_id}`, direction)
    .then(({ data: { article } }) => {
      return article;
    });
};

export const updateCommentVotes = (comment_id, direction) => {
  return axios
    .patch(`${url}/comments/${comment_id}`, direction)
    .then(({ data: { comment } }) => {
      return comment;
    });
};
