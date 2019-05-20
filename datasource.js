const { RESTDataSource } = require("apollo-datasource-rest")

class TwitterAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = "https://ybej3.sse.codesandbox.io"
  }

  async getUserInfo(authToken) {
    try {
      const res = await this.post("user", {
        authToken: JSON.parse(authToken)
      })
      const profile_image_url = res.user.profile_image_url.replace(
        "_normal",
        ""
      )

      return {
        id: res.user.id,
        profile_image_url: profile_image_url,
        screen_name: res.user.screen_name,
        name: res.user.name,
        location: res.user.location
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  async getFeed(authToken) {
    try {
      const res = await this.post("home", {
        authToken: JSON.parse(authToken)
      })
      return res.tweets.map(this.reduceTweet)
    } catch (e) {
      console.log(e.message)
    }
  }

  reduceTweet(tweet) {
    return {
      id: tweet.id,
      profile_image_url: tweet.user.profile_image_url,
      name: tweet.user.name,
      text: tweet.text,
      screen_name: tweet.user.screen_name,
      favorited: tweet.favorited
    }
  }
}

module.exports = TwitterAPI
