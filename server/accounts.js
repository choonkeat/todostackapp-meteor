Accounts.onCreateUser(function(options, user) {
  user.secret = Meteor.uuid();
  return user;
});
