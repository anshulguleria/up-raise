UpRaise.EmployeesIndexController = Ember.ArrayController.extend({
	actions: {
		
		showImportModal: function() {
			Bootstrap.ModalManager.open('importModal', 'Import from Excel', 'import-modal', this.get('importModalButtons'), this)
			setTimeout(function() {
				$('input[type=file]').bootstrapFileInput();
				$('input[type="file"]').ajaxfileupload({
				'action': '/api/employees/upload?companyId=' + window.location.hash.substring(2),
				valid_extensions : ['xlsx'],
				'onComplete': function(response) {
					if(response){
						if(response.status == false) {
							$('.error').html(response.message);
							$('.error').show();
						} else {
							$('.error').hide();
							Bootstrap.ModalManager.close('importModal');
							return window.location.assign('/admin/employees' + window.location.hash);
						}
					} else {
							$('.error').html('Invalid data. Please check the file and try again.');
							$('.error').show();
					}
					
				},
				'onStart': function() {
					
				},
				'onCancel': function() {
					console.log('no file selected');
				}
			});

			}, 10);
		}
	},
	importModalButtons: [
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  	]		
});