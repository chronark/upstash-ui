import { z } from "zod";
export const clusterValidation = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  description: z.string(),
  url: z.string(),
  username: z.string(),
  password: z.string(),
});
export type Cluster = z.infer<typeof clusterValidation>;
