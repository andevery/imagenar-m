Template.taskItem.helpers({
  taskName: function() {
    if (this.type == 0) {
      return "Unfollowing";
    }

    var targets = [];
    if (this.follows) {
      targets.push("Following");
    }
    if (this.likes) {
      targets.push("Liking");
    }

    return targets.join("/");
  },
  taskType: function() {
    if (this.type == 0) {
      return "";
    }
    return TaskTypes[this.type] + " /";
  },
  taskIcon: function() {
    return "collections";
  },
  taskStatus: function () {
    return TaskStatuses[this.status]
  },
  counters: function() {
    var counts = "";
    if (this.type == 0) {
      counts = "<span>/ unfollowed: " + this.unfollowsCount + "</span>";
    }
    if (this.follows) {
      counts += "<span>/ followed: " + this.followsCount + "&nbsp;</span>";
    }
    if (this.likes) {
      counts += "<span>/ liked: " + this.likesCount + "</span>";
    }
    return new Handlebars.SafeString(counts);
  },
  username: function() {
    return Profiles.select().where('id = ?', this.profilesid).fetch()[0].username;
  },
  active: function() {
    return this.status < 3;
  },
  paused: function() {
    return this.status >= 3;
  },
  stopping: function() {
    return this.status > 3;
  },
  finished: function() {
    return this.status > 3;
  }
});

Template.taskItem.events({
  'click .start': function (e) {
    e.preventDefault();
    Tasks.update({id: this.id, status: 0}).where('id = ?', this.id).save();
  },
  'click .pause': function (e) {
    e.preventDefault();
    Tasks.update({id: this.id, status: 3}).where('id = ?', this.id).save();
  },
  'click .stop': function (e) {
    e.preventDefault();
    Tasks.update({id: this.id, status: 4}).where('id = ?', this.id).save();
  },
  'click .delete': function (e) {
    e.preventDefault();

    if (confirm("Delete this task?")) {
      Tasks.remove().where("id = ?", this.id).save();
    }
  }
});