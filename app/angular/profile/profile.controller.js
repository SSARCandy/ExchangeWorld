'use strict';

const profileModule = require('./profile.module');
const _             = require('lodash');
profileModule.controller('ProfileController', ProfileController);

/** @ngInject */
function ProfileController(
	profile,
	profileService,
	auth,
	message,
	$scope,
	$state,
	$stateParams,
	$localStorage
) {
	var vm                 = this;
	const types            = ['following', 'follower'];
	vm.profile             = profile;
	vm.largePic            = '';
	vm.isLoggedIn          = Boolean($localStorage.user);
	vm.isMe                = vm.isLoggedIn && (profile.uid === $localStorage.user.uid);
	vm.myStar              = [];
	vm.myGoodsPending      = [];
	vm.myGoodsExchanged    = [];
	vm.onClickFollow       = onClickFollow;
	vm.onClickAddFollowing = onClickAddFollowing;
	vm.onClickSendMsg      = onClickSendMsg;
	vm.followerCount       = profile.followers.length;
	vm.isFollowed          = false;
	vm.isReadOnly          = true;
	vm.onClickEdit         = function onClickEdit() { vm.isReadOnly = !vm.isReadOnly; };
	vm.onClickSave         = onClickSave;
	vm.getNumber           = number => new Array(number);
	$scope.onClickGoods    = onClickGoods;


	/////////////
	activate();

	function activate() {
		if (vm.isLoggedIn) {
			if (_.findWhere(profile.followers, { follower_uid: $localStorage.user.uid })) {
				vm.isFollowed = true;
			}
		}

		auth
			.getLoginState()
			.then(function(data) {
				if (data) {
					vm.isMe = (profile.uid === data.uid);
					profileService
						.getMyGoods($stateParams.uid)
						.then(function(data) {
							vm.myGoodsPending   = data.filter(function(g) { return g.status === 0; });
							vm.myGoodsExchanged = data.filter(function(g) { return g.status === 1; });
						});
					profileService
						.getMyStar($stateParams.uid)
						.then(function(data) {
							vm.myStar = data;
						});
				} else {
					vm.isMe = false;
					vm.isLoggedIn = false;
				}
			});
	}

	function onClickFollow(uid, index) {
		$state.go('root.withSidenav.follow', {
			uid: uid,
			type: types[index]
		});
	}

	function onClickAddFollowing() {
		if (vm.isFollowed) {
			profileService.deleteFollowing($localStorage.user.uid, profile.uid);
			vm.followerCount--;
			vm.isFollowed = false;
		} else {
			profileService.addFollowing($localStorage.user.uid, profile.uid);
			vm.followerCount++;
			vm.isFollowed = true;
		}
	}

	function onClickSendMsg(ev, uid) {
		var msg = {
			sender_uid   : uid,
			user         : profile,
			receiver_uid : $localStorage.user.uid,
			isNewMsg     : true,
		};
		message.showMessagebox(ev, msg);
	}

	function onClickSave() {
		vm.isReadOnly = !vm.isReadOnly;

		profileService
			.editProfile(vm.profile)
			.then(function(data) {
				console.log(data);
			});
	}

	function onClickGoods(gid) {
		$state.go('root.withSidenav.goods', { gid : gid });
	}

}
