Template.profileItem.events({
  'click .delete': function (e) {
    e.preventDefault();

    if (confirm("Delete this account?")) {
      Profiles.remove().where("id = ?", this.id).save()
    }
  }
});