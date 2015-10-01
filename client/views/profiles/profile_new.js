Template.profileNew.events({
  'submit form': function (e) {
    e.preventDefault();

    var account = {
      username: $(e.target).find('#username').val(),
      password: $(e.target).find('#password').val()
    };

    Profiles.insert(account).save();
    Router.go('profilesList');
  }
});