"use strict";

const morgan = require("morgan");

const express = require("express");

const { top50 } = require("./data/top50");

const { books } = require("./data/books");

const mostPopularArtist = require("./data/mostPopular");

const filter = require("./data/filteredByRank");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints here

app.get("/top50", (req, res) => {
  res.render("pages/top50", {
    title: "Top 50 Songs Streamed on Spotify",
    top50
  });
});

app.get("/top50/popular-artist", (req, res) => {
  res.render("pages/popularArtist", {
    title: "Most Popular Artist",
    mostPopularArtist
  });
});

app.get("/top50/song/:number", (req, res) => {
  const songNumber = req.params.number;
  if (songNumber <= top50.length && songNumber >= 1) {
    let filteredSong = filter.filterByRank(songNumber);
    res.render("pages/songByRank", {
      title: `Song #${filteredSong[0].rank}`,
      filteredSong
    });
  } else {
    res.redirect("pages/fourOhFour");
  }
});

app.get("/books", (req, res) => {
  res.render("pages/allBooks", {
    title: "All Books",
    books
  });
});

// handle 404s

app.get("*", (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl
  });
});

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT} check http://www.localhost:${PORT}`)
);
