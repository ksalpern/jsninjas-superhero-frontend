import { useEffect } from "react";
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { Header } from "./components";
import { Home, FullHero, Registration, AddHero, Login } from "./pages";
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/heros/:id" element={<FullHero />} />
          <Route path="/heros/:id/edit" element={<AddHero />} />
          <Route path="/add-hero" element={<AddHero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
