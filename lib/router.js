Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('profilesList', {path: '/accounts'});
  this.route('profileNew', {path: '/accounts/new'});
  this.route('profilePage', {
    path: '/accounts/:id',
    data: function() {
      return Profiles.select().where("id = ?", parseInt(this.params.id)).fetch()[0];
    }
  });

  this.route('tasksList', {path: '/tasks'});
});
