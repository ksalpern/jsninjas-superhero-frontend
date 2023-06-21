import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

import { Hero } from "../components/Hero";

export const FullHero = () => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/heros/${id}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("failed to get heroes");
      });
  }, []);

  if (isLoading) {
    return <Hero isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Hero
        id={data._id}
        nickName={data.nickName}
        realName={data.realName}
        description={data.description}
        catchPhrase={data.catchPhrase}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.description} />
      </Hero>
    </>
  );
};
