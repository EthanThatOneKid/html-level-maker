var User = function(startX = 0, startY = 0, w = 30, h = 30) {
    this.pos = {
        x: startX,
        y: startY
    };
    this.vel = {
        x: 0,
        y: 0
    };
    this.w = w;
    this.h = h;
    this.g = 0;
    this.gSpd = 0.1;
    this.spd = 3;
    this.jumping = false;
    
    this.move = function() {
        if (keyIsPressed && keys[UP_ARROW] && !this.jumping) {
            //this.g = map((this.w + this.h) * -0.1, height * -0.0125, height * -0.004, height * -0.0125, height * -0.09);
	    this.g = height * -0.01;
	    console.log(this.g);
            this.jumping = true;
        }
        if (keyIsPressed && keys[RIGHT_ARROW]) {
            this.pos.x += this.spd;
        }
        if (keyIsPressed && keys[LEFT_ARROW]) {
            this.pos.x -= this.spd;
        }
    };
    
    this.render = function() {
	image(userImage, this.pos.x, this.pos.y, this.w, this.h);
    };
    
    this.collision = function(level) {
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {
                var w = width / level[i].length;
                var h = height / level.length;
		var isBlock = level[i][j][0] < 255 || level[i][j][1] < 255 || level[i][j][2] < 255;
                if (((this.pos.x >= j * w && this.pos.x <= j * w + w) || (this.pos.x + this.w >= j * w && this.pos.x + this.w <= j * w + w)) && (this.pos.y <= i * h) && (this.pos.y + this.h >= i * h) && isBlock) {                   
                    this.pos.y = i * h - this.h;
		    this.g = 0;
                    this.jumping = false;
                }
                if (((this.pos.x >= j * w && this.pos.x <= j * w + w) || (this.pos.x + this.w >= j * w && this.pos.x + this.w <= j * w + w)) && (this.pos.y > i * h) && (this.pos.y < i * h + h) && isBlock) {
                    this.pos.y = i * h + h;
                    this.g = 0;
                }
            }
        }
    };

    this.edges = function() {
	if (this.pos.x < 0) {
		this.pos.x = 0;
	}
	if (this.pos.x + this.w > width) {
		this.pos.x = height - this.w;
	}
    };
    
    this.update = function() {
        this.pos.y += this.g;
        this.g += this.gSpd;
    };
};