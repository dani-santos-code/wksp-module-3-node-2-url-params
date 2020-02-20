const { top50 } = require("./top50");

module.exports.filterByRank = songNumber => {
  return top50.filter(song => song.rank === parseInt(songNumber));
};
