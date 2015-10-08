Tasks = new SQL.Collection('tasks');

TaskTypes = {
  0: "unfollowing",
  1: "by tags"
};

TaskStatuses = {
  0: "starting",
  1: "waiting",
  2: "in progress",
  3: "pause",
  4: "paused",
  5: "stopping",
  6: "finished"
};

var taskTable = {
  type: ['$number', {$default: 1}],
  status: ['$number', {$default: 0}],
  follows: ['$bool', {$default: false}],
  likes: ['$bool', {$default: false}],
  maxLikes: ['$number', {$default: 2}],
  minLikes: ['$number', {$default: 4}],
  maxTags: ['$number', {$default: 50}],
  maxFollowedBy: ['$number', {$default: 500}],
  minFollowedBy: ['$number', {$default: 0}],
  maxFollows: ['$number', {$default: 300}],
  minFollows: ['$number', {$default: 100}],
  minMedia: ['$number', {$default: 20}],
  delay: ['$number', {$default: 60}],
  tags: ['$string'],
  likesCount: ['$number', {$default: 0}],
  followsCount: ['$number', {$default: 0}],
  unfollowsCount: ['$number', {$default: 0}]
};

if (Meteor.isServer) {
  Tasks.createTable(taskTable).save();

  Tasks.createRelationship('profiles', '$onetomany').save();

  Tasks.publish('tasks', function() {
    return Tasks.select().order('createdat DESC');
  });
}

if (Meteor.isClient) {
  Tasks.createTable($.extend(taskTable, {
    id: ['$number'],
    profilesid: ['$number', '$notnull'],
    createdat: ['$datetime']
  }));
}