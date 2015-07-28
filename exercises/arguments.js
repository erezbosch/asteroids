function sum() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

Function.prototype.myBind = function (context) {
  var fn = this;
  var argsArray = Array.prototype.slice.call(arguments, 1);
  return function () {
    var secondArgsArray = [].slice.call(arguments, argsArray.length);
    fn.apply(context, argsArray.concat(secondArgsArray));
  };
}

function curriedSum(numArgs) {
  var numbers = [];
  return function _curriedSum(number) {
    numbers.push(number);
    if (numbers.length === numArgs) {
      sum = 0;
      for (var i = 0; i < numbers.length; i++) {
        sum += numbers[i];
      }
      return sum;
    } else {
      return _curriedSum;
    }
  }
}

Function.prototype.curry = function (numArgs) {
  var arrayArgs = [];
  var fn = this;

  return function _collectArgs (arg) {
    arrayArgs.push(arg);
    if (arrayArgs.length === numArgs) {
      return fn.apply(fn, arrayArgs);
    } else {
      return _collectArgs;
    }
  }
};
