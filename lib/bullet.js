(function () {
  window.Asteroids = window.Asteroids || {};
  
  var Bullet = Asteroids.Bullet = function (options) {
    Asteroids.MovingObject.call(this, {
      pos: options.pos,
      game: options.game,
      vel: options.vel,
      radius: Bullet.RADIUS,
      color: Bullet.COLOR
    });
  }

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);
  Bullet.RADIUS = 5;
  Bullet.COLOR = "#ff0000";

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  }

  Bullet.prototype.isWrappable = false;
})()
