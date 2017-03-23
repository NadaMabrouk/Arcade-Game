// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, incrementSpeed) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + ((this.speed + incrementSpeed) * dt);
    if (this.x > 606) {
        this.reset();
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    this.x = -101;
    this.y = this.y;
    this.speed = this.randomSpeed();
};

Enemy.prototype.randomSpeed = function() {
    return Math.round(Math.random() * 200) + 80;
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, speed, level, life, score, eatenGolds) {
    this.sprite = 'images/char-pink-girl.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.level = level;
    this.life = life;
    this.score = 0;
    this.eatenGolds = 0;
};

Player.prototype.update = function() {
    if (this.x >= 606) {
        this.x -= 101;
    } else if (this.x < 0) {
        this.x += 101;
    } else if (this.y >= 498) {
        this.y -= 83;
    } else if (this.y < 0) {
        this.y += 83;
    }
    var goldImages = ['images/GemGreen.png', 'images/GemOrange.png', 'images/GemBlue.png'];
    /// Level Increment
    if (this.level === this.eatenGolds) {
        this.eatenGolds = 0;
        this.level = this.level + 1;
        document.getElementById('level').innerHTML = "Level: " + this.level;
        extralife.resetPosition();
        ////// Game becomes harder >> More enemies with increased speed
        golds.forEach(function(gold) {
            gold.resetPosition();
        });

        while (this.level !== golds.length) {
            var randomNum = Math.round(Math.random() * 2);
            golds.push(new Gold(goldImages[randomNum]));
            console.log('generate golds');
        }

        this.speed += 10;
        if (this.level % 3 == 0) {
            var x = 83 * (Math.round(Math.random() * 2) + 1);
            allEnemies.push(new Enemy(0, x, 110));
        }
        this.reset();
    }
    //// Generating Golds

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            this.x = this.x - 101;
            break;
        case 'right':
            this.x = this.x + 101;
            break;
        case 'up':
            this.y = this.y - 83;
            break;
        case 'down':
            this.y = this.y + 83;
        default:
            // statements_def
            break;
    };
    this.update();
};

Player.prototype.reset = function() {
    this.x = Math.round(Math.random() * 5) * 101;
    this.y = 4 * 83;
};

Player.prototype.renderLifes = function() {
    ctx.drawImage(Resources.get('images/Heart.png'), 5, 505, 50, 70);
    document.getElementById('life').innerHTML = "&#215; " + this.life;
};

Player.prototype.renderScore = function() {
    document.getElementById('score').innerHTML = "Score: " + this.score;
};

Player.prototype.updateScore = function(addedValue) {
    this.score += addedValue;
    document.getElementById('score').innerHTML = "Score: " + this.score;
};

var extraLive = function() {
    this.sprite = 'images/life2.png';
    this.x = Math.round(Math.random() * 4) * 101;
    this.y = (Math.round(Math.random() * 2) + 1) * 83;
    console.log(this.x + " " + this.y);
};

extraLive.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

extraLive.prototype.update = function() {

    if (this.x < player.x + 50 &&
        this.x + 70 > player.x &&
        this.y < player.y + 50 &&
        50 + this.y > player.y) {
        this.reset();
        player.life++;
    }
};

extraLive.prototype.reset = function() {
    this.x = -600;
};

extraLive.prototype.resetPosition = function() {
    this.x = Math.round(Math.random() * 5) * 101;
    this.y = (Math.round(Math.random() * 2) + 1) * 83;
};

var Gold = function(sprite, x, y) {
    this.sprite = sprite;
    this.x = Math.round(Math.random() * 5) * 101;
    this.y = Math.round(Math.random() * 2) * 83;
};

Gold.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gold.prototype.update = function() {
    if (this.x < player.x + 50 &&
        this.x + 50 > player.x &&
        this.y < player.y + 50 &&
        this.y + 50 > player.y) {
        this.x = -600;
        // var index = golds.indexOf(this);
        // console.log(index);
        // console.log(golds.length);
        // golds.splice(index,1);
        // console.log(golds.length);    
        player.eatenGolds++;
        player.updateScore(50);
    };
};

Gold.prototype.resetPosition = function() {
    this.x = Math.round(Math.random() * 5) * 101;
    this.y = Math.round(Math.random() * 2) * 83;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(-101, 83, 100), new Enemy(-101, 83 * 2, 90), new Enemy(-101, 83 * 3, 110)];
var player = new Player(2 * 101, 4 * 83, 20, 1, 3);
var extralife = new extraLive();
var golds = [new Gold('images/GemOrange.png')];
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});