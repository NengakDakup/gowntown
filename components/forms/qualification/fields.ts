import { institutions } from "@/data/helper";
import { type InstitutionType } from "./schema"

export type FormField = {
  name: string;
  title: string;
  type: "text" | "textarea" | "select" | "date" | "number";
  options?: string[];
  requiredName?: string;
  requiredValue?: string;
};


export const createFormFields = (watchedState: InstitutionType | undefined): FormField[] => [
  // Education History
  { 
    name: "institutionAttended", 
    title: "Institution Attended", 
    type: "select", 
    options: ["University", "Polytechnic", "College"] 
  },
  { 
    name: "institutionName", 
    title: "Institution Name", 
    type: "select", 
    options: watchedState ? (institutions as Record<InstitutionType, string[]>)[watchedState] : [],
  },
  { 
    name: "yearOfEntry", 
    title: "Year Of Entry", 
    type: "text" 
  },
  { 
    name: "entryMode", 
    title: "Entry Mode", 
    type: "select", 
    options: ["Sandwich", "Part Time", "Full Time"] 
  },
  { 
    name: "matriculationNumber", 
    title: "Matriculation Number", 
    type: "text" 
  },
  { 
    name: "facultySchool", 
    title: "Faculty / School", 
    type: "text" 
  },
  { 
    name: "department", 
    title: "Department", 
    type: "text" 
  },
  { 
    name: "courseOfStudy", 
    title: "Course of Study", 
    type: "text" 
  },
  { 
    name: "yearOfGraduation", 
    title: "Year Of Graduation", 
    type: "text" 
  },
  { 
    name: "cgpa", 
    title: "Cumulative Grade Point Average (CGPA)", 
    type: "number" 
  },
  { 
    name: "awards", 
    title: "Awards", 
    type: "text" 
  },

  // Skills
  { 
    name: "specialSkillAcquired", 
    title: "Special Skill Acquired", 
    type: "text" 
  },
  { 
    name: "skillLevel", 
    title: "Enter Skill Level", 
    type: "select", 
    options: [
      "NSQ LEVEL 0",
      "NSQ LEVEL 1",
      "NSQ LEVEL 2",
      "NSQ LEVEL 3",
      "NSQ LEVEL 4",
      "NSQ LEVEL 5",
      "NSQ LEVEL 6",
      "NSQ LEVEL 7",
      "NSQ LEVEL 8"
    ] 
  },
  { 
    name: "dateOfSkillAcquired", 
    title: "Date of Skill Acquired", 
    type: "date" 
  },
];
