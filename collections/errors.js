Errors = new SQL.Collection('errors');

if (Meteor.isServer) {
  Errors.createTable({type: ['$string'], message: ['$string']}).save();
  Errors.createRelationship('tasks', '$onetomany').save();

  Errors.publish('errors', function() {
    return Errors.select().order('createdat DESC');
  });
}

if (Meteor.isClient) {
  Errors.createTable({
    id: ['$number'],
    type: ['$string'],
    message: ['$string'],
    tasksid: ['$number']
  });
}