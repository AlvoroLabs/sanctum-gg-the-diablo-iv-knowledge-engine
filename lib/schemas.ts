import { z } from "zod";

export const diagnoseInputSchema = z.object({
  battletag: z.string().trim().max(64).optional().default(""),
  className: z.string().trim().min(2).max(32),
  archetype: z.string().trim().min(2).max(64),
  pitTier: z.coerce.number().int().min(1).max(200),
  gearScore: z.coerce.number().int().min(1).max(100),
  armor: z.coerce.number().int().min(0).max(20000),
  resistance: z.coerce.number().int().min(0).max(100),
  vulnerableUptime: z.coerce.number().int().min(0).max(100),
  resourceGeneration: z.coerce.number().int().min(0).max(100),
  notes: z.string().trim().max(600).optional().default(""),
});

export type DiagnoseInput = z.infer<typeof diagnoseInputSchema>;
