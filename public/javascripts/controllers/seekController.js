"use strict";

angular
	.module('SeekController', ['seekServices'])
	.controller('SeekCtrl', seekCtrl);

function seekCtrl($scope, seekServ) {
	var vm          = this;
	vm.goods        = [];
	vm.onClickGoods = onClickGoods;

	activate();

	/////////////

	function activate() {
		// Use seekServices.js to get data from backend
		seekServ.getSeekData()
			.then(function(data) {
				// promise fulfilled, collect all goods datas
				vm.goods = data;
			}, function(error) {
				// promise rejected 
				console.log('error', error);
			});
	}

	// goods onClick event: change route to corrsponding gid
	function onClickGoods(gid) {
		window.location.href = "#/seek/" + gid;
	}
}
