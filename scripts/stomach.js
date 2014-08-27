function Stomach(brain) {
  'use strict';
  this.content = 0.2 + 0.6 * Math.random();
  var n = brain.addNeuron();
  setInterval(function () {
    n.stimulate(1 - this.content);
  }.bind(this), 2000);
}

Stomach.prototype.add = function (amount) {
  'use strict';
  this.content = Math.min(1, this.content + amount);
};