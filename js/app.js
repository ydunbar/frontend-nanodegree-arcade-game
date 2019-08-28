// Created following tutorial by Matthew Cranford: https://matthewcranford.com/arcade-game-walkthrough-part-1-starter-code-breakdown/

// Enemies our player must avoid

const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y + 55;
    this.step = 101;
    this.speed = speed;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //set boundary and loop
    if (this.x < this.boundary) {
        this.x += this.speed * dt;
    }
    else {
        this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Hero {
    constructor() {
        this.step = 101;
        this.jump = 83;
        this.x = this.step * 2;
        this.y = (this.jump * 4) + 55;
        this.sprite = 'images/char-boy.png';
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(input) {
        //increment moves within boundary
        switch(input) {
            case 'left':
            if (this.x > 0) {
                this.x -= this.step;
            }
            break;
            case 'right':
            if (this.x < this.step * 4) { 
                this.x += this.step;
            }
            break;
            case 'up':
            if (this.y > 0) {
                this.y -= this.jump
            }
            break;
            case 'down':
            if (this.y < this.jump * 4) {
                this.y += this.jump;
            }
            break;
        }
    }
    update() {
        for (let enemy of allEnemies) {
            //check for collision/lose condition
            if (this.y === enemy.y && (enemy.x + enemy.step - 25 > this.x && enemy.x < this.x + this.step - 25)) {
                alert('You Lost!');
                reset();
            }
        }
        //win condition
        if (this.y < 55) {
            alert('You Win!');
            reset();
        }
    }
}

//resets player position after win/lose condition
function reset() {
    player.x = player.step * 2;
    player.y = (player.jump * 4) + 55;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-200, 83, 300);
const bug3 = new Enemy(-300, 166, 200);
const allEnemies = [];
allEnemies.push(bug1,bug2,bug3);
const player = new Hero();

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
