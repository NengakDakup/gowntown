import { getLGAs, nigerianStates } from "@/data/helper";

export type FormField = {
  name: string;
  title: string;
  type: "text" | "textarea" | "select" | "date" | "number";
  options?: string[];
  requiredName?: string;
  requiredValue?: string;
};

export const createFormFields = (watchedState: string | undefined): FormField[] => [
  { name: "aboutYou", title: "About You", type: "textarea" },
  { name: "title", title: "Title", type: "select", options: ["Mr.", "Mrs.", "Miss", "Dr.", "Prof."] },
  { name: "firstName", title: "First Name", type: "text" },
  { name: "middleName", title: "Middle Name", type: "text" },
  { name: "lastName", title: "Last Name", type: "text" },
  { name: "gender", title: "Gender", type: "select", options: ["Male", "Female"] },
  { name: "dateOfBirth", title: "Date of Birth", type: "date" },
  { name: "nin", title: "NIN", type: "text" },
  { name: "religion", title: "Religion", type: "select", options: ["Christianity", "Islam", "Others"] },
  { name: "nationality", title: "Nationality", type: "select", options: ["Nigerian", "Others"] },
  { name: "stateOfOrigin", title: "State of Origin", type: "select", options: nigerianStates },
  { name: "localGovernmentArea", title: "Local Government Area", type: "select", options: watchedState ? getLGAs(watchedState) : [] },
  { name: "maritalStatus", title: "Marital Status", type: "select", options: ["Single", "Married", "Divorced", "Widow/Widower"] },
  { name: "dateOfMarriage", title: "Date of Marriage", type: "date", requiredName: "maritalStatus", requiredValue: "Married" },
  { name: "dateOfDivorce", title: "Date of Divorce", type: "date", requiredName: "maritalStatus", requiredValue: "Divorced" },
  { name: "dateOfWidowWidower", title: "Date of Widow/Widower", type: "date", requiredName: "maritalStatus", requiredValue: "Widow/Widower" },
  { name: "numberOfChildren", title: "Number of Children", type: "number" },
  { name: "numberOfDependents", title: "Number of Dependents", type: "number" },
  { name: "physicalAddress", title: "Physical Address", type: "textarea" },
  { name: "officeAddress", title: "Office Address", type: "textarea" },
  { name: "disability", title: "Disability", type: "select", options: ["Yes", "No"] },
  { name: "disabilitySpecification", title: "Disability Specification", type: "text", requiredName: "disability", requiredValue: "Yes" },
  { name: "disabilityOccurrence", title: "Disability Occurrence", type: "date", requiredName: "disability", requiredValue: "Yes" },
  { name: "contactNumber", title: "Contact Number", type: "text" },
  { name: "facebook", title: "Facebook", type: "text" },
  { name: "twitter", title: "Twitter", type: "text" },
  { name: "instagram", title: "Instagram", type: "text" },
  { name: "linkedin", title: "LinkedIn", type: "text" },
  { name: "researchGate", title: "ResearchGate", type: "text" },
  { name: "whatsapp", title: "WhatsApp", type: "text" },
];
