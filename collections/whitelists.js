Whitelists = new SQL.Collection('whitelists');

if (Meteor.isServer) {
  Whitelists.createTable({username: ['$string', '$notnull']}).save();
  Whitelists.createRelationship('profiles', '$onetomany').save();

  Whitelists.publish('whitelists', function() {
    return Whitelists.select().order('profilesid ASC');
  });
}

if (Meteor.isClient) {
  Whitelists.createTable({
    id: ['$number'],
    username: ['$string', '$notnull'],
    profilesid: ['$number', '$notnull']
  });
}