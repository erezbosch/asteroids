(function () {
  window.Asteroids = window.Asteroids || {};
  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  GameView.prototype.start = function () {
    this.addKeyBindings();
    window.setInterval(function () {
      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this), 20);
  }

  GameView.prototype.addKeyBindings = function () {
    key('a', function () {
      this.game.ship.dir -= Math.PI / 8;
    }.bind(this));
    key('s', function () {
      this.game.ship.power([0, 1]);
    }.bind(this));
    key('w', function () {
      var velX = -1 * Math.cos(this.game.ship.dir);
      var velY = -1 * Math.sin(this.game.ship.dir);
      this.game.ship.power([velX, velY]);
    }.bind(this));
    key('d', function () {
      var velX = Math.cos(this.game.ship.dir);
      var velY = Math.sin(this.game.ship.dir);
      this.game.ship.dir += Math.PI / 8;
    }.bind(this));
    key('space', function () {
      this.game.ship.fireBullet();
    }.bind(this));
  }
})()
