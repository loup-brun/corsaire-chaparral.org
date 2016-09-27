(function (e, t) {
  t["nanoajax"] = e;
  var n = ["responseType", "withCredentials", "timeout", "onprogress"];
  e.ajax = function (e, a) {
    var u = e.headers || {},
      i = e.body,
      s = e.method || (i ? "POST" : "GET"),
      f = false;
    var d = r(e.cors);

    function c(e, t) {
      return function () {
        if (!f) {
          a(d.status === undefined ? e : d.status, d.status === 0 ? "Error" : d.response || d.responseText || t, d);
          f = true
        }
      }
    }
    d.open(s, e.url, true);
    var l = d.onload = c(200);
    d.onreadystatechange = function () {
      if (d.readyState === 4) l()
    };
    d.onerror = c(null, "Error");
    d.ontimeout = c(null, "Timeout");
    d.onabort = c(null, "Abort");
    if (i) {
      if (!t.FormData || !(i instanceof t.FormData)) {
        o(u, "Content-Type", "application/x-www-form-urlencoded")
      }
    }
    for (var p = 0, m = n.length, v; p < m; p++) {
      v = n[p];
      if (e[v] !== undefined) d[v] = e[v]
    }
    for (var v in u) d.setRequestHeader(v, u[v]);
    d.send(i);
    return d
  };

  function r(e) {
    if (e && t.XDomainRequest && !/MSIE 1/.test(navigator.userAgent)) return new XDomainRequest;
    if (t.XMLHttpRequest) return new XMLHttpRequest
  }

  function o(e, t, n) {
    e[t] = e[t] || n
  }
})({}, function () {
  return this
}());
