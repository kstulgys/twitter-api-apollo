const { RESTDataSource } = require("apollo-datasource-rest")

class TwitterAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = "http://localhost:4000"
  }

  // export const getUserInfo = async authToken => {
  //   return await fetch(`${config.serverUrl}/user`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ authToken })
  //   }).then(r => r.json())
  // }

  async getUserInfo(authToken) {
    try {
      const res = await this.post("user", authToken)
      console.log('in user&&&&&&&&&', res)

    } catch (e) {
      console.log('Error', e)

    }
    // return {
    //   id: user.id,
    //   profile_image_url: user.profile_image_url,
    //   screen_name: user.screen_name,
    // }
  }

  async getTestData() {
    return await this.get("test")
  }
}

module.exports = TwitterAPI
