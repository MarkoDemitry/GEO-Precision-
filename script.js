/* =========================
CURRENT COORDINATES
========================= */

let currentLat = null;
let currentLon = null;

/* =========================
CONVERSION TYPE SWITCH
========================= */

document
.getElementById('conversionType')

.addEventListener('change', function(){

const decimalSection =
document.getElementById('decimalSection');

const dmsSection =
document.getElementById('dmsSection');

if(this.value === 'decimalToDMS'){

decimalSection.style.display = 'block';

dmsSection.style.display = 'none';

}

else{

decimalSection.style.display = 'none';

dmsSection.style.display = 'block';

}

});

/* =========================
DECIMAL TO DMS
========================= */

function decimalToDMS(decimal){

const absolute =
Math.abs(decimal);

const degrees =
Math.floor(absolute);

const minutesNotTruncated =
(absolute - degrees) * 60;

const minutes =
Math.floor(minutesNotTruncated);

const seconds =
(
(minutesNotTruncated - minutes) * 60
).toFixed(2);

return{

degrees,
minutes,
seconds

};

}

/* =========================
CONVERT DECIMAL TO DMS
========================= */

function convertDecimalToDMS(){

const lat =
parseFloat(
document.getElementById('decimalLat').value
);

const lon =
parseFloat(
document.getElementById('decimalLon').value
);

/* VALIDATION */

if(isNaN(lat) || isNaN(lon)){

alert('Please Enter Valid Coordinates');

return;

}

if(lat > 90 || lat < -90){

alert('Latitude Must Be Between -90 And 90');

return;

}

if(lon > 180 || lon < -180){

alert('Longitude Must Be Between -180 And 180');

return;

}

/* SAVE */

currentLat = lat;
currentLon = lon;

/* LATITUDE */

const latDMS =
decimalToDMS(lat);

document.getElementById('latDeg')
.value =
latDMS.degrees;

document.getElementById('latMin')
.value =
latDMS.minutes;

document.getElementById('latSec')
.value =
latDMS.seconds;

document.getElementById('latDir')
.value =
lat >= 0 ? 'N' : 'S';

/* LONGITUDE */

const lonDMS =
decimalToDMS(lon);

document.getElementById('lonDeg')
.value =
lonDMS.degrees;

document.getElementById('lonMin')
.value =
lonDMS.minutes;

document.getElementById('lonSec')
.value =
lonDMS.seconds;

document.getElementById('lonDir')
.value =
lon >= 0 ? 'E' : 'W';

/* DECIMAL RESULTS */

document.getElementById('resultLat')
.innerText =
lat.toFixed(8);

document.getElementById('resultLon')
.innerText =
lon.toFixed(8);

}

/* =========================
DMS TO DECIMAL
========================= */

function dmsToDecimal(
deg,
min,
sec,
dir
){

let decimal =

parseFloat(deg) +

parseFloat(min) / 60 +

parseFloat(sec) / 3600;

if(
dir === 'S' ||
dir === 'W'
){

decimal *= -1;

}

return decimal;

}

/* =========================
CONVERT DMS TO DECIMAL
========================= */

function convertDMSToDecimal(){

const latitude =

dmsToDecimal(

document.getElementById('inputLatDeg').value,

document.getElementById('inputLatMin').value,

document.getElementById('inputLatSec').value,

document.getElementById('inputLatDir').value

);

const longitude =

dmsToDecimal(

document.getElementById('inputLonDeg').value,

document.getElementById('inputLonMin').value,

document.getElementById('inputLonSec').value,

document.getElementById('inputLonDir').value

);

/* VALIDATION */

if(latitude > 90 || latitude < -90){

alert('Latitude Must Be Between -90 And 90');

return;

}

if(longitude > 180 || longitude < -180){

alert('Longitude Must Be Between -180 And 180');

return;

}

/* SAVE */

currentLat = latitude;
currentLon = longitude;

/* RESULTS */

document.getElementById('resultLat')
.innerText =
latitude.toFixed(8);

document.getElementById('resultLon')
.innerText =
longitude.toFixed(8);

/* SHOW DMS RESULTS */

const latDMS =
decimalToDMS(latitude);

document.getElementById('latDeg')
.value =
latDMS.degrees;

document.getElementById('latMin')
.value =
latDMS.minutes;

document.getElementById('latSec')
.value =
latDMS.seconds;

document.getElementById('latDir')
.value =
latitude >= 0 ? 'N' : 'S';

const lonDMS =
decimalToDMS(longitude);

document.getElementById('lonDeg')
.value =
lonDMS.degrees;

document.getElementById('lonMin')
.value =
lonDMS.minutes;

document.getElementById('lonSec')
.value =
lonDMS.seconds;

document.getElementById('lonDir')
.value =
longitude >= 0 ? 'E' : 'W';

}

/* =========================
COPY RESULTS
========================= */

function copyResults(){

const text = `

Latitude:
${document.getElementById('resultLat').innerText}

Longitude:
${document.getElementById('resultLon').innerText}

Latitude DMS:
${document.getElementById('latDeg').value}°
${document.getElementById('latMin').value}'
${document.getElementById('latSec').value}"
${document.getElementById('latDir').value}

Longitude DMS:
${document.getElementById('lonDeg').value}°
${document.getElementById('lonMin').value}'
${document.getElementById('lonSec').value}"
${document.getElementById('lonDir').value}

`;

navigator.clipboard
.writeText(text);

alert('Results Copied');

}

/* =========================
CLEAR ALL
========================= */

function clearAllFields(){

const inputs =
document.querySelectorAll('input');

inputs.forEach(input => {

input.value = '';

});

document.getElementById('resultLat')
.innerText = '---';

document.getElementById('resultLon')
.innerText = '---';

currentLat = null;
currentLon = null;

}

/* =========================
OPEN GOOGLE MAPS
========================= */

function openMap(){

if(
currentLat === null ||
currentLon === null
){

alert('No Coordinates');

return;

}

window.open(

`https://www.google.com/maps?q=${currentLat},${currentLon}`,

'_blank'

);

}

/* =========================
LIVE CONVERT
========================= */

document
.getElementById('decimalLat')

.addEventListener('input', autoConvert);

document
.getElementById('decimalLon')

.addEventListener('input', autoConvert