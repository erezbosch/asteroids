(function () {
  window.Asteroids = window.Asteroids || {};
  var Util = Asteroids.Util = function () {};

  Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  }

  Util.randomVec = function(length) {
    var x = (2 * Math.random() - 1) * length;
    var y = (2 * Math.random() - 1) * length;
    return [x, y];
  }
})()
