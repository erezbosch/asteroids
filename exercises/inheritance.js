Function.prototype.inherits = function (ParentClass) {
  var Surrogate = function () {};
  Surrogate.prototype = ParentClass.prototype;
  this.prototype = new Surrogate();
}
