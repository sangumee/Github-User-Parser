const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true)

const userSchema = new Schema({
  login: String,
  id: {
    type: Number,
    unique: true
  },
  node_id: String,
  avatar_url: String,
  gravatar_id: String,
  url: String,
  html_url: String,
  followers_url: String,
  following_url: String,
  gists_url: String,
  starred_url: String,
  subscriptions_url: String,
  organizations_url: String,
  repos_url: String,
  events_url: String,
  received_events_url: String,
  type: String,
  site_admin: String,
  name: String,
  company: String,
  blog: String,
  location: String,
  email: String,
  hireable: String,
  bio: String,
  public_repos: Number,
  public_gists: Number,
  followers: Number,
  following: Number,
  created_at: Date,
  updated_at: Date,

  registerType: {
    type: String,
    default: 'Unregistered'
  },
  registerDate: {
    type: Date,
    default: Date.now
  },
  phoneNumber: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model("users", userSchema);