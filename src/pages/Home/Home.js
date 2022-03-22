import React from "react";
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
      {/* <ShowTimeMovie /> */}
      <News />
    </main>
  );
};

export default Home;
