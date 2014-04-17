UpRaise.GoalsController = Ember.ArrayController.extend({
	needs: ['reviewdocument'],
	actions: {
		showAddGoalRow: function() {
			this.set('showAddRow', true);
		},
		showResetModal: function() {
			return Bootstrap.ModalManager.open('resetModal', 'Warning', 'reset-modal', this.get('resetModalButtons'), this);
		},
		showRejectModal: function() {			 
			return Bootstrap.ModalManager.show('rejectModal');			
		},
		showImportModal: function() {
			Bootstrap.ModalManager.open('importModal', 'Import from Excel', 'import-modal', this.get('importModalButtons'), this)
			setTimeout(function() {
				$('input[type=file]').bootstrapFileInput();
				$('input[type="file"]').ajaxfileupload({
				'action': '/api/goals/upload',
				'params': {
					'extra': 'info'
				},
				valid_extensions : ['xlsx'],
				'onComplete': function(response) {
					if(response){
						if(response.status == false) {
							$('.error').html(response.message);
							$('.error').show();
						} else {
							$('.error').hide();
							Bootstrap.ModalManager.close('importModal');
							return window.location.assign('/dashboard');
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
		},
		cancelRow: function() {
	      this.set('showAddRow', false);	      
	    },
		saveRow: function() {
			
			var weight = this.get('weight');
			if (!weight || !weight.trim()) { 
				console.log('no weight found')
				return; 
			}

			var goal = this.store.createRecord('goal', {
				index: this.get('nextIndex'),
				kra: this.get('kra'),
				type: this.get('type'),
				description: this.get('description'),
				weight: this.get('weight')
			});
			
			 this.store.find('reviewdocument',this.get('controllers.reviewdocument.content.id'))
				.then($.proxy(function(kra){

					goal.save().then(function() {
							
						
						if(!Em.get(kra,'goals')){

							Em.set(kra,'goals',[]);
						}
						Em.get(kra,'goals').addObject(goal);
						kra.set('type' ,'request');
						kra.save();
					});
								
					this.set('showAddRow',false);

					
				},this));

		},
		reset: function() {
			var kra = this.get('controllers.reviewdocument.content');
			$.get('/api/reset/' + Em.get(kra,'id')).then($.proxy(function(data){
				
				window.location.reload();

			},this));
		},
		requestApproval: function() {
			$.get('/api/requestApproval').then(function(){
				alert("submited for approval")
			});
		},
		approve: function() {
			var kra = this.get('controllers.reviewdocument.content');
			$.get('/api/approve/' + Em.get(kra,'id')).then(function(){
				window.location.assign('/teamusers');
			});
		},
		reject: function() {
			var content = this.get('rejecttext');

			if(content){ 
				var kra = this.get('controllers.reviewdocument.content');
				$.post('/api/reject/' + Em.get(kra,'id'), { text: content} ).then(function(){ 
					window.location.assign('/teamusers');
				});
			}
		}

	},
	nextIndex: function() {
		var length = this.get('length') + 1;
		return length;
	}.property('@each.weight'),
	totalWeight: function () {
		var total = 0;
		this.get('model').forEach(function(item, index, list) {
			if(item.get('weight'))
				total+=parseInt(item.get('weight'));
		}, this);

		return total;
	}.property('@each.weight'),

	showSubmit: function () {
		var kra = this.get('controllers.reviewdocument.content');
		if(this.get('totalWeight') == 100 &&  !Em.get(kra,'isApproved'))
			return true;
		else
			return false;
	}.property('@each.weight', 'controllers.reviewdocument.content.isApproved'),
	showReset: function() {
		var kra = this.get('controllers.reviewdocument.content');
		return kra && !Em.get(kra,'isApproved') && this.get('model').get('length') > 0;
	}.property('controllers.reviewdocument.content.isApproved', 'length'),
	isApproved: function() {
		var kra = this.get('controllers.reviewdocument.content');
		return Em.get(kra,'isApproved');
	}.property('controllers.reviewdocument.content.isApproved'),
	resetModalButtons: [
      Ember.Object.create({title: 'Reset', clicked: "reset", type:"danger", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  	],
	rejectModalButtons: [
      Ember.Object.create({title: 'Reject Changes', clicked: "reject", type:"primary", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  	],
  	importModalButtons: [
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  	],
	showAddRow: false
});