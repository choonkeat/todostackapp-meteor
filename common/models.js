Task = new Mongo.Collection("tasks");
Entry = new Mongo.Collection("entries");

if (Meteor.isClient) {
  Meteor.subscribe("tasks", common.getUrlParams(window.location));
  Meteor.subscribe("entries", common.getUrlParams(window.location));
  Meteor.subscribe("userData"); // reveal user.secret for current_user
}

if (Meteor.isServer) {
  Meteor.publish("tasks", function(params) {
    var selector = { userId: this.userId };
    if (params.user && params.secret) {
      selector['userId'] = params.user;
      selector["tags.secret"] = params.secret;
    }
    return Task.find(selector);
  });

  Meteor.publish("entries", function(params) {
    var selector = { userId: this.userId };
    if (params.user && params.secret) {
      selector['userId'] = params.user;
    }
    return Entry.find(selector);
  });

  Meteor.publish("userData", function () {
    if (this.userId) {
      return Meteor.users.find({_id: this.userId}, {fields: {'secret': 1}});
    }
    this.ready();
  });
}
