import { request } from "graphql-request";
import { User } from "../../entity/User";
import {
  duplicatedEmail,
  emailNotLongEnough,
  invalidEmail,
  passwordNotLongEnough
} from "./errorsMessages";
import { createTypeormConn } from "../../utils/createTypeormConn";
import { Connection } from "typeorm";


const email = "tom@gmaiqwel.com";
const password = "jasdsad";

const mutation = (e: string, p: string) => `
mutation {
  register(email: "${e}", password: "${p}") {
    path
    message
  }
}
`
let conn: Connection
beforeAll(async () => {
  conn = await createTypeormConn();
});

afterAll(async () => {
  conn.close();
})

describe("Register user", async () => {
  // Sure can register user
  it("Sure i can register user", async () => {
    const response = await request(process.env.TEST_HOST as string, mutation(email, password));
    expect(response).toEqual({ register: null });
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
  });

  it("Sure can register duplicated emails", async () => {
    const response2: any = await request(process.env.TEST_HOST as string, mutation(email, password));
    expect(response2.register).toHaveLength(1);
    expect(response2.register[0]).toEqual({
      path: "email",
      message: duplicatedEmail
    });
  });

  // catch bad email
  it("catch a bad email", async () => {
    const response3: any = await request(process.env.TEST_HOST as string, mutation("em", password));
    expect(response3).toEqual({
      register: [
        {
          path: "email",
          message: emailNotLongEnough
        },
        {
          path: "email",
          message: invalidEmail
        }
      ]
    });
  });

  // Bad Password Bad Email
  it("Catch a bad password and bad email", async () => {
    const response4: any = await request(process.env.TEST_HOST as string, mutation(email, "12"));
    expect(response4).toEqual({
      register: [
        {
          path: "password",
          message: passwordNotLongEnough
        }
      ]
    });
    const response5: any = await request(process.env.TEST_HOST as string, mutation("ww", "12"));
    expect(response5).toEqual({
      register: [
        {
          path: "email",
          message: emailNotLongEnough
        },
        {
          path: "email",
          message: invalidEmail
        },
        {
          path: "password",
          message: passwordNotLongEnough
        }
      ]
    });
  });
  
});
