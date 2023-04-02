const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "5 things you didn't know!",
        author: "cool guy",
        url: "www.wowzer.comzers",
        likes: 8,
        id: "64276cf46b58613484318b43",
      },
      {
        title: "Doctors hate him",
        author: "ripped guy",
        url: "www.swolzers.comzers",
        likes: 75,
        id: "642775cc2545bebcec7c470c",
      },
]

/*const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}*/

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}