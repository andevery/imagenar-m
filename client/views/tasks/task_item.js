Template.taskItem.helpers({
  taskType: function() {
    return TaskTypes[this.type];
  },
  taskIcon: function() {
    return "collections"
  }
});