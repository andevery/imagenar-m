Template.whitelist.events({
  'click .delete': function (e) {
    e.preventDefault();
    Whitelists.remove().where("id = ?", this.id).save();
  }
});