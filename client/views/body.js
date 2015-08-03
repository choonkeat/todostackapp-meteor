Template.body.helpers({
  current_tags: function() {
    var tag = Session.get("tag");
    if (tag) return [Session.get("tag")];
  },
  tasks: function () {
    // Show newest tasks at the top

    var selector = { userId: Meteor.userId(), deletedAt: null };
    if (Session.get("tag")) selector['tags'] = Session.get("tag");

    return Task.find(selector, { sort: { startedAt: -1 } }).map(function(document, index){
      document.checked = (index == 0);
      document.index = index;
      return document;
    });
  }
});

Template.body.events({
  "click .js-untag": function(event) {
    Session.set("tag", null);
  },
  "click .js-tag": function(event) {
    Session.set("tag", this.toString());
  },
  "click .js-set-active": function(event) {
    if (this.index != 0) Meteor.call('startTask', this);
  },
  "click .js-task-title": function(event) {
    event.preventDefault();
    event.stopPropagation();

    var value = (Session.get("toggle_task") == this._id ? null : this._id);
    Session.set("toggle_task", value);
  },
  "submit .js-add-task": function (event) {
    event.preventDefault();
    event.stopPropagation();

    // Get value from form element
    var text = event.target.text.value;

    // Insert a task into the collection
    Meteor.call('createTask', text);

    // Clear form
    event.target.text.value = "";
  },
  "click .js-delete": function (event) {
    event.preventDefault();
    Meteor.call('deleteTask', this);
  }
});
