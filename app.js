const express = require('express')
const got = require('got') // 버전 낮춰야댐 이유 알아보기 ;
const app = express()
const async = require('async')
const { json } = require('express/lib/response')
// const { response } = require('express')


var to = 0

// async.waterfall([
//     function(callback) { //태그 다 가져오기
//         got.post("https://v2.velog.io/graphql", {
//             headers: {
//                 cookie: "_ga=GA1.2.402592865.1574765075; __gads=ID=1d61987ced4df306-226a319d7cc600d5:T=1616220310:RT=1616220310:S=ALNI_Ma3n58Jmjk2d9IittCQnnfAJw0bIw; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwidG9rZW5faWQiOiI5MjdjMjBjZS05YjQyLTRmZGItOGRmYi1lNWY5NWQ3YTIyYmQiLCJpYXQiOjE2NDM1Mzc4NjEsImV4cCI6MTY0NjEyOTg2MSwiaXNzIjoidmVsb2cuaW8iLCJzdWIiOiJyZWZyZXNoX3Rva2VuIn0.r7uaM9_UMEh9SGA1_2umCWli9IkSByJSGOGCAqoaeAw; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwidG9rZW5faWQiOiI5MjdjMjBjZS05YjQyLTRmZGItOGRmYi1lNWY5NWQ3YTIyYmQiLCJpYXQiOjE2NDM1Mzc4NjEsImV4cCI6MTY0NjEyOTg2MSwiaXNzIjoidmVsb2cuaW8iLCJzdWIiOiJyZWZyZXNoX3Rva2VuIn0.r7uaM9_UMEh9SGA1_2umCWli9IkSByJSGOGCAqoaeAw; _gid=GA1.2.852154745.1644056278; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwiaWF0IjoxNjQ0MTM1NDc2LCJleHAiOjE2NDQxMzkwNzYsImlzcyI6InZlbG9nLmlvIiwic3ViIjoiYWNjZXNzX3Rva2VuIn0.YpJyylscaK9S6BbVRR8WiOCcyavAI7f0tMssktKZO_U; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwiaWF0IjoxNjQ0MTM1NDc2LCJleHAiOjE2NDQxMzkwNzYsImlzcyI6InZlbG9nLmlvIiwic3ViIjoiYWNjZXNzX3Rva2VuIn0.YpJyylscaK9S6BbVRR8WiOCcyavAI7f0tMssktKZO_U; _gat_gtag_UA_125599395_1=1    }"            },
//             json: {
//                 "operationName":"Posts",
//                 "variables":{
//                     "username":"isntkyu",
//                     "tag":null
//                 },
//                 "query":"query Posts($cursor: ID, $username: String, $temp_only: Boolean, $tag: String, $limit: Int) {\n  posts(cursor: $cursor, username: $username, temp_only: $temp_only, tag: $tag, limit: $limit) {\n    id\n    title\n    short_description\n    thumbnail\n    user {\n      id\n      username\n      profile {\n        id\n        thumbnail\n        __typename\n      }\n      __typename\n    }\n    url_slug\n    released_at\n    updated_at\n    comments_count\n    tags\n    is_private\n    likes\n    __typename\n  }\n}\n"
//             }
//         }).then(response => {
//             let posts = JSON.parse(response.body).data.posts
//             let postIds = posts.map(post => post.id)
//             // console.log(postIds)
//             callback(null, postIds);
//         })
//     },
//     function(arg1, callback) { // 태그이름 담기
//         let postsLength = arg1.length
//         console.log("post s Length: ", postsLength)

//         let count = 0;
//         let total = 0;
//         async.whilst(
//             function test(cb) { cb(null, count < postsLength); },
//             function iter(callback) {
//                 got.post("https://v2.velog.io/graphql", {
//                     headers: {
//                         cookie: "_ga=GA1.2.402592865.1574765075; __gads=ID=1d61987ced4df306-226a319d7cc600d5:T=1616220310:RT=1616220310:S=ALNI_Ma3n58Jmjk2d9IittCQnnfAJw0bIw; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwidG9rZW5faWQiOiI5MjdjMjBjZS05YjQyLTRmZGItOGRmYi1lNWY5NWQ3YTIyYmQiLCJpYXQiOjE2NDM1Mzc4NjEsImV4cCI6MTY0NjEyOTg2MSwiaXNzIjoidmVsb2cuaW8iLCJzdWIiOiJyZWZyZXNoX3Rva2VuIn0.r7uaM9_UMEh9SGA1_2umCWli9IkSByJSGOGCAqoaeAw; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwidG9rZW5faWQiOiI5MjdjMjBjZS05YjQyLTRmZGItOGRmYi1lNWY5NWQ3YTIyYmQiLCJpYXQiOjE2NDM1Mzc4NjEsImV4cCI6MTY0NjEyOTg2MSwiaXNzIjoidmVsb2cuaW8iLCJzdWIiOiJyZWZyZXNoX3Rva2VuIn0.r7uaM9_UMEh9SGA1_2umCWli9IkSByJSGOGCAqoaeAw; _gid=GA1.2.852154745.1644056278; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwiaWF0IjoxNjQ0MTM1NDc2LCJleHAiOjE2NDQxMzkwNzYsImlzcyI6InZlbG9nLmlvIiwic3ViIjoiYWNjZXNzX3Rva2VuIn0.YpJyylscaK9S6BbVRR8WiOCcyavAI7f0tMssktKZO_U; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwiaWF0IjoxNjQ0MTM1NDc2LCJleHAiOjE2NDQxMzkwNzYsImlzcyI6InZlbG9nLmlvIiwic3ViIjoiYWNjZXNzX3Rva2VuIn0.YpJyylscaK9S6BbVRR8WiOCcyavAI7f0tMssktKZO_U; _gat_gtag_UA_125599395_1=1    }"                },
//                     json: {
//                         "operationName":"GetStats",
//                         "variables":{
//                             "post_id":`${arg1[count]}`
//                         },
//                         "query":"query GetStats($post_id: ID!) {\n  getStats(post_id: $post_id) {\n    total\n    count_by_day {\n      count\n      day\n      __typename\n    }\n    __typename\n  }\n}\n"
//                     }
//                 }).then(response => {
//                     count++;
//                     let result = JSON.parse(response.body)
//                     let view = result.data.getStats.total
//                     total += view
//                     // console.log(to)
//                     callback();
//                 })
//             },
//             function (err, n) {
//                 console.log("total:", total)
//                 callback(null, total);
//             }
//         );
//     },
// ], function (err, result) {
//     console.log(result)
// });

// got.post("https://v2.velog.io/graphql", {
//     headers: {
//         cookie: "_ga=GA1.2.402592865.1574765075; __gads=ID=1d61987ced4df306-226a319d7cc600d5:T=1616220310:RT=1616220310:S=ALNI_Ma3n58Jmjk2d9IittCQnnfAJw0bIw; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwidG9rZW5faWQiOiI5MjdjMjBjZS05YjQyLTRmZGItOGRmYi1lNWY5NWQ3YTIyYmQiLCJpYXQiOjE2NDM1Mzc4NjEsImV4cCI6MTY0NjEyOTg2MSwiaXNzIjoidmVsb2cuaW8iLCJzdWIiOiJyZWZyZXNoX3Rva2VuIn0.r7uaM9_UMEh9SGA1_2umCWli9IkSByJSGOGCAqoaeAw; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwidG9rZW5faWQiOiI5MjdjMjBjZS05YjQyLTRmZGItOGRmYi1lNWY5NWQ3YTIyYmQiLCJpYXQiOjE2NDM1Mzc4NjEsImV4cCI6MTY0NjEyOTg2MSwiaXNzIjoidmVsb2cuaW8iLCJzdWIiOiJyZWZyZXNoX3Rva2VuIn0.r7uaM9_UMEh9SGA1_2umCWli9IkSByJSGOGCAqoaeAw; _gid=GA1.2.852154745.1644056278; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwiaWF0IjoxNjQ0MTM1NDc2LCJleHAiOjE2NDQxMzkwNzYsImlzcyI6InZlbG9nLmlvIiwic3ViIjoiYWNjZXNzX3Rva2VuIn0.YpJyylscaK9S6BbVRR8WiOCcyavAI7f0tMssktKZO_U; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwiaWF0IjoxNjQ0MTM1NDc2LCJleHAiOjE2NDQxMzkwNzYsImlzcyI6InZlbG9nLmlvIiwic3ViIjoiYWNjZXNzX3Rva2VuIn0.YpJyylscaK9S6BbVRR8WiOCcyavAI7f0tMssktKZO_U; _gat_gtag_UA_125599395_1=1    }" },
//     json: {"operationName":"UserTags","variables":{"username":"isntkyu"},"query":"query UserTags($username: String) {\n  userTags(username: $username) {\n    tags {\n      id\n      name\n      description\n      posts_count\n      thumbnail\n      __typename\n    }\n    posts_count\n    __typename\n  }\n}\n"}
//     }).then(response => {
//         let data = JSON.parse(response.body)
//         // console.log(data)
//         let tags = data.data.userTags.tags[0].name

//         got.post("https://v2.velog.io/graphql", {
//             headers: {
//                 cookie: "_ga=GA1.2.402592865.1574765075; __gads=ID=1d61987ced4df306-226a319d7cc600d5:T=1616220310:RT=1616220310:S=ALNI_Ma3n58Jmjk2d9IittCQnnfAJw0bIw; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwidG9rZW5faWQiOiI5MjdjMjBjZS05YjQyLTRmZGItOGRmYi1lNWY5NWQ3YTIyYmQiLCJpYXQiOjE2NDM1Mzc4NjEsImV4cCI6MTY0NjEyOTg2MSwiaXNzIjoidmVsb2cuaW8iLCJzdWIiOiJyZWZyZXNoX3Rva2VuIn0.r7uaM9_UMEh9SGA1_2umCWli9IkSByJSGOGCAqoaeAw; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwidG9rZW5faWQiOiI5MjdjMjBjZS05YjQyLTRmZGItOGRmYi1lNWY5NWQ3YTIyYmQiLCJpYXQiOjE2NDM1Mzc4NjEsImV4cCI6MTY0NjEyOTg2MSwiaXNzIjoidmVsb2cuaW8iLCJzdWIiOiJyZWZyZXNoX3Rva2VuIn0.r7uaM9_UMEh9SGA1_2umCWli9IkSByJSGOGCAqoaeAw; _gid=GA1.2.852154745.1644056278; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwiaWF0IjoxNjQ0MTM1NDc2LCJleHAiOjE2NDQxMzkwNzYsImlzcyI6InZlbG9nLmlvIiwic3ViIjoiYWNjZXNzX3Rva2VuIn0.YpJyylscaK9S6BbVRR8WiOCcyavAI7f0tMssktKZO_U; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwiaWF0IjoxNjQ0MTM1NDc2LCJleHAiOjE2NDQxMzkwNzYsImlzcyI6InZlbG9nLmlvIiwic3ViIjoiYWNjZXNzX3Rva2VuIn0.YpJyylscaK9S6BbVRR8WiOCcyavAI7f0tMssktKZO_U; _gat_gtag_UA_125599395_1=1    }"            },
//             json: {"operationName":"Posts","variables":{"username":"isntkyu","tag":`${tags}`},"query":"query Posts($cursor: ID, $username: String, $temp_only: Boolean, $tag: String, $limit: Int) {\n  posts(cursor: $cursor, username: $username, temp_only: $temp_only, tag: $tag, limit: $limit) {\n    id\n    title\n    short_description\n    thumbnail\n    user {\n      id\n      username\n      profile {\n        id\n        thumbnail\n        __typename\n      }\n      __typename\n    }\n    url_slug\n    released_at\n    updated_at\n    comments_count\n    tags\n    is_private\n    likes\n    __typename\n  }\n}\n"}
//         }).then(resp => {
//             // console.log(resp.body)
//             let postId = JSON.parse(resp.body)
//             // console.log(postId.data.posts[0].id)

//             got.post("https://v2.velog.io/graphql", {
//                 headers: {
//                     cookie: "_ga=GA1.2.402592865.1574765075; __gads=ID=1d61987ced4df306-226a319d7cc600d5:T=1616220310:RT=1616220310:S=ALNI_Ma3n58Jmjk2d9IittCQnnfAJw0bIw; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwidG9rZW5faWQiOiI5MjdjMjBjZS05YjQyLTRmZGItOGRmYi1lNWY5NWQ3YTIyYmQiLCJpYXQiOjE2NDM1Mzc4NjEsImV4cCI6MTY0NjEyOTg2MSwiaXNzIjoidmVsb2cuaW8iLCJzdWIiOiJyZWZyZXNoX3Rva2VuIn0.r7uaM9_UMEh9SGA1_2umCWli9IkSByJSGOGCAqoaeAw; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwidG9rZW5faWQiOiI5MjdjMjBjZS05YjQyLTRmZGItOGRmYi1lNWY5NWQ3YTIyYmQiLCJpYXQiOjE2NDM1Mzc4NjEsImV4cCI6MTY0NjEyOTg2MSwiaXNzIjoidmVsb2cuaW8iLCJzdWIiOiJyZWZyZXNoX3Rva2VuIn0.r7uaM9_UMEh9SGA1_2umCWli9IkSByJSGOGCAqoaeAw; _gid=GA1.2.852154745.1644056278; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwiaWF0IjoxNjQ0MTM1NDc2LCJleHAiOjE2NDQxMzkwNzYsImlzcyI6InZlbG9nLmlvIiwic3ViIjoiYWNjZXNzX3Rva2VuIn0.YpJyylscaK9S6BbVRR8WiOCcyavAI7f0tMssktKZO_U; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzJlNTgwYzMtYzE4OC00NzBiLWFiYzAtMTg1NThjZDRlZGRkIiwiaWF0IjoxNjQ0MTM1NDc2LCJleHAiOjE2NDQxMzkwNzYsImlzcyI6InZlbG9nLmlvIiwic3ViIjoiYWNjZXNzX3Rva2VuIn0.YpJyylscaK9S6BbVRR8WiOCcyavAI7f0tMssktKZO_U; _gat_gtag_UA_125599395_1=1    }"                },
//                 json: {"operationName":"GetStats","variables":{"post_id":`${postId.data.posts[0].id}`},"query":"query GetStats($post_id: ID!) {\n  getStats(post_id: $post_id) {\n    total\n    count_by_day {\n      count\n      day\n      __typename\n    }\n    __typename\n  }\n}\n"}
//             }).then(respon => {
//                 // console.log(respon.body)
//                 let result = JSON.parse(respon.body)

//                 let view = result.data.getStats.total
//                 to += view

//                 // console.log(to)
//             })
            
//             // res.send({profile: data.data.userTags.posts_count})
//         })
//     })

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
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/search_post', function (req, res) {  
    console.log('POST');
    console.log(req.body);
    let userName = req.body.userId;
    let accessToken = req.body.accessToken;
    async.waterfall([
        function(callback) { //태그 다 가져오기
            got.post("https://v2.velog.io/graphql", {
                headers: {
                   cookie: accessToken
                },
                json: {
                    "operationName":"Posts",
                    "variables":{
                        "username":`${userName}`,
                        "tag":null
                    },
                    "query":"query Posts($cursor: ID, $username: String, $temp_only: Boolean, $tag: String, $limit: Int) {\n  posts(cursor: $cursor, username: $username, temp_only: $temp_only, tag: $tag, limit: $limit) {\n    id\n    title\n    short_description\n    thumbnail\n    user {\n      id\n      username\n      profile {\n        id\n        thumbnail\n        __typename\n      }\n      __typename\n    }\n    url_slug\n    released_at\n    updated_at\n    comments_count\n    tags\n    is_private\n    likes\n    __typename\n  }\n}\n"
                }
            }).then(response => {
                console.log(JSON.parse(response.body).data.posts)
                let posts = JSON.parse(response.body).data.posts
                let postIds = posts.map(post => post.id)
                // console.log(postIds)
                callback(null, postIds);
            })
        },
        function(arg1, callback) { // 태그이름 담기
            let postsLength = arg1.length
            console.log("post s Length: ", postsLength)
    
            let count = 0;
            let total = 0;
            async.whilst(
                function test(cb) { cb(null, count < postsLength); },
                function iter(callback) {
                    got.post("https://v2.velog.io/graphql", {
                        headers: {
                            cookie: accessToken
                        },
                        json: {
                            "operationName":"GetStats",
                            "variables":{
                                "post_id":`${arg1[count]}`
                            },
                            "query":"query GetStats($post_id: ID!) {\n  getStats(post_id: $post_id) {\n    total\n    count_by_day {\n      count\n      day\n      __typename\n    }\n    __typename\n  }\n}\n"
                        }
                    }).then(response => {
                        count++;
                        let result = JSON.parse(response.body)
                        console.log(result)
                        let view = result.data.getStats.total
                        total += view
                        // console.log(to)
                        callback();
                    })
                },
                function (err, n) {
                    console.log("total:", total)
                    callback(null, total);
                }
            );
        },
    ], function (err, result) {
        console.log(result)
        res.send({result:result})
    });
})

