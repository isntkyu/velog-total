const express = require('express')
const got = require('got') // 버전 낮춰야댐 이유 알아보기 ;
const app = express()


var to = 0
got.post("https://v2.velog.io/graphql", {
    headers: {
        cookie: "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwiaWF0IjoxNjQ0MDU2Mjc4LCJleHAiOjE2NDQwNTk4NzgsImlzcyI6InZlbG9nLmlvIiwic3ViIjoiYWNjZXNzX3Rva2VuIn0.IE50xl4z-s9dhUbyU35hbBbsrDQG3yW2QoYcrYP60mE;"
    },
    json: {"operationName":"UserTags","variables":{"username":"isntkyu"},"query":"query UserTags($username: String) {\n  userTags(username: $username) {\n    tags {\n      id\n      name\n      description\n      posts_count\n      thumbnail\n      __typename\n    }\n    posts_count\n    __typename\n  }\n}\n"}
    }).then(response => {
        let data = JSON.parse(response.body)
        // console.log(data)
        let tags = data.data.userTags.tags[0].name

        got.post("https://v2.velog.io/graphql", {
            headers: {
                cookie: "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwiaWF0IjoxNjQ0MDU2Mjc4LCJleHAiOjE2NDQwNTk4NzgsImlzcyI6InZlbG9nLmlvIiwic3ViIjoiYWNjZXNzX3Rva2VuIn0.IE50xl4z-s9dhUbyU35hbBbsrDQG3yW2QoYcrYP60mE;"
            },
            json: {"operationName":"Posts","variables":{"username":"isntkyu","tag":`${tags}`},"query":"query Posts($cursor: ID, $username: String, $temp_only: Boolean, $tag: String, $limit: Int) {\n  posts(cursor: $cursor, username: $username, temp_only: $temp_only, tag: $tag, limit: $limit) {\n    id\n    title\n    short_description\n    thumbnail\n    user {\n      id\n      username\n      profile {\n        id\n        thumbnail\n        __typename\n      }\n      __typename\n    }\n    url_slug\n    released_at\n    updated_at\n    comments_count\n    tags\n    is_private\n    likes\n    __typename\n  }\n}\n"}
        }).then(resp => {
            // console.log(resp.body)
            let postId = JSON.parse(resp.body)
            console.log(postId.data.posts[0].id)

            got.post("https://v2.velog.io/graphql", {
                headers: {
                    cookie: "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwiaWF0IjoxNjQ0MDU5MDIzLCJleHAiOjE2NDQwNjI2MjMsImlzcyI6InZlbG9nLmlvIiwic3ViIjoiYWNjZXNzX3Rva2VuIn0.9gBqDNwc8splF7CfeGJ2Yk1BnoYwUTD9m9tIV9BVmww;"
                },
                json: {"operationName":"GetStats","variables":{"post_id":`${postId.data.posts[0].id}`},"query":"query GetStats($post_id: ID!) {\n  getStats(post_id: $post_id) {\n    total\n    count_by_day {\n      count\n      day\n      __typename\n    }\n    __typename\n  }\n}\n"}
            }).then(respon => {
                console.log(respon.body)
                let result = JSON.parse(respon.body)
                console.log(result.data.getStats.total)

                let view = result.data.getStats.total
                to += view

                console.log(to)
            })
            
            // res.send({profile: data.data.userTags.posts_count})
        })
    })

app.use(express.static('public'))

app.listen(3000, function () {
    console.log('connected nodejs')
});

// app.set('views','./views')

// URL 라우팅
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html")
})

// 바디파서
// var bodyParser = require('body-parser')
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

app.post('/search_post', function (req, res) {  
    console.log('POST');

    got.post("https://v2.velog.io/graphql", {
    headers: {
        cookie: "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwiaWF0IjoxNjQ0MDU2Mjc4LCJleHAiOjE2NDQwNTk4NzgsImlzcyI6InZlbG9nLmlvIiwic3ViIjoiYWNjZXNzX3Rva2VuIn0.IE50xl4z-s9dhUbyU35hbBbsrDQG3yW2QoYcrYP60mE;"
    },
    json: {"operationName":"UserTags","variables":{"username":"isntkyu"},"query":"query UserTags($username: String) {\n  userTags(username: $username) {\n    tags {\n      id\n      name\n      description\n      posts_count\n      thumbnail\n      __typename\n    }\n    posts_count\n    __typename\n  }\n}\n"}
    }).then(response => {
        let data = JSON.parse(response.body)
        console.log(data)
        let tags = data.data.userTags.tags[0].name

        got.post("https://v2.velog.io/graphql", {
            headers: {
                cookie: "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwiaWF0IjoxNjQ0MDU2Mjc4LCJleHAiOjE2NDQwNTk4NzgsImlzcyI6InZlbG9nLmlvIiwic3ViIjoiYWNjZXNzX3Rva2VuIn0.IE50xl4z-s9dhUbyU35hbBbsrDQG3yW2QoYcrYP60mE;"
            },
            json: {"operationName":"Posts","variables":{"username":"isntkyu","tag":`${tags}`},"query":"query Posts($cursor: ID, $username: String, $temp_only: Boolean, $tag: String, $limit: Int) {\n  posts(cursor: $cursor, username: $username, temp_only: $temp_only, tag: $tag, limit: $limit) {\n    id\n    title\n    short_description\n    thumbnail\n    user {\n      id\n      username\n      profile {\n        id\n        thumbnail\n        __typename\n      }\n      __typename\n    }\n    url_slug\n    released_at\n    updated_at\n    comments_count\n    tags\n    is_private\n    likes\n    __typename\n  }\n}\n"}
        }).then(resp => {
            console.log(resp.body)
            let postId = JSON.parse(resp.body.data.posts[0])

            got.post("https://v2.velog.io/graphql", {
                headers: {
                    cookie: "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwiaWF0IjoxNjQ0MDU2Mjc4LCJleHAiOjE2NDQwNTk4NzgsImlzcyI6InZlbG9nLmlvIiwic3ViIjoiYWNjZXNzX3Rva2VuIn0.IE50xl4z-s9dhUbyU35hbBbsrDQG3yW2QoYcrYP60mE;"
                },
                json: {"operationName":"GetStats","variables":{"post_id":`${postId.id}`},"query":"query GetStats($post_id: ID!) {\n  getStats(post_id: $post_id) {\n    total\n    count_by_day {\n      count\n      day\n      __typename\n    }\n    __typename\n  }\n}\n"}}).then(response => {

            }).then(count => {
                console.log(count)
            })
            
            res.send({profile: data.data.userTags.posts_count})
        })
    })
})

