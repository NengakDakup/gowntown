import { EmploymentFormValues } from "./schema";

export const defaultValues: EmploymentFormValues = {
  employment: [{
    typeOfEmployment: "Public",
    nameOfOrganisation: "",
    position: "",
    jobTitle: "",
    jobDescription: "",
    startDate: "",
    gradeLevelScale: 0,
    numberOfStaff: 0,
    stateIndividualStaffRole: "",
    monthlySalary: "",
    stillEmployed: "No",
    endDate: "",
    reasonForLeaving: "",
  }],
};
