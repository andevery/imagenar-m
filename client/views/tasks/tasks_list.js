Session.setDefault('sortByStatus', 'active');

Template.tasksList.helpers({
  tasks: function() {
    if (Session.get('sortByStatus') == 'active') {
      return Tasks.select().where('status <= 5').fetch();
    }

    return Tasks.select().where('status > 5').fetch();
  },
  active: function() {
    return Session.get('sortByStatus') == 'active';
  },
  finished: function() {
    return Session.get('sortByStatus') == 'finished';
  }
});

Template.tasksList.events({
  'click .active': function (e) {
    e.preventDefault();
    Session.set('sortByStatus', 'active');
  },
  'click .finished': function (e) {
    e.preventDefault();
    Session.set('sortByStatus', 'finished');
  }
});