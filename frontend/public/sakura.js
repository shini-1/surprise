/*!
 * Sakura.js 1.1.1
 * Vanilla JS version of jQuery-Sakura: Make it rain sakura petals.
 * https://github.com/jhammann/sakura
 *
 * Copyright 2019-2022 Jeroen Hammann
 *
 * Released under the MIT License
 */
"use strict";

var Sakura = function Sakura(selector, options) {
  var _this = this;

  if (typeof selector === 'undefined') {
    throw new Error('No selector present. Define an element.');
  }

  this.el = document.querySelector(selector);

  var defaults = {
    className: 'sakura-p',
    fallSpeed: 1,
    maxSize: 14,
    minSize: 10,
    delay: 300,
    colors: [{
      gradientColorStart: 'rgba(255, 183, 197, 0.9)',
      gradientColorEnd: 'rgba(255, 197, 208, 0.9)',
      gradientColorDegree: 120
    }],
    lifeTime: 0
  };

  var extend = function extend(originalObj, newObj) {
    Object.keys(originalObj).forEach(function (key) {
      if (newObj && Object.prototype.hasOwnProperty.call(newObj, key)) {
        originalObj[key] = newObj[key];
      }
    });
    return originalObj;
  };

  this.settings = extend(defaults, options);
  this.petalsWeak = new Map();

  setInterval(function () {
    if (!_this.settings.lifeTime) return;
    var keysForRemove = [];
    var stamp = Date.now();

    _this.petalsWeak.forEach(function (value, key) {
      if (key + _this.settings.lifeTime < stamp) {
        keysForRemove.push(key);
        value.remove();
      }
    });

    keysForRemove.forEach(function (key) {
      _this.petalsWeak.delete(key);
    });
  }, 1000);

  this.el.style.overflowX = 'hidden';

  function randomArrayElem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function PrefixedEvent(element, type, callback) {
    ['webkit', 'moz', 'MS', 'o', ''].forEach(function (p) {
      var animType = type;
      if (!p) animType = type.toLowerCase();
      element.addEventListener(p + animType, callback, false);
    });
  }

  function elementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
      rect.bottom >= 0 &&
      rect.right >= 0
    );
  }

  this.createPetal = function () {
    if (_this.el.dataset.sakuraAnimId) {
      setTimeout(function () {
        window.requestAnimationFrame(_this.createPetal);
      }, _this.settings.delay);
    }

    var animationNames = {
      blowAnimations: ['blow-soft-left', 'blow-medium-left', 'blow-soft-right', 'blow-medium-right'],
      swayAnimations: ['sway-0', 'sway-1', 'sway-2', 'sway-3', 'sway-4', 'sway-5', 'sway-6', 'sway-7', 'sway-8']
    };

    var blowAnimation = randomArrayElem(animationNames.blowAnimations);
    var swayAnimation = randomArrayElem(animationNames.swayAnimations);
    var fallTime = (document.documentElement.clientHeight * 0.007 + Math.round(Math.random() * 5)) * _this.settings.fallSpeed;

    var animationsArr = ["fall " + fallTime + "s linear 0s 1", blowAnimation + " " + ((fallTime > 30 ? fallTime : 30) - 20 + randomInt(0, 20)) + "s linear 0s infinite", swayAnimation + " " + randomInt(2, 4) + "s linear 0s infinite"];
    var animations = animationsArr.join(', ');

    var petal = document.createElement('div');
    petal.classList.add(_this.settings.className);
    var height = randomInt(_this.settings.minSize, _this.settings.maxSize);
    var width = height - Math.floor(randomInt(0, _this.settings.minSize) / 3);

    var color = randomArrayElem(_this.settings.colors);
    petal.style.background = "linear-gradient(" + color.gradientColorDegree + "deg, " + color.gradientColorStart + ", " + color.gradientColorEnd + ")";
    petal.style.webkitAnimation = animations;
    petal.style.animation = animations;
    petal.style.borderRadius = "10px 0 10px 0";
    petal.style.height = height + "px";
    petal.style.width = width + "px";
    petal.style.left = (Math.random() * window.innerWidth) + "px";
    petal.style.top = "-20px";

    PrefixedEvent(petal, 'AnimationEnd', function () {
      petal.remove();
    });

    PrefixedEvent(petal, 'AnimationIteration', function () {
      if (!elementInViewport(petal)) petal.remove();
    });

    _this.petalsWeak.set(Date.now(), petal);
    _this.el.appendChild(petal);
  };

  this.el.setAttribute('data-sakura-anim-id', window.requestAnimationFrame(this.createPetal));
};

Sakura.prototype.start = function () {
  var animId = this.el.dataset.sakuraAnimId;
  if (!animId) {
    this.el.setAttribute('data-sakura-anim-id', window.requestAnimationFrame(this.createPetal));
  }
};

Sakura.prototype.stop = function (graceful) {
  var _this2 = this;
  var animId = this.el.dataset.sakuraAnimId;
  if (animId) {
    window.cancelAnimationFrame(animId);
    this.el.setAttribute('data-sakura-anim-id', '');
  }
  if (!graceful) {
    setTimeout(function () {
      var petals = document.getElementsByClassName(_this2.settings.className);
      while (petals.length > 0) {
        petals[0].parentNode.removeChild(petals[0]);
      }
    }, this.settings.delay + 50);
  }
};
