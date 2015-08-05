common = {
  getUrlParams: function (url) {
    var params = {};
    (url + '?').split('?')[1].split('&').forEach(function (pair) {
      pair = (pair + '=').split('=').map(decodeURIComponent);
      if (pair[0].length) {
        params[pair[0]] = pair[1];
      }
    });
    return params;
  }
};
