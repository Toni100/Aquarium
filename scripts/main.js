var aquarium = new Aquarium(document.getElementById('water')),
  networkView = new NetworkView(document.getElementById('brain'));
while (aquarium.fish.length < 8) {
  aquarium.addFish();
}
while (aquarium.food.length < 18) {
  aquarium.addFood();
}
aquarium.onclickfish.add(function (event) {
  'use strict';
  networkView.network = event.data.fish.brain;
});