(function () {
  window.Asteroids = window.Asteroids || {};
  var Ship = Asteroids.Ship = function (options) {
    Asteroids.MovingObject.call(this, {
      pos: options.pos,
      game: options.game,
      vel: [0, 0],
      radius: Ship.RADIUS,
      color: Ship.COLOR
    });

    this.dir = Math.PI / 2;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);
  Ship.RADIUS = 20;
  Ship.COLOR = "#009900";

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
    this.dir = Math.PI / 2;
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  Ship.prototype.fireBullet = function () {
    this.game.add(new Asteroids.Bullet({
      game: this.game,
      vel: this.bulletVel(),
      pos: this.pos.slice()}));
  };

  Ship.prototype.bulletVel = function () {
    var ourVel = this.vel.slice();
    var dirVelX = -2 * Math.cos(this.game.ship.dir);
    var dirVelY = -2 * Math.sin(this.game.ship.dir);
    return [ourVel[0] * 2 + dirVelX, ourVel[1] * 2 + dirVelY];
  };

  Ship.prototype.draw = function (ctx) {
    ctx.beginPath();
    var x = this.pos[0];
    var y = this.pos[1];
    ctx.moveTo(
      x - this.radius * Math.cos(this.dir),
      y - this.radius * Math.sin(this.dir)
    );
    ctx.lineTo(
      x - this.radius * Math.cos(this.dir + (3 * Math.PI / 4)),
      y - this.radius * Math.sin(this.dir + (3 * Math.PI / 4))
    );
    ctx.lineTo(
      x - this.radius * Math.cos(this.dir - (3 * Math.PI / 4)),
      y - this.radius * Math.sin(this.dir - (3 * Math.PI / 4))
    );
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
})();
