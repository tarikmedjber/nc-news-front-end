import React from "react";
import "./articles.css";
import ArticleCard from "./ArticleCard";
export default function ArticleList(props) {
  const { articles } = props;
  return articles.map((article, i) => {
    return <ArticleCard article={article} />;
  });
}

//extract the div out and create a new page of single article and call that new page here
