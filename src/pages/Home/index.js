import React, { Fragment } from 'react';
import Application from '../../components/Application';
import CarouselHome from '../../components/CarouselHome/CarouselHome';
import ListMovie from '../../components/ListMovie';
import News from '../../components/News/';
import SearchHome from '../../components/SearchHome/SearchHome';
import ShowTimeMovie from '../../components/ShowTimeMovie/ShowTimeMovie';
const Home = () => {
  return (
    <Fragment>
      <main className="main">
        <CarouselHome />
        <SearchHome />
        <ListMovie />
        <ShowTimeMovie />
        <News />
        <Application />
      </main>
    </Fragment>
  );
};

export default Home;
