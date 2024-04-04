let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Create a schema for the posts
let postSchema = new Schema({
    id: String,
    title: String,
    date: Date,
    description: String,
    text: String,
    country: String,
    imageURL: String
});

// Create a model/class using the mongoose schema
// collection name will be automatically created as 'posts'
let Post = mongoose.model('Post', postSchema);

// Export the model
module.exports = {Post};