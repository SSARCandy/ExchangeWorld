'use strict';

const goodsModule = require('./goods.module');
goodsModule.controller('GoodsController', GoodsCtrl);

/** @ngInject */
function GoodsCtrl($scope, goodsService, $stateParams, $state) {
	var vm         = this;
	vm.goodsData   = [];
	vm.onClickUser = onClickUser;

	activate();

	/////////////

	function activate() {
		// get data from goodsServices.js
		goodsService.getGoodsData($stateParams.gid)
			.then(function(data){
				//promise fulfilled (successed)
				vm.goodsData = data;
			}).catch(function(error){
				//promise rejected (failed)
				console.log('error', error);
			});
	}

	// define onClick event on goods owner
	function onClickUser(fb_id) {
		$state.go('Profile', {fid: fb_id});
	}
}