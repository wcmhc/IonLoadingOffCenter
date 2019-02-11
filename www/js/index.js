document.addEventListener('deviceready', function() {
	presentLoading();
}, false);

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function presentLoading() {
  return _presentLoading.apply(this, arguments);
}

function _presentLoading() {
  _presentLoading = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var loadingController, loadingElement;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            loadingController = document.querySelector('ion-loading-controller');
            _context.next = 3;
            return loadingController.componentOnReady();

          case 3:
            _context.next = 5;
            return loadingController.create({
              message: 'Please wait...',
              spinner: 'crescent'
            });

          case 5:
            loadingElement = _context.sent;
            _context.next = 8;
            return loadingElement.present();

          case 8:
            return _context.abrupt("return", _context.sent);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _presentLoading.apply(this, arguments);
}