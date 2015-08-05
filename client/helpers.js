Template.registerHelper('hoursOrMinutes', function(seconds) {
  if (seconds < 60 || !seconds) {
    return "less than a minute";
  } else if (seconds < 3600) {
    return (seconds / 60).toFixed(0) + " minutes";
  } else {
    return (seconds / 3600).toFixed(0) + " hours";
  }
});

Template.registerHelper('share_url', function(tag) {
  return '?user=' + encodeURIComponent(Meteor.userId()) + '&secret=' + encodeURIComponent(tag.secret);
});

Template.registerHelper('read_only', function() {
  var params = common.getUrlParams(window.location);
  return params.user;
});
