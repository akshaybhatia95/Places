var express = require("express");
var bodyParser=require("body-parser");
var port=process.env.PORT||8081;
var app     = express();
var path    = require("path");
'use strict';
const yelp = require('yelp-fusion');
myYelpKey="mXmnuY3YEFq0c0M4LaqseXTwFqzc-mmA-79KpzzcRO3Cqq179aJTwOqUGFBdYzCpdwGfJzV7H_0_oFrp6U_j53XVKbH5zvne9KanqWQ7ebvZIMhyog0G0Lc_dCrIWnYx";
const client = yelp.client(myYelpKey);
 
const request = require("request");
const myKey="AIzaSyAT8TaDOaYVcNBSKg9Ge0ht5kkikbFQsFg"
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/sendData',function (req, res) {
	myLat=0;myLong=0;
 if (!req.query) return res.sendStatus(400);
var request = require('request');
console.log(req.query); 

  
   myLat=0;myLong=0;myLocation=0;myRadius=0;
   myJSON="";
  
    myKeyword=req.query.keyword;

    if(req.query.distance<10){
    	myRadius=10;
    }
    else{
   	myRadius=req.query.distance;
    }
    myRadius=myRadius*1609;
    if(myRadius>50000){
   	myRadius=50000;
   }
   if(req.query.location==0){
  		myLat=req.query.lat;
  		myLong=req.query.lon;
   }

  else{
  		myLocation=req.query.location;
		myLocation=myLocation.split(' ').join('+');
		console.log(myLocation);	
		myUrl="https://maps.googleapis.com/maps/api/geocode/json?address="+myLocation+"&key="+myKey;
		request.get(myUrl, (error, response, body) => 
			{
  			let json = JSON.parse(body);
  			myLat=json.results[0].geometry.location.lat;
			myLong=json.results[0].geometry.location.lng;
			console.log(myLat);
  			console.log(myLong);
			});

  		}
  	myCategory=req.query.category;
  	console.log(myLat+"bahaar");
  	console.log(myLong+"bahaar");
 
  	setTimeout(function(){  	myKeyword=myKeyword.replace(' ','+');
  	myUrl="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+myLat+","+myLong+"&radius="+myRadius+"&type="+myCategory+
  	"&keyword="+myKeyword+"&key="+myKey;
  	request.get(myUrl, function (error, response, body)
  	{	
  	console.log('error:', error); // Print the error if one occurred
  	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  	console.log('body:', body);
  	res.send(body); // Print the HTML for the Google homepage.
});},1000);
	//res.send(myJSON);

});

app.get('/sendData2',function (req, res) {
	if (!req.query) return res.sendStatus(400);
	
	 myUrl="https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken="+req.query.pagetoken+"&key="+myKey;

	 setTimeout(function(){request.get(myUrl,function(error,response,body){
	 	console.log('error:', error); // Print the error if one occurred
  		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  		console.log('body:', body);
  		res.send(body);

	 });},1000);

});

app.get('/sendData3',function (req, res) {
	if (!req.query) return res.sendStatus(400);
	console.log(req.query);
	 myYelpKey="mXmnuY3YEFq0c0M4LaqseXTwFqzc-mmA-79KpzzcRO3Cqq179aJTwOqUGFBdYzCpdwGfJzV7H_0_oFrp6U_j53XVKbH5zvne9KanqWQ7ebvZIMhyog0G0Lc_dCrIWnYx";
	 myUrl="https://api.yelp.com/v3/businesses/matches/best?name="+req.query.placeName+"&address1="+req.query.placeAddress+"&city="+req.query.placeCity+"&state="+req.query.placeState+
	 "&country="+req.query.placeCountry;
	 	 var headers = { 
    'Authorization':'Bearer mXmnuY3YEFq0c0M4LaqseXTwFqzc-mmA-79KpzzcRO3Cqq179aJTwOqUGFBdYzCpdwGfJzV7H_0_oFrp6U_j53XVKbH5zvne9KanqWQ7ebvZIMhyog0G0Lc_dCrIWnYx'
};
// 	client.businessMatch('best', {
//   name: req.query.placeName,
//   address1: req.query.placeAddress,
//   city: req.query.placeCity,
//   state: req.query.placeState,
//   country: req.query.placeCountry
// }).then(response => {
//   console.log(response.jsonBody.businesses[0].id);
//   res.send(response);
// }).catch(e => {
//   console.log(e);
// });

	 setTimeout(function(){request.get({url: myUrl, headers:headers},function(error,response,body){
	 	console.log('error:', error); // Print the error if one occurred
  		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  		console.log('body:', body);
  		res.send(body);

	 });},1000);

});

app.get('/sendData4',function (req, res) {
	if (!req.query) return res.sendStatus(400);
 	console.log(req.query);
	 myUrl="https://api.yelp.com/v3/businesses/"+req.query.yelpId+"/reviews";
	 var headers = { 
    'Authorization':'Bearer mXmnuY3YEFq0c0M4LaqseXTwFqzc-mmA-79KpzzcRO3Cqq179aJTwOqUGFBdYzCpdwGfJzV7H_0_oFrp6U_j53XVKbH5zvne9KanqWQ7ebvZIMhyog0G0Lc_dCrIWnYx'
};

	 request.get({url: myUrl, headers:headers},function(error,response,body){
	 	console.log('error:', error); // Print the error if one occurred
  		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  		console.log('body:', body);
  		res.send(body);

	 });

});

app.get('/newData',function (req, res) {
  if (!req.query) return res.sendStatus(400);
   myKey="AIzaSyDUhnp_nBVyJapC2UQJxr8GELzuu86tx90";
   myUrl="https://maps.googleapis.com/maps/api/place/details/json?placeid="+req.query.id+"&key="+myKey;

   setTimeout(function(){request.get(myUrl,function(error,response,body){
    console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body);
      res.send(body);

   });},1000);

});



app.listen(port,function(){
console.log("Running at Port 8081");
});

