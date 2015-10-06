Template.whitelists.helpers({
  whitelists: function () {
    if (Session.get('wl-profilesID')) {
      return Whitelists.select().where('profilesid = ?', parseInt(Session.get('wl-profilesID'))).fetch();
    }
  }
});

Template.whitelists.events({
  'keypress #wl-username': function (e) {
    if (e.which === 13) {
      e.preventDefault();

      if (Session.get('wl-profilesID')) {
        var whitelist = {
          username: $(e.target).val(),
          profilesid: Session.get('wl-profilesID')
        };

        $(e.target).val("");

        Whitelists.insert(whitelist).save();
      }
    }
  }
});