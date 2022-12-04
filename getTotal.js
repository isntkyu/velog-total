const { default: axios } = require("axios");

const server = async () => {
  const userPost = await axios("https://v2cdn.velog.io/graphql", {
    headers: {
      accept: "*/*",
      "accept-language": "ko-KR,ko;q=0.9",
      "content-type": "application/json",
      "sec-ch-ua":
        '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      cookie: "",
      Referer: "https://velog.io/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: '{"operationName":"UserTags","variables":{"username":"isntkyu"},"query":"query UserTags($username: String) {\\n  userTags(username: $username) {\\n    tags {\\n      id\\n      name\\n      description\\n      posts_count\\n      thumbnail\\n      __typename\\n    }\\n    posts_count\\n    __typename\\n  }\\n}\\n"}',
    method: "POST",
  });
  // reponse.body.data.userTags.tags[{id: TagID}]
  // {"data":{"userTags":{"tags":[{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:de5caff0-0511-11e9-a91e-3747ce36bb41","name":"cpp","description":null,"posts_count":8,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:6dfe6d20-e892-11e8-98f5-997ef3c38110","name":"알고리즘","description":"주어진 문제에 대한 하나 이상의 결과를 생성하기 위해 모호함이 없는 간단하고 컴퓨터가 수행 가능한 일련의 유한개의 명령을 순서적으로 구성한 것","posts_count":8,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:1669b5c0-0295-11e9-b00c-a93834cbfa43","name":"Spring","description":null,"posts_count":7,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:8d1a0a60-c61f-11e8-b3a6-c16d8d6c5f3d","name":"JavaScript","description":"JavaScript(JS)는 가벼운 인터프리터 또는 JIT 컴파일 프로그래밍 언어로, 일급 함수를 지원합니다. 웹 페이지의 스크립트 언어로서 제일 유명하지만 Node.js, Apache CouchDB, Adobe Acrobat처럼 많은 비 브라우저 환경에서도 사용하고 있습니다. JavaScript는 프로토타입 기반의 동적 다중 패러다임 스크립트 언어로, 객체지향형, 명령형, 선언형(함수형 프로그래밍 등) 스타일을 지원합니다.","posts_count":7,"thumbnail":"https://images.velog.io/tags/JavaScript.png","__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:5a69f7b1-c72d-11e8-a770-8b967d808a7c","name":"nodejs","description":null,"posts_count":5,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:44670540-2185-11e9-b58e-831311eda41b","name":"프로그래머스","description":null,"posts_count":5,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:166792e0-0295-11e9-b00c-a93834cbfa43","name":"JPA","description":null,"posts_count":2,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:622a07d0-17b2-11e9-a79c-0f7ba5d4c2f1","name":"vue","description":null,"posts_count":2,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:c9c1e2a0-ebf2-11e8-9bc4-d739aed2e2c7","name":"mysql","description":null,"posts_count":2,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:f2259bf0-d2fd-11e8-9f58-a7e2844da413","name":"aws","description":null,"posts_count":2,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:f886dad1-2aeb-11ea-820f-33410fd1e8a9","name":"NestJS","description":null,"posts_count":2,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:8a079337-fffb-4c98-bc5c-e3bcc4972c87","name":"테스트 주도 개발 시작하기 - 최범균","description":null,"posts_count":1,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:283abc57-4258-4d81-b75c-6839c315077c","name":"독후감","description":null,"posts_count":1,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:8ff84420-196e-11e9-89f9-ff8768209ba4","name":"typeOrm","description":null,"posts_count":1,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:a5a12f71-c497-11e8-9462-6f5f612b5c8d","name":"mongodb","description":null,"posts_count":1,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:af524510-3a5f-11ea-90c2-d71c7bab0238","name":"bootstrap","description":null,"posts_count":1,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:f57a85b0-04b5-11e9-960b-c7f9e407ebe7","name":"백준","description":null,"posts_count":1,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:20ad9f62-c203-11e8-a5a7-8d2dcaaa3b7d","name":"typescript","description":null,"posts_count":1,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:f0c6f650-d2fd-11e8-9f58-a7e2844da413","name":"nosql","description":null,"posts_count":1,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:f7deab60-d779-11e8-8443-f9c08cacf6d1","name":"express","description":null,"posts_count":1,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:69b827b0-295b-11e9-96f9-e7f63e0e62e4","name":"lambda","description":null,"posts_count":1,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:6d1e0be0-1029-11e9-be96-a7619311db56","name":"TDD","description":null,"posts_count":1,"thumbnail":null,"__typename":"Tag"},{"id":"c2e580c3-c188-470b-abc0-18558cd4eddd:498d5280-e9bd-11e9-8497-65e9f9f8ccb0","name":"rds","description":null,"posts_count":1,"thumbnail":null,"__typename":"Tag"}],"posts_count":33,"__typename":"UserTags"}}}

  const total = await axios("https://v2cdn.velog.io/graphql", {
    headers: {
      accept: "*/*",
      "accept-language": "ko-KR,ko;q=0.9",
      "content-type": "application/json",
      "sec-ch-ua":
        '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",

      cookie: "",
      Referer: "https://velog.io/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: '{"operationName":"GetStats","variables":{"post_id":"d6938f88-4361-414f-a245-01b9e2213aab"},"query":"query GetStats($post_id: ID!) {\\n  getStats(post_id: $post_id) {\\n    total\\n    count_by_day {\\n      count\\n      day\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}',
    method: "POST",
  });
};

// response.body.data.getStats.total
//{"data":{"getStats":{"total":5,"count_by_day":[{"count":1,"day":"2022-12-04T00:00:00.000Z","__typename":"ReadCountByDay"},{"count":1,"day":"2022-12-03T00:00:00.000Z","__typename":"ReadCountByDay"},{"count":1,"day":"2022-12-01T00:00:00.000Z","__typename":"ReadCountByDay"},{"count":2,"day":"2022-11-30T00:00:00.000Z","__typename":"ReadCountByDay"}],"__typename":"Stats"}}}
server();

// 태그의 게시물들을 가져오는 코드
fetch("https://v2cdn.velog.io/graphql", {
  headers: {
    accept: "*/*",
    "accept-language": "ko-KR,ko;q=0.9",
    "content-type": "application/json",
    "sec-ch-ua":
      '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",

    cookie: "",
    Referer: "https://velog.io/",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
  body: '{"operationName":"Posts","variables":{"username":"isntkyu","tag":"cpp"},"query":"query Posts($cursor: ID, $username: String, $temp_only: Boolean, $tag: String, $limit: Int) {\\n  posts(cursor: $cursor, username: $username, temp_only: $temp_only, tag: $tag, limit: $limit) {\\n    id\\n    title\\n    short_description\\n    thumbnail\\n    user {\\n      id\\n      username\\n      profile {\\n        id\\n        thumbnail\\n        __typename\\n      }\\n      __typename\\n    }\\n    url_slug\\n    released_at\\n    updated_at\\n    comments_count\\n    tags\\n    is_private\\n    likes\\n    __typename\\n  }\\n}\\n"}',
  method: "POST",
});
// response.body.data.posts[ {id: ID }]
