'use strict';

const loginModule = require('./login.module');

loginModule.controller('LoginController', LoginController);

/** @ngInject */
function LoginController(
	auth,
	exception,
	$scope,
	$state,
	$mdDialog,
	$rootScope,
	$localStorage
) {
	const vm = this;
	vm.closePopup = closePopup;
	vm.goSignup = goSignup;
	vm.login = login;
	vm.loading = false;
	vm.form = {
		id: '',
		pwd: ''
	};

	async function login(fb) {
		try {
			vm.loading = true;
			let user = await auth.login(fb, vm.form.id, vm.form.pwd);
			$localStorage.user = user;
			$rootScope.user = user;
			vm.loading = false;
			$state.go('root.withSidenav.seek', {}, { reload: true });

			closePopup();
		} catch (err) {
			if (!err.data.token) exception.catcher('帳密組合錯誤或無此帳號')(err);
			else exception.catcher('唉呀出錯了！')(err);
			vm.loading = false;
		}
	}

	function goSignup() {
		if ($scope.instance) {
			$mdDialog.hide();
			$rootScope.openSignupModal();
		} else {
			$state.go('root.oneCol.signup');
		}
	}

	function closePopup() {
		if ($scope.instance) $mdDialog.hide();
	}
}
