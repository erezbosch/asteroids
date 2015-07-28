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
      this.game.ships[0].dir -= Math.PI / 8;
    }.bind(this));
    key('s', function () {
      var velX = Math.cos(this.game.ships[0].dir);
      var velY = Math.sin(this.game.ships[0].dir);
      this.game.ships[0].power([velX, velY]);
    }.bind(this));
    key('w', function () {
      var velX = -1 * Math.cos(this.game.ships[0].dir);
      var velY = -1 * Math.sin(this.game.ships[0].dir);
      this.game.ships[0].power([velX, velY]);
    }.bind(this));
    key('d', function () {
      this.game.ships[0].dir += Math.PI / 8;
    }.bind(this));
    key('space', function () {
      this.game.ships[0].fireBullet();
    }.bind(this));

    key('left', function () {
      this.game.ships[1].dir -= Math.PI / 8;
    }.bind(this));
    key('down', function () {
      var velX = Math.cos(this.game.ships[1].dir);
      var velY = Math.sin(this.game.ships[1].dir);
      this.game.ships[1].power([velX, velY]);
    }.bind(this));
    key('up', function () {
      var velX = -1 * Math.cos(this.game.ships[1].dir);
      var velY = -1 * Math.sin(this.game.ships[1].dir);
      this.game.ships[1].power([velX, velY]);
    }.bind(this));
    key('right', function () {
      this.game.ships[1].dir += Math.PI / 8;
    }.bind(this));
    key('enter', function () {
      this.game.ships[1].fireBullet();
    }.bind(this));
  }
})()
