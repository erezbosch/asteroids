(function () {
  window.Asteroids = window.Asteroids || {};

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  }

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.game.remove(this);
      }
    }
  }

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    xDistance = this.pos[0] - otherObject.pos[0]
    yDistance = this.pos[1] - otherObject.pos[1]
    distanceBetweenCenters = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    return distanceBetweenCenters < (this.radius + otherObject.radius);
  }

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.collideWith = function (otherObject) {

  }
})()
