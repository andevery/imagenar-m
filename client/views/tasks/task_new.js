Template.taskNew.helpers({
  accounts: function () {
    return Profiles.select().fetch();
  }
});

Template.taskNew.events({
  'submit .task-new-form': function (e) {
    e.preventDefault();
    var task;
    var type = $(e.target).find('#type').val();
    var profilesid = $(e.target).find('#profilesid').val();

    if (type == 0) {
      task = {
        type: type,
        profilesid: parseInt(profilesid)
      };
    } else {
      var tags = $(e.target).find('[name="tags[]"]').map(function() {
        if ($(this).val() != "") { return $(this).val(); }
      }).get().join(',');

      task = {
        type: type,
        profilesid: parseInt(profilesid),
        follows: $(e.target).find('#follows').is(':checked'),
        likes: $(e.target).find('#likes').is(':checked'),
        minLikes: $(e.target).find('#min-likes').val(),
        maxLikes: $(e.target).find('#max-likes').val(),
        tags: tags
      }
    }

    Tasks.insert(task).save();
    Router.go('tasksList');
  },
  'change .wl-profilesid': function (event, template) {
    Session.set('wl-profilesID', $(event.target).val());
    $('#wl-username').removeAttr('disabled');
  },
  'click .add-tag': function (e) {
    // e.preventDefault();
    $(
       '<div class="tag mdl-textfield mdl-js-textfield mdl-textfield--floating-label"> \
          <input class="mdl-textfield__input" type="text" name="tags[]" /> \
          <label class="mdl-textfield__label" for="max-likes">Add tag</label> \
        </div>'
      ).insertBefore('.add-tag')
  }
});
