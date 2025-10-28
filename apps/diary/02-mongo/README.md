# September 3, 2025

**02-mongo is based on the crash course at https://www.youtube.com/watch?v=2QQGWYe7IDU**

During this course, I have learned how to use mongodb in a nodejs project.

## MongoDB Shell Commands Reference

```bash
# Show the current database
db

# List all databases
show dbs

# Use a specific database
use blog

# Create a collection in blog
db.createCollection("posts")

# Create an index in the collection
db.posts.createIndex({ title: 'text' })

# Insert a single post in the posts collection
db.posts.insertOne({
    title: "test1"
})

# Insert multiple posts in the posts collection
db.posts.insertMany([{
    title: "test2"
}, {
    title: "test3"
}])

# Find posts by title (returns a list of matches)
db.posts.find({
    title: "test2"
})

# Additional query methods:
# .sort({ title: -1 })  # Sort in descending order (1 for ascending)
# .count()              # Count the number of elements in the collection
# .limit(2)             # Only return 2 elements from the collection and subqueries

# Conditional finds
db.posts.findOne({
    likes: {$gt: 3}  # Only return posts with more than 3 likes
    # Other operators: $gte (>=), $lt (<), $lte (<=)
})

# Update a single element of the collection
db.posts.updateOne(
    # First argument: filter to specify which elements to update
    {
        title: "test"
    },
    # Second argument: specify what should be updated
    {
        # We use $set because write operations are atomic
        $set: {
            likes: 1000
        }
    }
)

# Update multiple elements in the collection
db.posts.updateMany(
    {},  # Empty filter means all documents
    {
        # Increment every single post's likes by 1
        $inc: {
            likes: 1
        }
    }
)
```