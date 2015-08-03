Task = new Mongo.Collection("tasks");
Entry = new Mongo.Collection("entries");

if (Meteor.isClient) {
  Meteor.subscribe("tasks");
  Meteor.subscribe("entries");
}

if (Meteor.isServer) {
  Meteor.publish("tasks", function() {
    return Task.find({ userId: this.userId });
  });

  Meteor.publish("entries", function() {
    return Entry.find({ userId: this.userId });
  });
}
