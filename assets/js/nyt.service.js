//this will serve the data to the controller
//(do the actual api call and return an object)
var getTheNews = (function () {
	var apiKey = '25e3b019f8b04fa6ab435adcd6e48286';
	var url;

//URL




function getArticles(query, articleCount, beginDate='', endDate='' )
{
	var articleResults;
	var returnResults = [];

	var parameters = {}
	parameters['api-key'] = apiKey;
	parameters.q = query;
	if (beginDate) {
		parameters.begin_date = beginDate;
	}
	if (endDate) {
		parameters.end_date = endDate;
	}


	var pages = Math.floor(articleCount / 10);

	for (var i = 0; i <= pages; i++) {
		parameters.page = i;

		url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

		url += '?' + $.param(parameters);

		//ACTUAL CALL
		$.ajax({ url: url, method: 'GET', })
		.done( function( tResult )
		{
		  // console.log( tResult );
		  articleResults = tResult.response.docs


		  var trimmedResults;

		  if( articleCount )
		  {
			trimmedResults = articleResults.slice( articleCount );
		  }
		  else
		  {
		  	trimmedResults = articleResults;
		  }

		  console.log( trimmedResults )
		  returnResults.push( processResults( trimmedResults ) );

		})
		.fail(function( err )
		 {
		  throw err;
		});

	}

	// console.log(returnResults);

	// return returnResults;

	
		// setSearchParams();
		// return getArticles();
	}

function processResults( tArticleResults )
{
	var tempArticles = [];

	for( var i = 0; i < tArticleResults.length; i++ )
	{
		//console.log( tArticleResults[i] );
		var byline = (function () {
			if (tArticleResults[i].byline) {
				return tArticleResults[i].byline.original;
			} else {
				return null;
			}
		})();

		var tempArticle = 
		{
			headline: tArticleResults[i].headline.main,
			snippet: tArticleResults[i].snippet,
			byline: byline,
			pubDate: tArticleResults[i].pub_date,
		}

		tempArticles.push( tempArticle );
	}

	return tempArticles;
	// console.log( tempArticles );
}

function getArticlesTesting (query, beginDate, endDate, articleCount) {
	return 
	{
		articles: [
		{
			headline: 'Testing',
			snippet: 'This is some descriptive text about the article. It will be kind of long',
			byline:'Im the author',
			pubDate: '2017-05-24T13:57:04+0000'
		}
		]
	}
}

var publicAPI = {
	//getArticles: getArticlesTesting
	getArticles: getArticles
}

return publicAPI;

})();



// respsonse.docs[] - array of articles
// docs[i].headline.main
// docs[i].snippet
// docs[i].pub_date
// docs[i].byline.original //(article author)