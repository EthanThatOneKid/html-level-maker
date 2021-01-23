var user, level;
var currentLevel = 0;
var currentPhase = 0;
var keys = [];
var userImage;
var dropzone;

function JSONLevelToJSLevel(json) {
    
	var level = [];
    
	var gimmeRGB;
    
	for (var y = 0; y < json.length; y++) {
        
		level.push([]);
        
		for (var x = 0; x < json.length; x++) {
            
			gimmeRGB = json[y][x].replace(/[^\d,]/g, '').split(',');
            
			level[y].push(gimmeRGB);
        
		}
    
	}
    
	return level;
}

function stringToArray(text) {
	var arrays = [];
    
	for (var i = 0; i < text.length - 1; i++) {
        
		if (text.charAt(i) === '[') {
            
			var gimmeContents = '', gimmeThisArray, keepGoing = true;
            
			for (var char = 0; keepGoing; char++) {
                
				if (text.charAt(i + char + 1) === ']' || text.charAt(i + 1) === '[') {
                    
					keepGoing = false;
                
				} else {
                    
					gimmeContents += text.charAt(i + char + 1);
                
				}
            
			}
            
			gimmeThisArray = gimmeContents.split('","');
            
			if (gimmeContents) {
                
				arrays.push(gimmeThisArray);
            
			}
        
		}
    
	}
    
	return arrays;

}

function changeLevel(text_) {
	var text = (text_) ? text_ : document.getElementById('level-input').value
	user.pos.y = height * 0.1;
	level = stringToArray(text);
	level = JSONLevelToJSLevel(level);
}

function setup() {
    exampleLevel = '[["rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)"],["rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)"],["rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)"],["rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)"],["rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)"],["rgb(0, 0, 0)","rgb(0, 0, 0)","rgb(0, 0, 0)","rgb(0, 0, 0)","rgb(0, 0, 0)","rgb(0, 0, 0)","rgb(0, 0, 0)"],["rgb(0, 0, 0)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(0, 0, 0)"]]';
    level = stringToArray(exampleLevel);
    level = JSONLevelToJSLevel(level);

    var cnv = createCanvas(500, 500);
    cnv.parent('canvas-holder');

    dropzone = select('#dropzone');
    dropzone.dragOver(highlight);
    dropzone.dragLeave(unhighlight);
    dropzone.drop(gotFile, unhighlight);

    userImage = loadImage('cgi-bin/lgm.png');
    user = new User(
	width / 2, 0,
	width / level.length * 0.8, 
	height / level.length * 0.8	
    );
}

function gotFile(file) {
	console.log(file);
	userImage = createImg(file.data);
	userImage.hide();
	document.getElementById('character-display').src = file.data;
}
function highlight() {
	dropzone.style('background-color', '#ccc');
	console.log("highlighted");
}
function unhighlight() {
	dropzone.style('background-color', '#fff');
	console.log("unhighlighted");
}


var keyPressed = function() {
	keys[keyCode]=true;
};
var keyReleased = function() {
	keys[keyCode]=false;
};


var printLevel = function(level) {
    noStroke();
    for (var y = 0; y < level.length; y++) {
        
	for (var x = 0; x < level.length; x++) {
            
		var w = width / level.length * 0.998;
            
		var h = height / level.length * 0.997;
            
		var gimmeCol = {
                
			r: level[y][x][0],
                
			g: level[y][x][1],
                
			b: level[y][x][2]
            
		};
            
		fill(gimmeCol.r, gimmeCol.g, gimmeCol.b);
            
		rect(x * w, y * h, w, h);
        
	}
    
    }
};

var draw = function() {
    background(255, 255, 255, 0);
    printLevel(level);
    fill(255,255,255,0); stroke(0); rect(1, 1, width - 2, height -2);
    
    user.collision(level);
    user.edges();
    user.move();
    user.update();
    user.render();

    user.w = map(level.length, 2, 40, width * 0.15, width * 0.015); //width / level.length * 0.8; 
    user.h = map(level.length, 2, 40, height * 0.15, height * 0.015); //height / level.length * 0.8;
};