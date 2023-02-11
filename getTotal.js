import axios from "axios";
import _ from "lodash";

export async function getTotal(username, cookie) {
  const url = "https://v2cdn.velog.io/graphql";

  async function getStats(postId) {
    const response = await axios.post(
      url,
      {
        operationName: "GetStats",
        query:
          "query GetStats($post_id: ID!) {\n  getStats(post_id: $post_id) {\n    total\n    count_by_day {\n      count\n      day\n      __typename\n    }\n    __typename\n  }\n}\n",
        variables: {
          post_id: postId,
        },
      },
      {
        headers: {
          cookie: cookie,
        },
      }
    );

    return response.data.data.getStats;
  }

  async function getUserTags() {
    const response = await axios.post(
      url,
      {
        operationName: "UserTags",
        query:
          "query UserTags($username: String) {\n  userTags(username: $username) {\n    tags {\n      id\n      name\n      description\n      posts_count\n      thumbnail\n      __typename\n    }\n    posts_count\n    __typename\n  }\n}\n",
        variables: {
          username: username,
        },
      },
      {
        headers: {
          cookie: cookie,
        },
      }
    );

    return response.data.data.userTags.tags;
  }

  async function getPosts(tagName) {
    const response = await axios.post(
      url,
      {
        operationName: "Posts",
        query:
          "query Posts($cursor: ID, $username: String, $temp_only: Boolean, $tag: String, $limit: Int) {\n  posts(cursor: $cursor, username: $username, temp_only: $temp_only, tag: $tag, limit: $limit) {\n    id\n    title\n    short_description\n    thumbnail\n    user {\n      id\n      username\n      profile {\n        id\n        thumbnail\n        __typename\n      }\n      __typename\n    }\n    url_slug\n    released_at\n    updated_at\n    comments_count\n    tags\n    is_private\n    likes\n    __typename\n  }\n}\n",
        variables: {
          tag: tagName,
          username: username,
        },
      },
      {
        headers: {
          cookie: cookie,
        },
      }
    );

    return response.data.data.posts;
  }

  async function run() {
    const tags = await getUserTags();
    const tagNames = tags.map((tag) => {
      return tag.name;
    });

    let postIds = [];
    for (const tagName of tagNames) {
      const posts = await getPosts(tagName);

      postIds = postIds.concat(
        posts.map((post) => {
          return post.id;
        })
      );
    }

    postIds = _.uniq(postIds);

    let total = 0;
    for (const postId of postIds) {
      const stat = await getStats(postId);
      total += stat.total;
    }

    return total;
  }

  return run();
}
