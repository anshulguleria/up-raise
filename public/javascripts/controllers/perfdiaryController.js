UpRaise.PerfdiaryIndexController = Ember.ObjectController.extend({
	actions: {
		createDiary: function() {
			var model = this.get('model');
			var that  = this;
			model.save().then(function() {
				return that.transitionToRoute('/' + model.get('id'));
			});
		}
	}
});

UpRaise.PerfdiaryController = Ember.ObjectController.extend({
	needs: ['diaryitems'],
	actions: {
		showAdd: function() {
			this.set('showAdd', true);
		},
		cancel: function() {
	      this.set('showAdd', false);	      
	    },
		save: function() {
			
			var description = this.get('description');
			if (!description || !description.trim()) { 
				console.log('no description')
				return; 
			}

			var item = this.store.createRecord('diaryitem', {
				description: this.get('description')								
			});
			
			var perfdiary = this.get('model');

			item.set('perfdiary', perfdiary);
			item.save().then(function() {

				perfdiary.get('diaryitems').addObject(item);
				perfdiary.save();						
			});

			
			this.set('showAdd',false);
		}		
	},
	showAdd: false
	
});