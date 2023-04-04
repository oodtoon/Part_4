const dummy = (blogs) => {
  if (blogs.length > 0) {
    blogs.splice(1, blogs.length - 1)
  } else if (blogs.length === 0) {
    blogs.push("Hello")
  }

  return blogs.length
}

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes)
  const reducer = (sum, item) => {
    return sum + item
  }

  let sumLikes = likes.reduce(reducer, 0)
  return sumLikes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return "no blogs"
  } else {
    const favBlog = blogs.reduce(
      (highest, blog) => (blog.likes > highest.likes ? blog : highest),
      blogs[0]
    )
    return {
      title: favBlog.title,
      author: favBlog.author,
      likes: favBlog.likes,
    }
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return "no blogs"
  } else {
    const authors = blogs.map((blog) => blog.author)

    const authorBlogCount = authors.reduce((aggregator, author) => {
      if (author in aggregator) {
        aggregator[author]++
      } else {
        aggregator[author] = 1
      }
      return aggregator
    }, {})

    const blogCounts = Object.values(authorBlogCount)

    const mostBlogs = blogCounts.reduce(
      (most, count) => (count > most ? count : most),
      blogCounts[0]
    )
    const prolificAuthor = Object.keys(authorBlogCount).find(
      (key) => authorBlogCount[key] === mostBlogs
    )
    return { author: prolificAuthor, blogs: mostBlogs }
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return "no blogs"
  } else {
    const authors = blogs.map((blog) => blog.author)
    const uniqueAuthors = [...new Set(authors)]
    const objectAuthors = uniqueAuthors.map((author) => ({
      author: author,
      likes: 0,
    }))

    blogs.forEach((blog) => {
      objectAuthors.forEach((object) => {
        if (object.author === blog.author) {
          object.likes = object.likes + blog.likes
        }
      })
    })
    const favAuthor = objectAuthors.reduce(
      (highest, author) => (author.likes > highest.likes ? author : highest),
      objectAuthors[0]
    )
    return favAuthor
  }
}

const mostLikes2 = (blogs) => {
  if (blogs.length === 0) {
    return "no blogs"
  } else {
    const authorLikeCounts = blogs.reduce((agg, blog) => {
      const currentLikeCount = agg[blog.author] || 0
      agg[blog.author] = currentLikeCount + blog.likes
    }, {})

    const authorCountPairs = Object.entries(authorLikeCounts)
    const first = authorCountPairs[0]

    return authorCountPairs.reduce(
      (highest, [author, likes]) =>
        likes > highest ? { author, likes } : highest,
      { author: first[0], likes: first[1] }
    )
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
