import z from "zod";

export const NewHouseholdRpc = z.object({
  name: z.string().min(1, "You must enter a valid name for your household."),
  user_id: z.uuid("Invalid user id."),
});
