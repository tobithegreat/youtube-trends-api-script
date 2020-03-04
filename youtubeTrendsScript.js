const googleTrends = require('google-trends-api');


// Command Line Functionality

if (process.argv.length < 4) {
  console.error("Error: Not enough arguments");
  return;
}

var option = process.argv[2];

if (option == "trending") {
  day = process.argv[3].toString().trim();
  console.log(day);
  date = new Date(day);
  console.log(date);
  getDailyTrendsForDay(date);
} else if (option == "interest") {
  var searchTerm = process.argv[3];
  getInterestOverTimeForKeyword(searchTerm);
}

// Find the interest for a specific keyword

function getInterestOverTimeForKeyword(keyword) {
  googleTrends.interestOverTime({keyword: 'Women\'s march'})
  .then(function(results){

    var resultsJSON = JSON.parse(results);

    var data = resultsJSON["default"];
    var timelineData = data["timelineData"]; // array of interest timestamps

    timelineData.forEach(function(timestamp) {
      console.log(`On the date ${timestamp["formattedTime"]}, the interest value was at ${timestamp.value}`);
    })

    })
    .catch(function(err){
      console.error('Oh no there was an error', err);
    });
}

// Get a list of daily trending topics for a specific day

function getDailyTrendsForDay(day) {
  googleTrends.dailyTrends({
  trendDate: day,
  geo: 'US',
})
.then(function(results) {
  var resultsJSON = JSON.parse(results);

  var data = resultsJSON["default"];
  var dayData = data["trendingSearchesDays"][0];
  var searches = dayData["trendingSearches"];

  console.log(`On the date of ${day}\n`);
  searches.forEach(function(search) {
    console.log(`The search term ${search["title"]["query"]} has ${search["formattedTraffic"]} amount of traffic`);
  });

})
.catch(function(err){
  console.error("Oh no an error!", err);
})
}



//getInterestOverTimeForKeyword("software engineer");
//getDailyTrendsForDay(new Date('2020-02-26'));
