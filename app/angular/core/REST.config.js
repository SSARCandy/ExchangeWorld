"use strict";

const coreModule = require('./core.module');
coreModule.config(RestConfig);

function RestConfig(RestangularProvider) {
	RestangularProvider.setBaseUrl('/api');

	// set params for multiple methods at once
	// Restangular.setDefaultRequestParams(['remove', 'post'], {accessToken: "secret key"});
}