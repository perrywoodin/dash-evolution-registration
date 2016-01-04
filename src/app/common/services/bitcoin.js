angular.module('services.bitcoin', [])

	.service('BitcoinService', [function () {
		var model = this,
			network = bitcoin.networks.dash;

		model.verifyMessage = function(address,signature,message) {
			if(signature.length === 65){
				return bitcoin.message.verify(address, signature, message, network);
			}

			return false;
		};

	}])

;