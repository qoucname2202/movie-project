import React from "react";
import CarouselHome from "../../components/CarouselHome/CarouselHome";
import ListMovie from "../../components/ListMovie/ListMovie";
import SearchHome from "../../components/SearchHome/SearchHome";

const Home = () => {
  return (
    <main className="main">
      <CarouselHome />
      <SearchHome />
      <ListMovie />
    </main>
  );
};

export default Home;
