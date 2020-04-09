"use strict";
var _baseComponent = _interopRequireDefault(require("../helpers/baseComponent")),
  _classNames2 = _interopRequireDefault(require("../helpers/classNames")),
  _eventsMixin = _interopRequireDefault(require("../helpers/eventsMixin"));

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}

function _toConsumableArray(e) {
  return _arrayWithoutHoles(e) || _iterableToArray(e) || _nonIterableSpread()
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance")
}

function _iterableToArray(e) {
  if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
}

function _arrayWithoutHoles(e) {
  if (Array.isArray(e)) {
    for (var t = 0, a = new Array(e.length); t < e.length; t++) a[t] = e[t];
    return a
  }
}

function _defineProperty(e, t, a) {
  return t in e ? Object.defineProperty(e, t, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = a, e
}(0, _baseComponent.default)({
  behaviors: [(0, _eventsMixin.default)()],
  relations: {
    "../field/index": {
      type: "ancestor"
    }
  },
  properties: {
    prefixCls: {
      type: String,
      value: "wux-rater"
    },
    max: {
      type: Number,
      value: 5,
      observer: function() {
        this.setValue(this.data.inputValue)
      }
    },
    icon: {
      type: String,
      value: ""
    },
    star: {
      type: String,
      value: "★"
    },
    defaultValue: {
      type: Number,
      value: 0
    },
    value: {
      type: Number,
      value: 0,
      observer: function(e) {
        this.data.controlled && this.setValue(e)
      }
    },
    activeColor: {
      type: String,
      value: "#ffc900"
    },
    margin: {
      type: Number,
      value: 2
    },
    fontSize: {
      type: Number,
      value: 25
    },
    disabled: {
      type: Boolean,
      value: !1
    },
    allowHalf: {
      type: Boolean,
      value: !1
    },
    allowClear: {
      type: Boolean,
      value: !1
    },
    allowTouchMove: {
      type: Boolean,
      value: !1
    },
    controlled: {
      type: Boolean,
      value: !1
    }
  },
  data: {
    inputValue: 0
  },
  computed: {
    classes: ["prefixCls, disabled", function(e, t) {
      return {
        wrap: (0, _classNames2.default)(e, _defineProperty({}, "".concat(e, "--disabled"), t)),
        star: "".concat(e, "__star"),
        box: "".concat(e, "__box"),
        inner: "".concat(e, "__inner"),
        outer: "".concat(e, "__outer"),
        icon: "".concat(e, "__icon")
      }
    }]
  },
  observers: _defineProperty({}, "inputValue, max, activeColor", function(r, e, n) {
    var t = _toConsumableArray(new Array(e)).map(function(e, t) {
        return t
      }),
      a = t.reduce(function(e, t, a) {
        return [].concat(_toConsumableArray(e), [a <= r - 1 ? n : "#ccc"])
      }, []),
      i = r.toString().split("."),
      o = 1 === i.length ? [i[0], 0] : i;
    this.setData({
      stars: t,
      colors: a,
      cutIndex: 1 * o[0],
      cutPercent: 10 * o[1]
    })
  }),
  methods: {
    updated: function(e) {
      this.hasFieldDecorator || this.data.inputValue !== e && this.setData({
        inputValue: e
      })
    },
    setValue: function(e) {
      var t = this.data.max,
        a = e <= 0 ? 0 : t < e ? t : e;
      this.updated(a)
    },
    updateHalfStarValue: function(i, o, l) {
      var u = this,
        e = this.data.prefixCls;
      wx.createSelectorQuery().in(this).selectAll(".".concat(e, "__star")).boundingClientRect(function(e) {
        if (!e.filter(function(e) {
            return !e
          }).length) {
          var t = e[i],
            a = t.left,
            r = t.width,
            n = o - a < r / 2 ? i + .5 : i + 1;
          l.call(u, n, i)
        }
      }).exec()
    },
    onTap: function(e) {
      var r = this,
        t = e.currentTarget.dataset.index,
        a = this.data,
        n = a.inputValue,
        i = a.disabled,
        o = a.allowHalf,
        l = a.allowClear;
      if (!i)
        if (o) this.updateHalfStarValue(t, e.detail.x, function(e, t) {
          var a = l && e === n;
          r.onChange(a ? 0 : e, t)
        });
        else {
          var u = t + 1,
            s = l && u === n;
          this.onChange(s ? 0 : u, t)
        }
    },
    onChange: function(e, t) {
      this.data.controlled || this.setValue(e), this.triggerEvent("change", {
        value: e,
        index: t
      })
    },
    onTouchMove: function(e) {
      var s = this,
        t = this.data,
        a = t.disabled,
        c = t.allowHalf,
        r = t.allowTouchMove;
      if (!a && r) {
        var f = e.changedTouches[0].pageX,
          n = this.data.prefixCls;
        wx.createSelectorQuery().in(this).selectAll(".".concat(n, "__star")).boundingClientRect(function(e) {
          if (!e.filter(function(e) {
              return !e
            }).length) {
            var t = e[0],
              a = t.left,
              r = t.width,
              n = e.map(function(e) {
                return e.width
              }).reduce(function(e, t) {
                return e + t
              }),
              i = f - a,
              o = Math.ceil(i / r);
            if (0 < i && i < n) {
              var l = o - 1;
              if (c) {
                var u = e[l];
                o = f - u.left < u.width / 2 ? o - .5 : o
              }
              s.onChange(o, l)
            }
          }
        }).exec()
      }
    }
  },
  attached: function() {
    var e = this.data,
      t = e.defaultValue,
      a = e.value,
      r = e.controlled ? a : t;
    this.setValue(r)
  }
});