import { createConfirmEmailLink } from "./confirmedEmailLink";
import { createTypeormConn } from "./createTypeormConn";
import { User } from "../entity/User";
import * as Redis from "ioredis";
import fetch from "node-fetch";

let userId = "";
const redis = new Redis();

export const getUrl = async () => {
  return await createConfirmEmailLink(
    process.env.TEST_HOST as string,
    userId as string,
    redis
  );
};

export const getResponse = async (url: string) => {
  const response = await fetch(url);
  const text =  await response.text();
  return text
};

beforeAll(async () => {
  await createTypeormConn();
  const user = await User.create({
    email: "bob@bob5.com",
    password: "kjasdjlkas"
  }).save();
  userId = user.id;
});

describe("test createConfirmEmailLink works", () => {
  
    test("make sure it confirms user and clears key in redis.", async () => {
    const url = await getUrl();
    const text = await getResponse(url);
    expect(text).toEqual("ok");

    const user = await User.findOne({ where: { id: userId } });
    expect((user as User).confirmed).toBeTruthy();
    const chunks = url.split("/");
    const key = chunks[chunks.length - 1];
    const value = await redis.get(key);
    expect(value).toBeNull();
  });

  test("sends invalid back if bad id sent", async () => {
      const url = `${process.env.TEST_HOST}/confirm/123981`
      const text = await getResponse(url)
      expect(text).toEqual("invalid")
  })

});
