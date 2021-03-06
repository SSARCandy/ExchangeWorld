'use strict';

const exchangeModule = require('./exchange.module');
const marked = require('marked');
marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: false,
	tables: false,
	breaks: true,
	pedantic: false,
	sanitize: false,
	smartLists: false,
	smartypants: false
});


exchangeModule.controller('ExchangeController', ExchangeController);

/** @ngInject */
function ExchangeController(
	exchangeList,
	mapSize,
	$state,
	$rootScope,
	exchangeService,
	colorThief,
	$stateParams,
	$interval,
	$mdDialog,
	$localStorage,
	$q,
	$mdSidenav
) {
	var vm             = this;
	var ct             = new colorThief.ColorThief();
	vm.goSeek          = ()=> $state.go('root.withSidenav.seek');
	vm.exchangeList    = exchangeList;
	vm.exchange        = undefined;
	vm.chatroom        = [];
	//vm.loadMore        = loadMore;
	vm.chatContent     = '';
	vm.onClickExchange = onClickExchange;
	vm.onClickComplete = onClickComplete;
	vm.onClickDelete   = onClickDelete;
	//vm.onSubmitChat    = onSubmitChat;
	vm.map             = { size: mapSize };

	vm.openLeftMenu    = () => $mdSidenav('left').toggle();
	vm.openRightMenu   = () => $mdSidenav('right').toggle();
	vm.closeleft       = () => $mdSidenav('left').close();
	vm.closeright      = () => $mdSidenav('right').close();

	////////////
	activate();
	
	function activate() {
		if($stateParams.uid !== $localStorage.user.uid.toString()) {
			$state.go('root.404');
		}
	}

	function onClickExchange(exchange) {
		exchangeService
			.getExchange($stateParams.uid, exchange.eid)
			.then(function(data) {
				vm.exchange = data;
				dominateColor(vm.exchange.owner_goods, 'other');
				dominateColor(vm.exchange.other_goods, 'me');

				vm.map.marker = `${vm.exchange.other_goods.position_y},${vm.exchange.other_goods.position_x}`;
			});

	}

	function onClickComplete(ev) {
		exchangeService
			.showCompleteExchange(ev, vm.exchange, ()=> { 
				$state.reload();
			});
	}

	function onClickDelete(ev) {
		let confirm = $mdDialog.confirm()
			.title('放棄這個交易')
			.content('您確定要放棄這個交易嗎？<br/>此動作無法恢復！')
			.ariaLabel('Delete Exchange')
			.ok('確定')
			.cancel('取消')
			.targetEvent(ev);

		if (confirm) {
			$mdDialog.show(confirm)
				.then(function() {
					exchangeService
						.deleteExchange(vm.exchange)
						.then(function(){
							$state.reload();
						});
				});
		}
	}

	function dominateColor(goods, who) {
		var image = document.getElementById(`img_${who}`);
		image.onload = ()=> {
			var pallete = ct.getPalette(image, 2);
			goods.bgStyle = {
				"background-color": `rgb(${pallete[0][0]}, ${pallete[0][1]}, ${pallete[0][2]})`,
				"border-radius": "20px",
				"margin": "0"
			};
			goods.fontcolor = [{
				"color": `rgb(${pallete[1][0]}, ${pallete[1][1]}, ${pallete[1][2]})`
			},{
				"color": `rgb(${pallete[2][0]}, ${pallete[2][1]}, ${pallete[2][2]})`
			}];
		};
	}

}
