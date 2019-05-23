import { request } from "graphql-request";
import { invalidLogin, confirmEmailErr } from "./errorMessages";
import { User } from "../../entity/User";
import { createTypeormConn } from "../../utils/createTypeormConn";

const email = "tom@gsdmail.com";
const password = "jasasdsad";

const registerMutation = (e: string, p: string) => `
mutation {
  register(email: "${e}", password: "${p}") {
    path
    message
  }
}
`;



const loginExpectError = async (e: string, p: string, errMsg: string) => {
  const response = await request(
    process.env.TEST_HOST as string,
    loginMutation(e, p)
  );
  expect(response).toEqual({
    login: [
      {
        path: "email",
        message: errMsg
      }
    ]
  });
};

const loginMutation = (e: string, p: string) => `
mutation {
  login(email: "${e}", password: "${p}") {
    path
    message
  }
}
`;

beforeAll(async () => {
    await createTypeormConn();
  });

describe("login", () => {
  test("test  email not found", async () => {
    loginExpectError("bob@boasob.com", "whateaver", invalidLogin);
  });

  test("test wrong password", async () => {
    await request(
      process.env.TEST_HOST as string,
      registerMutation(email, password)
    );
  });

  test("confirm email", async () => {
    await loginExpectError(email, password, confirmEmailErr);

    await User.update({ email }, { confirmed: true });

    await loginExpectError(email, "ajsdj", invalidLogin);
  });

  test("test can login", async () => {
    const response = await request(
      process.env.TEST_HOST as string,
      loginMutation(email, password)
    );
    expect(response).toEqual({ login: null });
  });
});
