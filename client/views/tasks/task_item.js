Template.taskItem.helpers({
  taskName: function() {
    if (this.type == 0) {
      return "Unfollowing"
    }

    var targets = []
    if (this.follows == true) {
      targets.push("Following")
    }
    if (this.likes == true) {
      targets.push("Liking")
    }

    return targets.join("/")
  },
  taskType: function() {
    return TaskTypes[this.type];
  },
  taskIcon: function() {
    return "collections"
  },
  counters: function() {
    return new Handlebars.SafeString("<span>FFF</span>")
  }
});