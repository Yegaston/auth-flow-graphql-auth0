import { request } from "graphql-request";
import { startServer } from "../../startServer";
import { User } from "../../entity/User";
import {
  duplicatedEmail,
  emailNotLongEnough,
  invalidEmail,
  passwordNotLongEnough
} from "./errorsMessages";

let getHost = () => "";

beforeAll(async () => {
  const app = await startServer();
  const { port }: any = app.address();
  getHost = () => `http://127.0.0.1:${port}`;
});

const email = "tom@gmail.com";
const password = "jasdsad";

const mutation = (e: string, p: string) => `
mutation {
  register(email: "${e}", password: "${p}") {
    path
    message
  }
}
`;

test("Register user", async () => {
  // Sure can register user
  const response = await request(getHost(), mutation(email, password));
  expect(response).toEqual({ register: null });
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);

  // Sure can register duplicated emails
  const response2: any = await request(getHost(), mutation(email, password));
  expect(response2.register).toHaveLength(1);
  expect(response2.register[0]).toEqual({
    path: "email",
    message: duplicatedEmail
  });

  // catch bad email
  const response3: any = await request(getHost(), mutation("em", password));
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

  // Bad Password
  const response4: any = await request(getHost(), mutation(email, "12"));
  expect(response4).toEqual({
    register: [
      {
        path: "password",
        message: passwordNotLongEnough
      }
    ]
  });

  // Bad Password Bad Email
  const response5: any = await request(getHost(), mutation("ww", "12"));
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
