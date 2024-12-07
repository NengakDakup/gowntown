export type FieldConfig = {
  name: string;
  title: string;
  type: "text" | "select" | "date" | "number";
  options?: string[];
  requiredTitle?: string;
  requiredValue?: string;
};

export const employmentFields: FieldConfig[] = [
  {
    name: "typeOfEmployment",
    title: "Type Of Employment",
    type: "select",
    options: ["Public", "Private", "NGO", "Self Employed"],
  },
  {
    name: "nameOfOrganisation",
    title: "Name of Organisation",
    type: "text",
  },
  {
    name: "position",
    title: "Position",
    type: "text",
  },
  {
    name: "jobTitle",
    title: "Job Title",
    type: "text",
  },
  {
    name: "jobDescription",
    title: "Job Description",
    type: "text",
  },
  {
    name: "startDate",
    title: "Start Date",
    type: "date",
  },
  {
    name: "gradeLevelScale",
    title: "Grade Level / Scale",
    type: "number",
  },
  {
    name: "numberOfStaff",
    title: "Number Of Staff",
    type: "number",
    requiredTitle: "typeOfEmployment",
    requiredValue: "Self Employed",
  },
  {
    name: "stateIndividualStaffRole",
    title: "State Individual Staff Role",
    type: "text",
    requiredTitle: "typeOfEmployment",
    requiredValue: "Self Employed",
  },
  {
    name: "monthlySalary",
    title: "Monthly Salary",
    type: "select",
    options: ["Below 100,000", "101,000 - 500,000", "501,000 - 1,000,000", "1,000,000 - 5,000,000", "5,000,000 - 10,000,000", "10,000,000 - 15,000,000", "15,000,000 and above"],
  },
  {
    name: "stillEmployed",
    title: "Are you still employed Here?",
    type: "select",
    options: ["Yes", "No"],
  },
  {
    name: "endDate",
    title: "End Date",
    type: "date",
    requiredTitle: "stillEmployed",
    requiredValue: "No",
  },
  {
    name: "reasonForLeaving",
    title: "Reason For Leaving",
    type: "text",
    requiredTitle: "stillEmployed",
    requiredValue: "No",
  },
];
