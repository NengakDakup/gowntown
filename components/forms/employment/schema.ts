import { z } from "zod";

export const employmentSchema = z.object({
  typeOfEmployment: z.enum(["Public", "Private", "NGO", "Self Employed"]),
  nameOfOrganisation: z.string().min(1, "Organization name is required"),
  position: z.string().min(1, "Position is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  jobDescription: z.string().min(1, "Job description is required"),
  startDate: z.string().min(1, "Start date is required"),
  gradeLevelScale: z.number().optional(),
  numberOfStaff: z.number().optional(),
  stateIndividualStaffRole: z.string().optional(),
  monthlySalary: z.string().min(1, "Monthly salary is required"),
  stillEmployed: z.enum(["Yes", "No"]),
  endDate: z.string().optional(),
  reasonForLeaving: z.string().optional(),
});

export const employmentFormSchema = z.object({
  employment: z.array(employmentSchema).min(1, "At least one employment record is required"),
});

export type EmploymentRecord = z.infer<typeof employmentSchema>;
export type EmploymentFormValues = z.infer<typeof employmentFormSchema>;
