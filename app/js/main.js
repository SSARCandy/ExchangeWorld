'use strict';

const angular = require('angular');

// angular modules
require('angular-ui-router');
require('angular-material')
require('./templates');
require('./controllers/_index');
require('./services/_index');
require('./directives/_index');

// create and bootstrap application
angular.element(document).ready(function() {

	const requires = [
		'ui.router',
		'ngMaterial',
		'templates', //gulp-angular-templatecache
		'app.controllers',
		'app.services',
		'app.directives'
	];

	// mount on window for testing
	window.app = angular.module('app', requires);

	angular.module('app').constant('AppSettings', require('./constants'));

	angular.module('app').config(require('./on_config'));

	angular.module('app').run(require('./on_run'));

	angular.bootstrap(document, ['app']);

});