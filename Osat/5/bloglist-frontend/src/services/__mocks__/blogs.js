let token = null

const blogs = [
    {
        "_id": {
            "$oid": "5a9c485c9338a070dd3bef5d"
        },
        "title": "testi",
        "author": "testi",
        "url": "sad",
        "likes": 5,
        "user": {
            "$oid": "5a9c09e7f1d4fb3b606f97d8"
        },
    },
    {
        "_id": {
            "$oid": "5a932389c1e175761e2ecc0a"
        },
        "title": "TestiPOIsto",
        "author": "Hän",
        "url": "https://fullstack-hy.github.io/osa1/",
        "likes": 55,
    },
    {
        "_id": {
            "$oid": "5a932389c1e175761e2ecc09"
        },
        "title": "Testi2",
        "author": "Sinä",
        "url": "https://fullstack-hy.github.io/osa5/",
        "likes": 63,
    }
  
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }