var express = require('express')
,router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Enter a place name; we\'ll find the twitter geocode.' })
})

/* GET a new page that now has a code in it*/ 
router.post('/geocode' , function(req, res){

	var client = req.twitterclient
	client.get('geo/search', {query: req.body.placename}, function(err, tweets, twitterres){
		if(err) res.render('geocode', {dercode: "Ain't nobody got time for errors.", title: 'Oh noes...there was an error...'})
		else res.render('geocode', { dercode: tweets.result.places[0].id, title: 'Dat geocode id tho.' })
	})
})

module.exports = router;
