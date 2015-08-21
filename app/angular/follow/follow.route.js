'use strict';

const followModule = require('./follow.module');
followModule.run(appRun);

/** @ngInject */
function appRun(routerHelper) {
	routerHelper.configureStates(getStates());
}

function getStates() {
	return [
		{
			state : 'root.withSidenav.follow',
			config : {
				url : '/profile/:uid/follow',
				bindToController: true,
				controller : 'FollowController',
				controllerAs: 'vm',
				templateUrl : 'follow/follow.html',
				resolve : {
					follow : function (followService, $stateParams) {
						return ;
					},
				},
			}
		}
	];
}
