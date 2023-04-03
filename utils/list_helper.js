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

    const authorBlogCount = authors.reduce((author, count) => {
      !author[count] ? (author[count] = 1) : author[count]++
      return author
    }, {})

    const blogsCount = Object.values(authorBlogCount)

    const mostBlogs = blogsCount.reduce(
      (most, blog) => (blog > most ? blog : most),
      blogsCount[0]
    )
    const prolificAuthor = Object.keys(authorBlogCount).find(
      (key) => authorBlogCount[key] === mostBlogs
    )
    return { author: prolificAuthor, blogs: mostBlogs }
  }
}

//itterate through the array blogs
//find the author
//increase count for each author
//return author with highest count

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
