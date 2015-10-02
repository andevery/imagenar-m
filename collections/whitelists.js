Whitelists = new SQL.Collection('whitelists');

if (Meteor.isServer) {
  Whitelists.createTable({apiuser: ['$string', '$notnull']}).save();
  Whitelists.createRelationship('profiles', '$onetomany').save();

  Whitelists.publish('whitelists', function() {
    return Whitelists.select().order('profilesid ASC');
  });
}

if (Meteor.isClient) {
  Whitelists.createTable({
    apiuser: ['$string', '$notnull'],
    profilesid: ['$number', '$notnull']
  });
}