import { EmploymentFormValues } from "./schema";

export const defaultValues: EmploymentFormValues = {
  employment: [{
    typeOfEmployment: "Public",
    nameOfOrganisation: "",
    position: "",
    jobTitle: "",
    jobDescription: "",
    startDate: "",
    gradeLevelScale: undefined,
    numberOfStaff: undefined,
    stateIndividualStaffRole: "",
    monthlySalary: "",
    stillEmployed: "No",
    endDate: "",
    reasonForLeaving: "",
  }],
};
