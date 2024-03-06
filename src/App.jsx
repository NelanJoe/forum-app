import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { asyncPreloadProcess } from './states/isPreload/action';

import Header from './components/header';
import Footer from './components/footer';

import HomePage from './pages/home-page';
import LeaderboardsPage from './pages/leaderboards-page';
import DetailPage from './pages/detail-page';
import CreatePage from './pages/create-page';
import NotFoundPage from './pages/not-found-page';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';

import Loading from './components/loading';

export default function App() {
  const { authUser = null, isPreload = false } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <Header />
        <main className="max-w-screen-lg pt-10 mx-4 lg:mx-auto">
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Loading />
      <Header />
      <main className="max-w-screen-lg pt-10 mx-4 xl:mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads">
            <Route path="create" element={<CreatePage />} />
            <Route path=":threadId" element={<DetailPage />} />
          </Route>
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
