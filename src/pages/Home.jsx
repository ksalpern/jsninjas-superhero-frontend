import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";

import { Hero } from "../components/Hero";
import { fetchHeros } from "../redux/slices/heros";

export const Home = () => {
  const dispatch = useDispatch();
  const heros = useSelector((state) => state.heros);
  const userData = useSelector((state) => state.auth.data);

  const isHerosLoading = heros.status === "loading";

  useEffect(() => {
    dispatch(fetchHeros());
  }, []);
  console.log(isHerosLoading);
  console.log(heros);

  return (
    <>
      <Grid container>
        <Grid xs display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          {(isHerosLoading ? [...Array(5)] : heros.items).map((obj, index) =>
            isHerosLoading ? (
              <Hero key={index} isLoading={true} />
            ) : (
              <Hero
                id={obj._id}
                nickName={obj.nickName}
                realName={obj.realName}
                description={obj.description}
                catchPhrase={obj.catchPhrase}
                imageUrl={
                  obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ""
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
      </Grid>
    </>
  );
};
