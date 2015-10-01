Tasks = new SQL.Collection('tasks');

TaskTypes = {
  0: "Unfollow",
  1: "By tags"
};

TaskStatuses = {
  0: "New",
  1: "Waiting",
  2: "Active",
  3: "Paused",
  4: "Finished"
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
}

if (Meteor.isServer) {
  Tasks.createTable(taskTable).save();

  Tasks.createRelationship('profiles', '$onetomany').save();

  Tasks.publish('tasks', function() {
    return Tasks.select().order('createdat DESC');
  });
}

if (Meteor.isClient) {
  Tasks.createTable({
    type: ['$number', {$default: 1}],
    status: ['$number', {$default: 0}]
  });
}