Profiles = new SQL.Collection('profiles');

if (Meteor.isServer) {
  Profiles.createTable({username: ['$string', '$unique'], password: ['$string']}).save();
  Profiles.publish('profiles', function() {
    return Profiles.select().order('username DESC');
  });
}

if (Meteor.isClient) {
  Profiles.createTable({username: ['$string', '$notnull'], password: ['$string']});
}