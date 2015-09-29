// var Profiles
Template.profilesList.helpers({
  profiles: function() {
    return Profiles.select().fetch();
  }
});