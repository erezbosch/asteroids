(function () {
  window.Asteroids = window.Asteroids || {};
  var Asteroid = Asteroids.Asteroid = function (options) {
    Asteroids.MovingObject.call(this, {
      pos: options.pos,
      game: options.game,
      vel: Asteroids.Util.randomVec(options.vel),
      radius: options.radius || Math.random() * 25 + 5,
      color: Asteroid.COLOR
    });
  }

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
  Asteroid.COLOR = "#000000";

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship && otherObject.freeTicks === 0) {
      this.game.lives--;
      if (this.game.lives <= 0) {
        otherObject.freeTicks = Number.MAX_VALUE;
      } else {
        otherObject.freeTicks = 150;
      }
    }
  }

})()
