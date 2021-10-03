$('#navbar').load('navbar.html');
const devices = JSON.parse(localStorage.getItem('devices')) || [];
const API_URL = 'http://localhost:5000/api';
//const arraylength = sensorData.length - 1;

$.get(`${API_URL}/devices`  )
.then(response => { 
 //get the data array.
  var data = response.at(0).sensorData;
  console.log(data);
  //for each item in the array.
  data.forEach(reading => {
    console.log(reading);
    $('#devices tbody').append(`
      <tr>
        <td>${reading.nozel_temp}</td>
        <td>${reading.bed_temp}</td>
      </tr>`
    );
  });
})
.catch(error => {
  console.error(`Error: ${error}`);
});
/*
$('#add-device').on('click', () => {
    setInterval(function(){
    const low = 10;
    const high = 40;
    randomtemp = Math.floor(Math.random() * (high - low) + low);
    const name = randomtemp;
    const floor = randomtemp;
    const sensorData = [];

    const body = {
      name,
      floor,
      sensorData
    };

    $.post(`${API_URL}/devices`, body)
    .then(response => {
      location.href = '/Lighting';
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });;
  },50);
  
});
*/