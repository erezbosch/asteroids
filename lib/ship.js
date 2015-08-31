(function () {
  window.Asteroids = window.Asteroids || {};
  var Ship = Asteroids.Ship = function (options) {
    Asteroids.MovingObject.call(this, {
      pos: options.pos,
      game: options.game,
      vel: [0, 0],
      radius: Ship.RADIUS,
      color: options.fillColor
    });

    this.strokeColor = options.strokeColor;
    this.dir = Math.PI / 2;
    this.freeTicks = 0;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.RADIUS = 20;

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  Ship.prototype.fireBullet = function () {
      if (this.freeTicks === 0) {
        this.game.add(new Asteroids.Bullet({
          game: this.game,
          vel: this.bulletVel(),
          pos: this.pos.slice()
          })
        );
      }
  };

  Ship.prototype.bulletVel = function () {
    var ourVel = this.vel.slice();
    var dirVelX = -2 * Math.cos(this.dir);
    var dirVelY = -2 * Math.sin(this.dir);
    return [ourVel[0] + dirVelX, ourVel[1] + dirVelY];
  };

  Ship.prototype.shiftColor = function (hexColor) {
    shiftColor = hexColor.substring(0, 1);
    shiftColor += hexColor.substring(3, 7);
    return shiftColor + hexColor.substring(1, 3);
  }

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
    if (this.freeTicks > 0) {
      ctx.fillStyle = this.shiftColor(this.color);
      ctx.strokeStyle = this.shiftColor(this.strokeColor);
    } else {
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.strokeColor;
    }
    ctx.fill();
    ctx.stroke();
  }
})();
