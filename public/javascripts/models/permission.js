UpRaise.Permission = DS.Model.extend({	
  
  companySupervision: DS.attr('boolean'),
  permissionHandeling: DS.attr('boolean'),
  userManagement:DS.attr('boolean')

  });

UpRaise.Permission.FIXTURES = {


 companySupervision: false,
  permissionHandeling: false,
  userManagement:false

};