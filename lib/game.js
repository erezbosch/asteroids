(function () {
  window.Asteroids = window.Asteroids || {};
  var Game = Asteroids.Game = function (xDim, yDim) {
    this.xDim = xDim;
    this.yDim = yDim;
    this.numAsteroids = 10;
    this.addAsteroids();
    this.ships = [];
    this.addShip("#009900");
    this.addShip("#000099");
    this.bullets = [];
    this.backgroundImg = this.addBackground();
    this.score = 0;
  };

  Game.prototype.addShip = function (color) {
    this.ships.push(new Asteroids.Ship({
      pos: this.randomPosition(),
      game: this,
      color: color
    }));
  }

  Game.prototype.randomPosition = function () {
    return [Math.random() * this.xDim, Math.random() * this.yDim]
  }

  Game.prototype.addAsteroids = function () {
    asteroids = [];
    for (var i = 0; i < this.numAsteroids; i++) {
      this.addAsteroid({ pos: this.randomPosition()
      });
    }
    this.asteroids = asteroids;
  }

  Game.prototype.addAsteroid = function (options) {
    asteroids.push(new Asteroids.Asteroid({
      pos: options.pos,
      game: this,
      radius: options.radius
    }));
  }

  Game.prototype.allObjects = function () {
    return this.bullets.concat(this.asteroids, this.ships);
  }

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.xDim, this.yDim);
    ctx.drawImage(this.backgroundImg, 0, 0);
    ctx.fillStyle = "black";
    ctx.font = "44pt Arial ";
    ctx.fillText("Score: " + this.score, this.xDim / 2 - 90, 80);
    ctx.fillStyle = "blue";
    ctx.font = "44pt Arial ";
    ctx.fillText("Level: " + (this.numAsteroids - 9), this.xDim / 2 - 90, 130);
    this.allObjects().forEach(function(object) { object.draw(ctx); });
  }

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(object) { object.move(); });
  }

  Game.prototype.wrap = function (pos) {
    if (pos[0] < 0) {
      pos[0] += this.xDim;
    }
    if (pos[1] < 0) {
      pos[1] += this.yDim;
    }
    return [pos[0] % this.xDim, pos[1] % this.yDim];
  }

  Game.prototype.checkCollisions = function () {
    var objects = this.allObjects();
    for (var i = 0; i < objects.length; i++) {
      for (var j = i + 1; j < objects.length; j++) {
        if (objects[i].isCollidedWith(objects[j])) {
          objects[i].collideWith(objects[j]);
        }
      }
    }
  }

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    if (this.asteroids.length <= 1) {
      this.numAsteroids++;
      this.addAsteroids();
    }
  }

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      if (object.radius >= 18) {
        var numTimes = Math.floor(Math.random() * 5);
        for (var i = 0; i < numTimes; i++) {
          this.addAsteroid({
            pos: object.pos,
            game: object.game,
            radius: Math.random(10) + 5
          });
        }
      }
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
      this.score++;
    } else {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    }
  };

  Game.prototype.add = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else {
      this.bullets.push(obj);
    }
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return pos[0] < 0 ||
           pos[1] < 0 ||
           pos[0] >= this.xDim ||
           pos[1] >= this.yDim;
  }

  Game.prototype.addBackground = function () {
    var img = new Image();
    img.src = './dessert.jpg';
    return img;
  };
})()
