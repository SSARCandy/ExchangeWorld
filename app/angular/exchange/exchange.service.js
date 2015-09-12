'use strict';

const exchangeModule = require('./exchange.module');
const _              = require('lodash');

exchangeModule.service('exchangeService', exchangeService);

/** @ngInject */
function exchangeService(Restangular, $q, $mdDialog) {
	var service = {
		getExchange,
		getAllExchange,
		deleteExchange,
		agreeExchange,
		completeExchange,
		showCompleteExchange,

		getChat,
		postChat,
	};
	return service;

	/** get exchange data */
	function getAllExchange(owner_uid) {
		const defer = $q.defer();

		Restangular
			.all('exchange/of')
			.getList({
				owner_uid: owner_uid
			})
			.then(function(data) {
				if (_.isArray(data)) {
					defer.resolve(data);
				}
			})
			.catch(function(error) {
				return exception.catcher('[Exchange Service] getAllExchange error: ')(error);
			});
		return defer.promise;
	}

	function getExchange(eid) {
		const defer = $q.defer();

		Restangular
			.all('exchange')
			.getList({eid: eid})
			.then(function(data) {
				console.log(data);
				data = _.isArray(data) ? data[0] : data;
				data.goods.forEach(function(goods) {
					if (_.isString(goods.photo_path)) goods.photo_path = JSON.parse(goods.photo_path);
				});
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[Exchange Service] getExchange error: ')(error);
			});
		return defer.promise;
	}

	function agreeExchange(exchange, gid) {
		const defer = $q.defer();

		exchange.route = 'exchange/agree';
		exchange.goods_gid = (gid === exchange.goods1_gid) 
			? exchange.goods1_gid 
			: exchange.goods2_gid;

		exchange.agree = 'true';

		// console.log(exchange);
		exchange
			.put()
			.then(function(data) {
				defer.resolve(data);
				if (
					data.goods1_agree && 
					data.goods2_agree
				) {
					completeExchange(exchange);
				}
			})
			.catch(function(error) {
				return exception.catcher('[exchange Service] agreeExchange error: ')(error);
			});
		return defer.promise;
	}

	/**
	 * complete exchange
	 */
	function completeExchange(exchange) {
		const defer = $q.defer();

		exchange.route = 'exchange/complete'; // PUT of "complete" is "api/exchange/complete"

		exchange
			.put()
			.then(function(data) {
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[exchange Service] completeExchange error: ')(error);
			});

		return defer.promise;
	}

	/**
	 * drop exchange
	 * one of the user reject the exchage.
	 */
	function deleteExchange(eid) {
		const defer = $q.defer();

		Restangular
			.all('exchange')
			.getList({eid: eid})
			.then(function(data) {
				if (_.isArray(data)) {
					var exchange = data[0];
					exchange.route = 'exchange/drop'; // PUT of "drop" is "api/exchange/drop"
					//console.log(exchange);
					exchange.put();
				}
			})
			.catch(function(error) {
				return exception.catcher('[Exchange Service] deleteExchange error: ')(error);
			});
		return defer.promise;
	}

	function getChat(eid, number, offset) {
		const defer = $q.defer();

		Restangular
			.all('chatroom')
			.getList({
				eid    : eid,
				from   : offset,
				number : number,
			})
			.then(function(data) {
				//console.log(data);
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[Exchange Service] getChatroom error: ')(error);
			});
		return defer.promise;
	}

	function postChat(newChat) {
		const defer = $q.defer();

		Restangular
			.all('chatroom')
			.post({
				eid        : newChat.eid,
				sender_uid : newChat.sender_uid,
				content    : newChat.content,
			})
			.then(function(data) {
				defer.resolve(data);
			})
			.catch(function(error) {
				return exception.catcher('[Exchange Service] postChat error: ')(error);
			});
		return defer.promise;
	}

	function showCompleteExchange(ev, thisExchange, myid) {
		$mdDialog.show({
			clickOutsideToClose: true,
			templateUrl: 'exchange/exchange.complete.html',
			controllerAs: 'vm',
			controller: onCompleteController,
			locals: {
				thisExchange: thisExchange,
				myid: myid,
			}
		});
		function onCompleteController($mdDialog, logger, exchangeService, thisExchange, myid) {
			const vm        = this;
			vm.thisExchange = thisExchange;
			vm.myuid        = parseInt(myid, 10);
			vm.mygid        = '';
			vm.confirm      = onConfirm;
			vm.cancel       = onCancel;

			activate();

			function activate() {
				// console.log(vm.thisExchange.goods[0].owner_uid);
				// console.log(vm.myuid);
				vm.mygid = (vm.thisExchange.goods[0].owner_uid === vm.myuid)
					? vm.thisExchange.goods[0].gid
					: vm.thisExchange.goods[1].gid;
				// console.log(vm.mygid);
			}


			function onConfirm(scores) {
				$mdDialog
					.hide(scores)
					.then(function(scores) {
						
						exchangeService
							.agreeExchange(thisExchange, vm.mygid)
							.then(function(data) {
								logger.success('成功評價此交易', data, 'DONE');
							});
					});
			}
			function onCancel() {
				$mdDialog.cancel();
			};
		}
	
	}
}
