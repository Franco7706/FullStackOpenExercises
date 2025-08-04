const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  return blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  blogs.sort((a, b) => b.likes - a.likes);
  return blogs[0];
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  const authorCounts = {};
  blogs.forEach((blog) => {
    authorCounts[blog.author] = (authorCounts[blog.author] || 0) + 1;
  });
  let maxAuthor = null;
  let maxBlogs = 0;
  for (const author in authorCounts) {
    if (authorCounts[author] > maxBlogs) {
      maxBlogs = authorCounts[author];
      maxAuthor = author;
    }
  }
  return { author: maxAuthor, blogs: maxBlogs };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  const authorCounts = {};
  blogs.forEach((blog) => {
    authorCounts[blog.author] = (authorCounts[blog.author] || 0) + blog.likes;
  });
  let maxAuthor = null;
  let maxLikes = 0;
  for (const author in authorCounts) {
    if (authorCounts[author] > maxLikes) {
      maxLikes = authorCounts[author];
      maxAuthor = author;
    }
  }
  return { author: maxAuthor, likes: maxLikes };
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
