Template.tasksList.helpers({
  tasks: function() {
    return Tasks.select().fetch();
  }
});