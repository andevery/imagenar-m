Template.taskNew.helpers({
  accounts: function () {
    return Profiles.select().fetch();
  }
});

Template.taskNew.events({
  'submit .task-new-form': function (e) {
    e.preventDefault();
    var tags = $(e.target).find('#tags').val();
    alert(tags)
    // var task;
    // var type = $(e.target).find('#type').val();

    // if (type == 0) {
    //   task = {
    //     type: type,
    //     profilesid: $(e.target).find('#profilesid').val()
    //   };
    // } else {
    //   task = {
    //     type: type,
    //     profilesid: $(e.target).find('#profilesid').val(),
    //     follows: $(e.target).find('#follows').is(':checked'),
    //     likes: $(e.target).find('#likes').is(':checked')
    //   }
    // }

    // Tasks.insert(task).save();
    // Router.go('tasksList');
  },
  'change .wl-profilesid': function (event, template) {
    Session.set('wl-profilesID', $(event.target).val());
    $('#wl-username').removeAttr('disabled');
  }
});
