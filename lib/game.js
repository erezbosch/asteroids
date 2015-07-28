(function () {
  window.Asteroids = window.Asteroids || {};
  var Game = Asteroids.Game = function (xDim, yDim) {
    this.xDim = xDim;
    this.yDim = yDim;
    this.numAsteroids = 10;
    this.addAsteroids();
    this.ship = new Asteroids.Ship({
      pos: this.randomPosition(),
      game: this
    });
    this.bullets = [];
    this.backgroundImg = this.addBackground();
  };

  Game.prototype.randomPosition = function () {
    return [Math.random() * this.xDim, Math.random() * this.yDim]
  }

  Game.prototype.addAsteroids = function () {
    asteroids = [];
    for (var i = 0; i < this.numAsteroids; i++) {
      this.addAsteroid();
    }
    this.asteroids = asteroids;
  }

  Game.prototype.addAsteroid = function () {
    asteroids.push(new Asteroids.Asteroid({
      pos: this.randomPosition(),
      game: this
    }));
  }

  Game.prototype.allObjects = function () {
    return this.bullets.concat(this.asteroids, [this.ship]);
  }

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.xDim, this.yDim);
    ctx.drawImage(this.backgroundImg, 0, 0);
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
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
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
