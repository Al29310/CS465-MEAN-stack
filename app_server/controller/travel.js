
const  response  = require('express');
const request = require('request');

const apiOptions = {
    server : 'http://localhost:3000'
}

//var fs = require('fs');
//const trips = JSON.parse(fs.readFileSync('./data/trips.json' , 'utf8'));
const renderTravelList = (req,res,responseBody) => {
    let message = null;
    let pageTitle = process.env.npm_package_description + ' - Travel';

    if(!(responseBody instanceof Array)){
        message = 'API lookup error';
        responseBody = [];
    }else{
        if(!responseBody.length){
            message = 'no trips exist in database';
        }

    }
    res.render('travel',{
        title : pageTitle,
        trips : responseBody,
        message
    })





}

const travelList =  (req,res) => {
    const path = '/api/trips';
    const requestOptions = {
        url : `${apiOptions.server}${path}`,
        method : 'GET',
        json : {},
    };

    console.info('>> travelerController.travelList calling' + requestOptions.url);



    request(
        requestOptions,
        (err, { statuscode }, body) =>{
            if(err){
                console.error(err);
            }
           renderTravelList(req,res,body);
        }
    );
    
}

module.exports = {
    travelList
};