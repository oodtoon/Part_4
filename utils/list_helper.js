const dummy = (blogs) => {
  if (blogs.length > 0) {
    blogs.splice(1, blogs.length - 1);
  } else if (blogs.length === 0) {
    blogs.push("Hello");
  }

  return blogs.length;
};

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const reducer = (sum, item) => {
    return sum + item;
  };

  let sumLikes = likes.reduce(reducer, 0);
  return sumLikes;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return "no blogs";
  } else {
    const likes = blogs.map((blog) => blog.likes);
    highestLike = Math.max(...likes);

    blogs.forEach((blog) => {
      if (blog.likes === highestLike) {
        favBlog = {
          title: blog.title,
          author: blog.author,
          likes: blog.likes,
        };
      }
    });
    return favBlog;
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
