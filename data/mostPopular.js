const { top50 } = require("./top50");

let uniqueArtistNames = [];
let nameCount = [];

// STEP1
for (let el of top50) {
  if (!uniqueArtistNames.includes(el.artist)) {
    uniqueArtistNames.push(el.artist);
  }
}

// STEP2
for (let name of uniqueArtistNames) {
  nameCount.push({ name: name, count: 0 });
}

// STEP3
for (let element of nameCount) {
  for (let person of top50) {
    if (element.name === person.artist) {
      element.count += 1;
    }
  }
}
// STEP 4

nameCount.sort(function(a, b) {
  return b.count - a.count;
});

// STEP 5
let mostPopularArtist = top50.filter(obj => obj.artist === nameCount[0].name);

module.exports = mostPopularArtist;
