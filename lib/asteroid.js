(function () {
  window.Asteroids = window.Asteroids || {};
  var Asteroid = Asteroids.Asteroid = function (options) {
    Asteroids.MovingObject.call(this, {
      pos: options.pos,
      game: options.game,
      vel: Asteroids.Util.randomVec(5),
      radius: options.radius || Math.random() * 25 + 5,
      color: Asteroid.COLOR
    });
  }

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
  Asteroid.COLOR = "#000000";

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  }

})()
