module.exports = (func) => {
  return function (req, res, next) {
    func(req, res, next).catch(next);
  };
};

//? Other way of doing it
// function catchAsync(fn) {
//   return function (req, res, next) {
//     fn(req, res, next).catch((e) => next(e));
//   };
// }

// module.exports = catchAsync;
