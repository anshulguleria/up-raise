Ember.Handlebars.helper('shortdate', function(value, options) {
  if(value !=null && value.toDateString()){
  	return value.toDateString();
  }
  return value;
});