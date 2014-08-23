function Stomach(brain) {
  'use strict';
  this.content = 0;
  this.onchange = new EventHandlerList();
  var n = brain.addNeuron();
  setInterval(function () {
    n.stimulate(1 - this.content);
  }.bind(this), 2000);
}

Stomach.prototype.add = function (amount) {
  'use strict';
  this.content = Math.min(1, this.content + amount);
  this.onchange.fire({content: this.content});
};