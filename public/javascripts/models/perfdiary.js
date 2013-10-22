UpRaise.Perfdiary = DS.Model.extend({
	diaryitems: DS.hasMany('diaryitem'),	
	userId: DS.attr('string')
});

UpRaise.Perfdiary.FIXTURES = [
{
	id: 1,
	diaryitems: [ 1, 2 ],
	userId: 1
}
];