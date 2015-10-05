Template.taskNew.helpers({
  accounts: function () {
    return Profiles.select().fetch();
  }
});

Template.taskNew.events({
  'submit form': function (e) {
    e.preventDefault();

    var task = {
      type: $(e.target).find('#type').val(),
      profilesid: $(e.target).find('#profilesid').val()
    };

    Tasks.insert(task).save();
    Router.go('tasksList');
  },
  'change #profilesid': function (e) {
    Session.set('profilesID', $(e.target).val())
  }
});

Tracker.autorun(function () {
  if (Session.get('profilesID')) {
    // var whitelistHandle = Meteor.subscribe
  };
});
