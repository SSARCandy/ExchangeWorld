'use strict';

function GoodsOverlay(map, good, $state, $mdSidenav) {
	this.element = null;
	this.good = good;

	this.onAdd = onAdd.bind(this, map, $state, $mdSidenav);
	this.draw = draw;
	this.onRemove = onRemove;
	this.setMap(map);
	this.good.marker.setVisible(false);
}

function onAdd(map, $state, $mdSidenav) {

	var div = document.createElement('div');
	div.style.borderStyle        = 'double';
	div.style.borderWidth        = '2px';
	div.style.borderColor        = '#388dc1';
	div.style.position           = 'absolute';
	div.style.backgroundImage    = `url(${this.good.photo_path[0]})`;
	div.style.backgroundSize     = 'cover';
	div.style.backgroundPosition = 'center';
	div.style.backgroundRepeat   = 'no-repeat';
	div.style.cursor             = 'pointer';

	this.element = div;
	google.maps.event.addDomListener(div, 'mouseup', function(e) {
		e.stopPropagation();
		$state.go('root.withSidenav.goods', {gid : this.good.gid});
		map.panTo(this.good.marker.getPosition());
		$mdSidenav('left').toggle();
	}.bind(this));

	this.getPanes().overlayMouseTarget.appendChild(div);
}

function draw() {
	const origin = this.getProjection().fromLatLngToDivPixel(this.good.marker.getPosition());

	var el = this.element;
	if (el) {
		el.style.left = origin.x - 100 + 'px';
		el.style.top = origin.y - 220 + 'px';
		el.style.width = 200 + 'px';
		el.style.height = 200 + 'px';
	}
}

function onRemove() {
	if (this.element) {
		this.element.parentNode.removeChild(this.element);
		this.element = null;
		this.good.marker.setVisible(true);
	}
}

module.exports = GoodsOverlay;
