import * as z from "zod";

export type InstitutionType = 'university' | 'polytechnic' | 'college';

const educationSchema = z.object({
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
});

const skillSchema = z.object({
  specialSkillAcquired: z.string().min(1, "Please enter your special skill"),
  skillLevel: z.string().min(1, "Please select a skill level"),
  dateOfSkillAcquired: z.string().min(1, "Please select the date of skill acquisition"),
});

export const qualificationFormSchema = z.object({
  education: z.array(educationSchema).min(1, "At least one education record is required"),
  skills: z.array(skillSchema).min(1, "At least one skill record is required"),
});

export type EducationFormValues = z.infer<typeof educationSchema>;
export type SkillFormValues = z.infer<typeof skillSchema>;
export type QualificationFormValues = z.infer<typeof qualificationFormSchema>;

export type EducationFieldName = keyof EducationFormValues;
export type EducationPath = "education" | `education.${number}` | `education.${number}.${EducationFieldName}`;
export type SkillFieldName = keyof SkillFormValues;
export type SkillPath = "skills" | `skills.${number}` | `skills.${number}.${SkillFieldName}`;
export type QualificationFormPath = EducationPath | SkillPath;
