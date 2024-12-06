'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { institutions, nigerianStates, getLGAs } from "@/data/helper";

const profileFormSchema = z.object({
  aboutYou: z.string(),
  title: z.string(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  gender: z.string(),
  dateOfBirth: z.string(),
  nin: z.string(),
  religion: z.string(),
  nationality: z.string(),
  stateOfOrigin: z.string(),
  localGovernmentArea: z.string(),
  maritalStatus: z.string(),
  dateOfMarriage: z.string().optional(),
  dateOfDivorce: z.string().optional(),
  dateOfWidowWidower: z.string().optional(),
  numberOfChildren: z.number().min(0).optional(),
  numberOfDependents: z.number().min(0).optional(),
  physicalAddress: z.string(),
  officeAddress: z.string().optional(),
  disability: z.string(),
  disabilitySpecification: z.string().optional(),
  disabilityOccurrence: z.string().optional(),
  contactNumber: z.string().min(10, "Contact number must be at least 10 digits"),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  researchGate: z.string().optional(),
  whatsapp: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  onNext: () => void;
}

export default function ProfileForm({ onNext }: ProfileFormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      aboutYou: "",
      title: "",
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      nin: "",
      religion: "",
      nationality: "",
      stateOfOrigin: "",
      localGovernmentArea: "",
      maritalStatus: "",
      numberOfChildren: 0,
      numberOfDependents: 0,
      physicalAddress: "",
      officeAddress: "",
      disability: "",
      contactNumber: "",
    },
  });

  const watchedState = form.watch("stateOfOrigin");

  const formFields = [
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
  ] as const;

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    onNext();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {formFields.map((field) => {
            const shouldRender = ('requiredName' in field)
              ? form.watch(field.requiredName) === field.requiredValue
              : true;

            if (!shouldRender) return null;

            return (
              <FormField
                key={field.title}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem className={field.type === "textarea" ? "col-span-2" : ""}>
                    <FormLabel>{field.title}</FormLabel>
                    <FormControl>
                      {field.type === "select" ? (
                        <Select
                          onValueChange={formField.onChange}
                          defaultValue={formField.value !== undefined ? String(formField.value) : ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${field.title}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : field.type === "date" ? (
                        <Input type="date" {...formField} />
                      ) : field.type === "number" ? (
                        <Input type="number" {...formField} />
                      ) : field.type === "textarea" ? (
                        <Textarea {...formField} />
                      ) : (
                        <Input {...formField} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
        </div>
        <div className="flex justify-end">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}
