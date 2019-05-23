import * as bcrypt from "bcryptjs";
import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { invalidLogin, confirmEmailErr } from "./errorMessages";

//import { createConfirmEmailLink } from "../../utils/confirmedEmailLink";

const errorResponse = [
  {
    path: "email",
    message: invalidLogin
  }
];

export const resolvers: ResolverMap = {
  Query: {
    bye2: () => "bye"
  },
  Mutation: {
    login: async (_, { email, password }: GQL.ILoginOnMutationArguments) => {
      const user = await User.findOne({ where: { email } });

			if (!user) return errorResponse;
			
			// Checkin if user confirm the email.
			if(!user.confirmed){
				return[{
					path: "email",
					message: confirmEmailErr 
				}]
			}

      const valid = await bcrypt.compare(password, user.password);

			if (!valid) return errorResponse;
			
			return null;
    }
  }
};
