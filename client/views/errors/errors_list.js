Template.errorsList.helpers({
  errors: function() {
    return Errors.select().fetch();
  }
});