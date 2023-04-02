const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const Blog = require("../models/blog")

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("identifier property of the blog posts is named id:", async () => {
  const response = await api.get("/api/blogs").expect(200)
  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
})

test("new blog has been added", async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    id: "5a422b3a1b54a676234d17f9",
  }
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((b) => b.title)
  expect(titles).toContain("Canonical string reduction")
})

test("likes do not exist returns likes equal to 0", async () => {
  const zeroLikesBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    id: "5a422b3a1b54a676234d17f9",
  }
  await api
    .post("/api/blogs")
    .send(zeroLikesBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const response = await api.get("/api/blogs")

  const addedLikes = response.body.map((r) => r.likes)

  expect(addedLikes).toContain(0)
})

test("blog without title is not added", async () => {
  const missingTitleBlog = {
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    id: "5a422b3a1b54a676234d17f9",
  }
  await api
    .post("/api/blogs")
    .send(missingTitleBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test("blog without url is not added", async () => {
  const missingUrlBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12,
    id: "5a422b3a1b54a676234d17f9",
  }

  await api
    .post("/api/blogs")
    .send(missingUrlBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
