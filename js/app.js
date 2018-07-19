// Enemies our player must avoid

const Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 55;
    this.step = 101;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < this.step * 5) {
        this.x += 200 * dt;
    }
    else {
        this.x = this.step * -1;
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
        this.y = (this.jump * 5) - 20;
        this.sprite = 'images/char-boy.png';
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(input) {
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
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const bug1 = new Enemy();
const allEnemies = [];
allEnemies.push(bug1);
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
