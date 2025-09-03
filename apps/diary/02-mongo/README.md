# 3 September 2025

**02-mongo is based on the crash course at https://www.youtube.com/watch?v=2QQGWYe7IDU**

```sh
# Show the db
db

# List the dbs
show dbs

# Use a defined db
use blog

# Create a collection in blog
db.createCollection("posts")

# Create an index in the collection
db.posts.createIndex({ title: 'text' })

# Insert a post in the posts collection
db.posts.insertOne({
    title: "test1"
})

# Insert many posts in the posts collection
db.posts.inserMany([{
    title: "test2"
}, {
    title: "test2"
}])

# Find a post by title (returns a list of match)
db.posts.find({
    title: "test2"
})

# .sort({
#    title: -1 # sort in ASC
#})

# .count() # Count the number of elements in the collection 
# .limit(2) # Only return 2 elements from the collection and subqueries

# Conditional finds
db.posts.findOne({
    likes: {$gt: 3} # Only return posts with more than 3 likes (gte, lt, lte)
})

# Update an element of the collection
db.posts.updateOne(
    # First argument tells what elements must be updated
    {
        title: "test"
    }, 
    # Second argument tells what should be updated to what
    {
        # We use set because write is atomic otherwise it will fail
        $set: {
            likes: 1000
        }
    }
)

# Update multiple elements in the collection
db.posts.updateMany(
    {},
    {
        # Increment every single post likes
        $inc: {
            likes: 1
        }
    }
)
```
