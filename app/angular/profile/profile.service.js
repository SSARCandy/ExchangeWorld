'use strict';

const profileModule = require('./profile.module');
const _             = require('lodash');

profileModule.service('profileService', profileService);

/** @ngInject */
function profileService(Restangular, $q, facebookService) {
	var service = {
		getProfile,
		editProfile,
		addFollowing,
	};

	return service;

	//////////
	function getProfile(_uid) {
		const defer = $q.defer();

		Restangular
			.all('user/profile')
			.getList({ uid : _uid })
			.then(function(data) {
				facebookService 
					.getLargePicture(data.fb_id || data[0].fb_id) 
					.then(function(img) { 
						if (_.isArray(data)) {
							data[0].largePic = img.data.url;
							defer.resolve(data[0]);
						} else if (_.isObject(data)) {
							data.largePic = img.data.url;
							defer.resolve(data);
						}
					});
			})
			.catch(function(error) {
				return exception.catcher('[Profiles Service] getProfile error: ')(error);
			});
		return defer.promise;
	}

	function editProfile() {

		return ;
	}

	function addFollowing(my_uid, following_uid) {
		Restangular
			.all('user/profile/following/post')
			.post({
				my_uid: my_uid,
				following_uid: following_uid,
			});
		Restangular
			.all('user/profile/follower/post')
			.post({
				my_uid: following_uid,
				follower_uid: my_uid,
			});
	}

}
