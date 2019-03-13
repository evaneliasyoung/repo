window["clockFontSize"] = window["clockFontSize"] || 96;
window["clockAlignHoriz"] = window["clockAlignHoriz"] || "left";
window["clockAlignVert"] = window["clockAlignVert"] || "top";
window["hourColor"] = window["hourColor"] || "FFCC00";
window["minColor"] = window["minColor"] || "FFFFFF";
window["clockOpacity"] = window["clockOpacity"] || 0.8;
window["clockLang"] = window["clockLang"] || "de";
window["clockShadow"] = window["clockShadow"] || false;

var enList = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'twenty', 'thirty', 'forty', 'fifty', "o'clock"];
var esList = ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'veinte', 'treinta', 'cuarenta', 'cincuenta', "en punto"];
var deList = ['eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', "d'uhr"];

function numText(hr, min) {
	var ori = min;
	var li = window["langList"];
	var words = [li[(hr+11)%12], '', ''];
	
	if(min <= 12) {
		if(min === 0) {
			words[1] = li[16];
		} else if(min == 10) {
			words[1] = li[9];
		} else {
			words[1] = (li[min-1]);
			if(window["clockLang"] == "en" && min <= 9) {
				words[1] = "oh "+(li[min-1]);
			}
		}
		if(window["clockLang"] == "es" && min !== 0) {
			words[0] += " y"
		}
		return words;
	} else {
		if(window["clockLang"] == "es") {
			words[0] += " y"
		}
		if(min <= 19) {
			min -= 10;
			words[1] = li[9];
			if(window["clockLang"] == "en") {
				if(min == 3) {
					words[1] = "thir";
				} else if(min == 5) {
					words[1] = "fif";
				} else if(min == 8) {
					words[1] = "eigh";
				} else {
					words[1] = li[min-1];
				}
				words[1] += "teen";
				return words;
			}
			if(window["clockLang"] == "es") {
				switch(min) {
					case 3:
						words[1] = "trece";
					break;
					case 4:
						words[1] = "catorce";
					break;
					case 5:
						words[1] = "quince";
					break;
					default:
						words[1] += " y"
						words[2] = li[min-1];
					break;
				}
				return words;
			}
		} else if(min <= 29) {
			min -= 20;
			words[1] = li[12];
		} else if(min <= 39) {
			min -= 30;
			words[1] = li[13];
		} else if(min <= 49) {
			min -= 40;
			words[1] = li[14];
		} else if(min <= 59) {
			min -= 50;
			words[1] = li[15];
		}
		if(min == 0) {
			words[2] = "";
		} else {
			words[2] = li[min-1];
			if(window["clockLang"] == "es") {
				words[1] += " y";
			}
			if(window["clockLang"] == "de") {
				var temp = words[1];
				words[1] = words[2];
				words[2] = temp;
			}
		}
	}
	return words;
}
function updateConfig() {
	document.getElementById("clock").style.opacity = window["clockOpacity"];
	document.getElementById("clock").style.textAlign = window["clockAlignHoriz"];
	document.getElementById("clock").style.fontSize = window["clockFontSize"]+"px";
	document.getElementById("clock").style.lineHeight = window["clockFontSize"]*0.8+"px";
	document.getElementById("hour").style.color = "#"+window["hourColor"];
	document.getElementById("min1").style.color = "#"+window["minColor"];
	document.getElementById("min2").style.color = "#"+window["minColor"];
	if(window["clockAlignVert"] == "center" || window["clockAlignVert"] == "middle") {
		document.querySelector("body").style.display = "flex";
		document.querySelector("body").style["flex-direction"] = "column";
		document.querySelector("body").style["justify-content"] = "center";
	} else if (window["clockAlignVert"] == "bottom") {
		document.getElementById("clock").style.position = "absolute";
		document.getElementById("clock").style.bottom = 16;
	}
	for(i=0;i<document.getElementsByTagName("*").length;i++){
		document.getElementsByTagName("*")[i].style.fontFamily = "SanFrancisco";
	}
	if (window["clockShadow"]) {
		document.getElementById("clock").style["text-shadow"] = "0 5px 10px rgba(0,0,0,0.2)";
	}
	
	switch(window["clockLang"]) {
		case "en":
			window["langList"] = enList;
		break;
		case "es":
			window["langList"] = esList;
		break;
		case "de":
			window["langList"] = deList;
		break;
	}
}
function animatePhaseTwo(elem, newt) {
    elem.innerHTML = newt;
    elem.style['animation-name'] = 'slideIn';
}
function animateClock(elem, newt) {
    if(elem.innerHTML == newt) {
        return;
    } else {
        elem.style['animation-name'] = 'slideOut';
        setTimeout(function(){animatePhaseTwo(elem, newt)}, 500);
    }
}

function updateClock() {
	var currentTime = new Date();
	var currentHours = currentTime.getHours();
	var currentMinutes = currentTime.getMinutes() < 10 ? '0' + currentTime.getMinutes() : currentTime.getMinutes();
	currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
	currentHours = ( currentHours === 0 ) ? 12 : currentHours;
	var text = numText(currentHours, currentMinutes);
    
    animateClock(document.getElementById("hour"), text[0]);
    animateClock(document.getElementById("min1"), text[1]);
    animateClock(document.getElementById("min2"), text[2]);
}

function init() {
	updateConfig();
	updateClock();
	setInterval(updateClock, 1000);
}
