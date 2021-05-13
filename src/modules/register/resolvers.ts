import { object, string } from "yup";
import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { formatYupError } from "../../utils/formatYupError";
import {
  duplicatedEmail,
  emailNotLongEnough,
  invalidEmail
} from "./errorsMessages";
//import { createConfirmEmailLink } from "../../utils/confirmedEmailLink";

const schema = object().shape({
  email: string()
    .min(3, emailNotLongEnough) // Si agregas un parametro mas podes cambiar el error menesaje
    .max(255)
    .email(invalidEmail),
  password: string()
    .min(3)
    .max(255)
});

export const resolvers: ResolverMap = {
  Query: {
    bye: () => "bye"
  },
  Mutation: {
    register: async (
      _,
      args: GQL.IRegisterOnMutationArguments,
      // { redis, url }
    ) => {
      // Validations
      try {
        await schema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const { email, password } = args;

      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ["id"]
      });

      if (userAlreadyExists) {
        return [
          {
            path: "email",
            message: duplicatedEmail
          }
        ];
      }

      const user = User.create({
        email,
        password,
      });

      await user.save();

      // await createConfirmEmailLink(url, user.id, redis);

      return null;
    }
  }
};
