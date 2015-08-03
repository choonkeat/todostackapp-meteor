Template.registerHelper('hoursOrMinutes', function(seconds) {
  if (seconds < 60 || !seconds) {
    return "less than a minute";
  } else if (seconds < 3600) {
    return (seconds / 60).toFixed(0) + " minutes";
  } else {
    return (seconds / 3600).toFixed(0) + " hours";
  }
});
