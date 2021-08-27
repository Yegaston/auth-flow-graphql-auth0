import { createTypeormConn } from "../../utils/createTypeormConn";
import { Connection } from "typeorm";
import { User } from "../../entity/User";
import axios from "axios";

//import axios from 'axios';

let conn: Connection;
const email = "tom@gsdmail.com";
const password = "jasasdsad";

beforeAll(async () => {
  conn = await createTypeormConn();
  await User.create({
    email,
    password,
    confirmed: true
  }).save();
});

afterAll(async () => {
  conn.close();
});

const loginMutation = (e: string, p: string) => `
mutation {
  login(email: "${e}", password: "${p}") {
    path
    message
  }
}
`;

const meQuery = `
{
    me {
        id
        email
    }
}
`;

describe("me query", () => {
  test("cant get user if not logged in", async () => {});
  test("get current user", async () => {
    console.log(process.env.TEST_HOST);

    await axios.post(
      process.env.TEST_HOST as string,
      {
        query: loginMutation(email, password)
      },
      {
        withCredentials: true
      }
    );

    const response = await axios.post(
      process.env.TEST_HOST as string,
      {
        query: meQuery
      },
      {
        withCredentials: true
      }
    );
    console.log(response.data.data);
  });
});
