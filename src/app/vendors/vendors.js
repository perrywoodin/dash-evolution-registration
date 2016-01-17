angular.module('vendors', [
		'services.payment'
	])

	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('root.vendors', {
				url: '/vendors',
				views: {
					'main@root': {
						templateUrl: 'vendors/vendors.tpl.html',
						controller: 'VendorsCtrl as vendorsCtrl'
					}
				}
			});
	}])

	.controller('VendorsCtrl', ['$scope', '$log', '$uibModal', 'PaymentService', function ($scope, $log, $uibModal, PaymentService) {
		var vendorsCtrl = this;

		// ************************** BEGIN - Private Methods **************************
		var openDonationModal = function() {
			vendorsCtrl.modalInstance = $uibModal.open({
				templateUrl: 'vendors/vendors-donation-modal.tpl.html',
				controller: 'DonationCtrl as donationCtrl'
			});
		};
		// ************************** //END - Private Methods **************************

		

		// ************************** BEGIN - Public Methods **************************
		vendorsCtrl.donate = function() {
			openDonationModal();
		};
		// ************************** //END - Public Methods **************************
	}])

	.controller('DonationCtrl', ['$log', '$state', '$uibModalInstance', 'PaymentService', function ($log, $state, $uibModalInstance, PaymentService) {

		var donationCtrl = this;

		donationCtrl.showLoading = false;
		donationCtrl.showRfpMessage = false;
		donationCtrl.showSuccess = false;

		var donate = function(username) {
			donationCtrl.showLoading = true;
			donationCtrl.showRfpMessage = true;
			
			PaymentService.donate(username).then(function(response){

				if(response.message === 'success'){
					donationCtrl.showRfpMessage = false;
					donationCtrl.showSuccess = true;
				}

				donationCtrl.showLoading = false;
			});
		};

		donationCtrl.donate = function() {
			donate(donationCtrl.username);
		};

		donationCtrl.gotoSignupPage = function() {
			$uibModalInstance.close();
			$state.go('root.signup');
		};
		
		donationCtrl.cancel = function() {
			$uibModalInstance.close();
		};
		
	}])

;