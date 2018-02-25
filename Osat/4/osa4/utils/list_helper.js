const Blog = require('../models/blog')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    
    const allLikes = blogs.map(blog =>blog.likes)
    const reducer = (sum, item) => {
        return sum + item
      }
      return allLikes.length === 0 ? 0 : allLikes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    
    let best = blogs[0]

    blogs.forEach(element => {
        if (best.likes < element.likes) {
            best = element
        }
    });
      return best
}

const mostBlogs = (blogs) => {
    var writers = [];
	var copy = blogs.slice(0);
 
	for (var i = 0; i < blogs.length; i++) {
 
		var count = 0;	
		for (var w = 0; w < copy.length; w++) {
			if (blogs[i] === copy[w]) {
				count++;
				delete copy[w];
			}
		}
 
		if (count > 0) {
			var writer = new Object();
			writer.value = blogs[i].author;
			writer.count = count ;
			writers.push(writer);
		}
    }
    let best = writers[0]
    writers.forEach(element => {
        if (element.count > best.count) {
            best = element
        }
    });
      return best
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}