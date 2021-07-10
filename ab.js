(function() {
  'use strict';
  var InitCarousel, Plugin, getRandomInt, old;

  getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  InitCarousel = (function() {
    function InitCarousel(element, options) {
      this.$element = $(element);
      this.data = this.$element.data();
      this.options = $.extend({}, this.DEFAULTS, this.data, options);
      this.randomStart = getRandomInt(1000, 5000);
      this.radomInterval = getRandomInt(5000, 9000);
      this.items = this.$element.find('.item');

      /*
      @items.css
        '-webkit-transition-duration': @radomInterval + 'ms'
        '-o-transition-duration': @radomInterval + 'ms'
        'transition-duration': @radomInterval + 'ms'
       */
      setTimeout(((function(_this) {
        return function() {
          return _this.$element.carousel({
            interval: _this.radomInterval
          });
        };
      })(this)), this.randomStart);
    }

    InitCarousel.VERSION = '1.0.0';

    InitCarousel.DEFAULTS = {
      toggle: 'initcarousel',
      eventName: 'initcarousel'
    };

    InitCarousel.prototype.createEventListener = function(name) {
      var event, eventType;
      eventType = name;
      event = $.Event(eventType + ':' + this.options.eventName);
      this.$element.trigger(event);
    };

    return InitCarousel;

  })();

  Plugin = function(option) {
    return this.each(function() {
      var $this, options;
      $this = $(this);
      options = $.extend({}, InitCarousel.DEFAULTS, option);
      new InitCarousel($this, options);
    });
  };

  old = $.fn.initcarousel;

  $.fn.initcarousel = Plugin;

  $.fn.initcarousel.Constructor = InitCarousel;

  $.fn.initcarousel.noConflict = function() {
    $.fn.initcarousel = old;
    return this;
  };

}).call(this);

$(document).ready(function(){
  $('[data-delay="carousel"]').initcarousel();
});
