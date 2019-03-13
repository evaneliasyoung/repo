window["clockOpacity"] = window["clockOpacity"] || 0.8;
window["clockLang"] = window["clockLang"] || "de";
window["clockHour"] = window["clockHour"] || false;
window["clockShadow"] = window["clockShadow"] || false;

var enList = {
	"day": ['sun', 'mon', 'tues', 'wed', 'thur', 'fri', 'sat'],
	"month": ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
}
var esList = {
	"day": ['dom', 'lun', 'mar', 'mier', 'jue', 'vie', 'sab'],
	"month": ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
}
var deList = {
	"day": ['son', 'mon', 'die', 'mit', 'don', 'fre', 'som'],
	"month": ['januar', 'febraur', 'märz', 'april', 'kann', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'dezember']
}

function updateConfig() {
	document.getElementById("clock").opacity = window["clockOpacity"];
	switch (window["clockLang"]) {
		case "en":
			window["langList"] = enList;
			break;;
		case "es":
			window["langList"] = esList;
			break;;
		case "de":
			window["langList"] = deList;
			break;;
	}
	if (window["clockShadow"]) {
		document.getElementById("clock").style["text-shadow"] = "0 5px 10px rgba(0,0,0,0.2)";
	}
}

function updateClock() {
	var currentTime = new Date();
	var currentHours = currentTime.getHours();
	var currentMinutes = currentTime.getMinutes() < 10 ? '0' + currentTime.getMinutes() : currentTime.getMinutes();
	var currentDay = currentTime.getDay();
	if(!window["clockHour"]) {
		currentHours %= 12;
		if(currentHours === 0) {
			currentHours = 12;
		}
		currentHours = currentHours < 10 ? '0' + currentHours : currentHours;
	}

	document.getElementById("hour").innerHTML = currentHours;
	document.getElementById("min").innerHTML = currentMinutes;
	document.getElementById("day").innerHTML = (window["langList"].day[currentTime.getDay()]).toUpperCase();
	document.getElementById("date").innerHTML = (window["langList"].month[currentTime.getMonth()]).toUpperCase()+" "+currentTime.getDate();
}

function init() {
	updateConfig();
	updateClock();
	setInterval(updateClock, 1000);
}
