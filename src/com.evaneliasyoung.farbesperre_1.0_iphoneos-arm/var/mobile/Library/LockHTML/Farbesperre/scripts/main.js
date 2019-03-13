window["clockRadius"] = parseInt(window["clockRadius"]) || 640;
window["showHours"] = window["showHours"] || true;
window["showSecHand"] = window["showSecHand"] || true;
window["clockColor"] = window["clockColor"] || "FFCC00";
window["secColor"] = window["secColor"] || "FF9900";
window["knotColor"] = window["knotColor"] || "000000";

function base_drawCircle(ctx, color, radius, pos) {
   ctx.fillStyle = color;
   ctx.beginPath();
   ctx.arc(pos[0], pos[1], radius, 0, 2*Math.PI);
   ctx.fill();
}
function base_drawFace(ctx, color, radius) {
	base_drawCircle(ctx, color, radius*0.04, [0, 0]);
	ctx.strokeStyle = "white";
}
function base_drawCenter(ctx, color, radius) {
	base_drawCircle(ctx, color, radius*0.03, [0, 0]);
	base_drawCircle(ctx, "#"+knotColor, radius*0.01, [0, 0]);
}
function base_drawHours(ctx, color, radius, size) {
	var ang;
	var num;
	ctx.font = "bold 96px SanFrancisco, sans-serif";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	
	if (showHours) {
		for(num = 1; num < 13; num++){
			ang = num * Math.PI / 6;
			ctx.rotate(ang);
			ctx.translate(0, -radius*0.75);
			ctx.rotate(-ang);
			ctx.fillStyle = color;
			ctx.fillText(num.toString(), 0, 0);
			ctx.rotate(ang);
			ctx.translate(0, radius*0.75);
			ctx.rotate(-ang);
		}
	}
}
function base_drawHands(ctx, color, radius){
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();

	hour = hour%12;
	hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
	ctx.strokeStyle = color[0];
	base_drawHand(ctx, hour, radius*0.5, radius*0.075, false);

	minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
	ctx.strokeStyle = color[1];
	base_drawHand(ctx, minute, radius*0.8, radius*0.075, false);
	
	if (showSecHand) {
		second = (second*Math.PI/30);
		ctx.strokeStyle = color[2];
		base_drawHand(ctx, second, radius*0.95, radius*0.01, true);
		base_drawHand(ctx, second, radius*-0.1, radius*0.01, true);
	}
}
function base_drawHand(ctx, pos, length, width, second) {
	var y = 0;
	if (!second) {
		y = -60;
		ctx.beginPath();
		ctx.lineWidth = width/3;
		ctx.lineCap = "square";
		ctx.moveTo(0, 0);
		ctx.rotate(pos);
		ctx.lineTo(0, -60);
		ctx.stroke();
		ctx.rotate(-pos);
	}
	ctx.beginPath();
	ctx.lineWidth = width/1.3;
	ctx.lineCap = "round";
	ctx.rotate(pos);
	ctx.moveTo(0, y);
	ctx.lineTo(0, -length);
	ctx.stroke();
	ctx.rotate(-pos);
}
function base_drawLines(ctx, color, radius, length, width, cap) {
	for (var angle, angle = 0; angle < 60; angle++) {
		ang = angle * Math.PI / 30;
		ctx.rotate(ang);
		ctx.translate(0, -radius*0.95);
		if (angle%5 === 0) {
			ctx.beginPath();
			ctx.moveTo(0, 5);
			ctx.lineTo(0, length[0]+5);
			ctx.lineWidth = width[0];
		} else {
			ctx.beginPath();
			ctx.moveTo(0, 5);
			ctx.lineTo(0, length[1]+5);
			ctx.lineWidth = width[1];
		}
		ctx.rotate(-ang);
		ctx.strokeStyle = color;
		ctx.lineCap = cap;
		ctx.stroke();
		ctx.rotate(ang);
		ctx.translate(0, radius*0.95);
		ctx.rotate(-ang);
	}
}

function updateClock() {
	window["now"] = new Date();
	var radius = rad;
	ctx.clearRect(-rad, -rad, rad*2, rad*2);
	base_drawFace(ctx, "white", radius);
	//base_drawHours(ctx, "#"+clockColor, radius, radius*0.3);
	base_drawLines(ctx, "#"+clockColor, radius, [radius/3.7925925925925927, radius/(radius*10)], [radius/34.1, radius/34.1], "round");
	base_drawHands(ctx, ["white", "white", "#"+secColor], radius);
	base_drawCenter(ctx, "#"+secColor, radius);
}
function init() {
	window["clockArea"] = document.getElementById("clock");
	window["ctx"] = clockArea.getContext("2d");
	window["rad"] = clockArea.height/2;
	window["ctx"].translate(rad, rad);
	
	clockArea.style.height = clockRadius;
	clockArea.style.width = clockRadius;
	updateClock();
	setInterval(updateClock, 1000);
}
