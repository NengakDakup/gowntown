import * as z from "zod";

export const qualificationFormSchema = z.object({
  // Education History
  institutionAttended: z.string().min(1, "Please select an institution type"),
  institutionName: z.string().min(1, "Please select an institution name"),
  yearOfEntry: z.string().min(4, "Please enter a valid year"),
  entryMode: z.string().min(1, "Please select an entry mode"),
  matriculationNumber: z.string().min(1, "Please enter your matriculation number"),
  facultySchool: z.string().min(1, "Please enter your faculty/school"),
  department: z.string().min(1, "Please enter your department"),
  courseOfStudy: z.string().min(1, "Please enter your course of study"),
  yearOfGraduation: z.string().min(4, "Please enter a valid year"),
  cgpa: z.number()
    .min(0, "CGPA cannot be negative")
    .max(5, "CGPA cannot be greater than 5")
    .optional(),
  awards: z.string().optional(),

  // Skills
  specialSkillAcquired: z.string().min(1, "Please enter your special skill"),
  skillLevel: z.string().min(1, "Please select a skill level"),
  dateOfSkillAcquired: z.string().min(1, "Please select the date of skill acquisition"),
});
export type InstitutionType = 'university' | 'polytechnic' | 'college';
export type QualificationFormValues = z.infer<typeof qualificationFormSchema>;
