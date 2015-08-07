"use strict";

const layoutModule = require('./layout.module');
layoutModule.directive('sidenav', sidenavDirective);

function sidenavDirective() {

	const directive = {
		restrict : 'E',
		transclude : true,
		templateUrl : 'layout/sidenav.html',
		bindToController : true,
		controller : 'NavbarController',
		controllerAs : 'vm'
	};

	return directive;
}
