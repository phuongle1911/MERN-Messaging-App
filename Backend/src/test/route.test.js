const request = require("supertest");
const { app } = require("../server");

const { UserModel } = require("../database/entities/User");

describe("Users route works.", () => {
  it("Register route works ", async () => {
    // Spy on UserModel.findOne and mock its resolution
    registerUser = {
      email: "abcd@gmail.com",
      username: "abcdef",
      password: "Abcd2335!"
    }
    jest.spyOn(UserModel, 'findOne').mockResolvedValue(false);

    let response = await request(app)
      .post("/api/users/register")
      .send(registerUser);
    expect(response.status).toEqual(200);
  });

  it("Login route works ", async () => {
    // Spy on UserModel.findOne and mock its resolution
    mockUser = {
      email: "jack12@gmail.com",
      username: "jack12",
      password: "Jack1234!"
    }
    jest.spyOn(UserModel, 'findOne').mockResolvedValue(true);
    let response = await request(app)
      .post("/api/users/login")
      .send({
        email: "jack12@gmail.com",
        username: "jack12",
        password: "Jack1234!"
      });

    expect(response.status).toEqual(200);
  });
});