import * as z from "zod";

export const profileFormSchema = z.object({
  aboutYou: z.string().min(10, "Please provide at least 10 characters about yourself"),
  title: z.string().min(1, "Please select a title"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  gender: z.string().min(1, "Please select your gender"),
  dateOfBirth: z.string().min(1, "Please select your date of birth"),
  nin: z.string().min(11, "NIN must be 11 digits").max(11),
  religion: z.string().min(1, "Please select your religion"),
  nationality: z.string().min(1, "Please select your nationality"),
  stateOfOrigin: z.string().min(1, "Please select your state of origin"),
  localGovernmentArea: z.string().min(1, "Please select your LGA"),
  maritalStatus: z.string().min(1, "Please select your marital status"),
  dateOfMarriage: z.string().optional(),
  dateOfDivorce: z.string().optional(),
  dateOfWidowWidower: z.string().optional(),
  numberOfChildren: z.number().min(0, "Number of children cannot be negative").optional(),
  numberOfDependents: z.number().min(0, "Number of dependents cannot be negative").optional(),
  physicalAddress: z.string().min(10, "Please provide a detailed physical address"),
  officeAddress: z.string().min(10, "Please provide a detailed office address").optional(),
  disability: z.string().min(1, "Please select yes or no"),
  disabilitySpecification: z.string().min(10, "Please provide details about your disability").optional(),
  disabilityOccurrence: z.string().optional(),
  contactNumber: z.string()
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number cannot exceed 15 digits")
    .regex(/^[0-9+\-\s()]*$/, "Invalid phone number format"),
  facebook: z.string().url("Please enter a valid Facebook URL").optional(),
  twitter: z.string().url("Please enter a valid Twitter URL").optional(),
  instagram: z.string().url("Please enter a valid Instagram URL").optional(),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional(),
  researchGate: z.string().url("Please enter a valid ResearchGate URL").optional(),
  whatsapp: z.string()
    .min(10, "WhatsApp number must be at least 10 digits")
    .max(15, "WhatsApp number cannot exceed 15 digits")
    .regex(/^[0-9+\-\s()]*$/, "Invalid phone number format")
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
