UpRaise.Diaryitem = DS.Model.extend({	
  addedOn: DS.attr('date'),
  addedBy: DS.attr('string'),
  addedByName: DS.attr('string'),
  description: DS.attr('string'),
  __v: DS.attr('string'),
  perfdiary: DS.belongsTo('perfdiary'),
  canEdit: DS.attr('boolean')
});

UpRaise.Diaryitem.FIXTURES = [
 {
   	id: 1,
   	addedon: new Date(2013,10,11),
   	addedbyname: 'Varun Jain',
    addedby: '1',
   	description: 'Ensure meetings for company roadmap occurs bi-weekly. Track and guide Product management organization to achieve goals set. Track and guide Services organization to achieve goals set'
 },
 {
    id: 2,
    addedon: new Date(2013,10,11),
    addedbyname: 'Tarun Dhillon',
    addedby: '1',
    description: 'Ensure two meetings for company'
 },
 {
    id: 3,
    addedon: new Date(2013,10,11),
    addedbyname: 'Varun Jain',
    addedby: '1',
    description: 'Ensure meetings for company roadmap occurs bi-weekly. Track and guide Product management organization to achieve goals set. Track and guide Services organization to achieve goals set'
 },
];