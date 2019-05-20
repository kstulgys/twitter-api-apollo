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
    return await this.post("user", authToken)
  }

  async getTestData() {
    return await this.get("test")
  }
}

module.exports = TwitterAPI
