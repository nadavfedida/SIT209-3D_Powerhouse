let request = require('request');
let url = `http://10.0.0.25/api/printer?apikey=2E9748C95E3844EFAF3C36C2C379212D`

request(url, function (err, response, body) {
if(err){
    console.log('error:', error);
} else {
    console.log('body:', body);
    let Octoprint = JSON.parse(body)
    console.log(Octoprint.temperature.bed.actual)
    console.log(Octoprint.temperature.tool0.actual)

}
});

