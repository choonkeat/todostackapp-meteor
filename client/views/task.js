Template.task.helpers({
  toggled_task: function() {
    return (Session.get("toggle_task") == this._id);
  },
  task_aggregated_entries: function(datetype) {
    var result = []
    var tuple = {};

    var selector = { userId: Meteor.userId(), taskId: this._id };
    if (datetype == 'hourly') {
      selector['startedAt'] = { $gte : moment().startOf('day').subtract(1, 'day').toDate() };
    } else if (datetype == 'daily') {
      selector['startedAt'] = { $gte : moment().startOf('day').subtract(1, 'week').toDate() };
    } else if (datetype == 'weekly') {
      selector['startedAt'] = { $gte : moment().startOf('week').subtract(1, 'month').toDate() };
    } else if (datetype == 'monthly') {
      selector['startedAt'] = { $gte : moment().startOf('month').subtract(3, 'months').toDate() };
    }

    Entry.find(selector, { sort: {startedAt: -1} }).forEach(function(document) {
      var date;
      if (datetype == 'hourly') {
        date = moment(document.startedAt).format('ddd h:mm a');
      } else if (datetype == 'daily') {
        date = moment(document.startedAt).format('ddd ll');
      } else if (datetype == 'weekly') {
        date = moment(document.startedAt).startOf('week').format('ll');
      } else if (datetype == 'monthly') {
        date = moment(document.startedAt).format('MMM YYYY');
      }
      if (tuple.date != date) {
        tuple = { date: date, seconds: 0 };
        result.push(tuple);
      }
      if (document.endedAt) {
        tuple.seconds = tuple.seconds +
          ((document.endedAt.getTime() - document.startedAt.getTime()) / (1000));
      }
    });
    return result;
  }
});
