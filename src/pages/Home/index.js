import React from "react";
import Application from "../../components/Application/Application";
import CarouselHome from "../../components/CarouselHome/CarouselHome";
import ListMovie from "../../components/ListMovie/ListMovie";
import News from "../../components/News/News";
import SearchHome from "../../components/SearchHome/SearchHome";
import ShowTimeMovie from "../../components/ShowTimeMovie/ShowTimeMovie";

const Home = () => {
  return (
    <main className="main">
      <CarouselHome />
      <SearchHome />
      <ListMovie />
      <ShowTimeMovie />
      <News />
      <Application />
    </main>
  );
};

export default Home;
