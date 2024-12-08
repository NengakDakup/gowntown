import type { QualificationFormValues } from "./schema";

export const defaultValues: Partial<QualificationFormValues> = {
  education: [{
    institutionAttended: "",
    institutionName: "",
    yearOfEntry: "",
    entryMode: "",
    matriculationNumber: "",
    facultySchool: "",
    department: "",
    courseOfStudy: "",
    yearOfGraduation: "",
    cgpa: 0,
    awards: "",
  }],
  skills: [{
    specialSkillAcquired: "",
    skillLevel: "",
    dateOfSkillAcquired: "",
  }]
};
