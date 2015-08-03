Meteor.methods({
  createTask: function(string) {
    var parts = string.split(/\s*#/);
    var taskId = Task.insert({
      text: parts.shift(),
      tags: parts,
      userId: Meteor.userId()
    });
    Meteor.call('startTask', Task.findOne({ _id: taskId }));
  },

  startTask: function(task) {
    var now = new Date();

    // stop any other task, always.
    Entry.find({ userId: Meteor.userId(), endedAt: null }).forEach(function(document) {
      Entry.update({ _id: document._id }, { $set: { endedAt: now } });
    });

    // start this task
    Task.update({ _id: task._id }, { $set: { startedAt: now } });
    Entry.insert({ taskId: task._id, userId: Meteor.userId(), startedAt: now });
  },

  deleteTask: function(task) {
    var now = new Date();
    Task.update({ _id: task._id }, { $set: { deletedAt: now } });
  }
});
