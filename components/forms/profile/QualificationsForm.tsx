'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const qualificationsFormSchema = z.object({
  education: z.array(z.object({
    degree: z.string().min(2, "Degree is required"),
    institution: z.string().min(2, "Institution is required"),
    graduationYear: z.string().min(4, "Valid year required"),
  })),
  skills: z.array(z.object({
    name: z.string().min(2, "Skill name is required"),
    level: z.string().min(1, "Skill level is required"),
  })),
});

type QualificationsFormValues = z.infer<typeof qualificationsFormSchema>;

interface QualificationsFormProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function QualificationsForm({ onNext, onPrevious }: QualificationsFormProps) {
  const form = useForm<QualificationsFormValues>({
    resolver: zodResolver(qualificationsFormSchema),
    defaultValues: {
      education: [{ degree: "", institution: "", graduationYear: "" }],
      skills: [{ name: "", level: "" }],
    },
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = 
    useFieldArray({
      name: "education",
      control: form.control,
    });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = 
    useFieldArray({
      name: "skills",
      control: form.control,
    });

  function onSubmit(data: QualificationsFormValues) {
    console.log(data);
    onNext();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Education</h3>
          {educationFields.map((field, index) => (
            <div key={field.id} className="space-y-4 p-4 border rounded-lg">
              <FormField
                control={form.control}
                name={`education.${index}.degree`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <Input placeholder="Bachelor of Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`education.${index}.institution`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution</FormLabel>
                    <FormControl>
                      <Input placeholder="University Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`education.${index}.graduationYear`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Graduation Year</FormLabel>
                    <FormControl>
                      <Input placeholder="2023" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {educationFields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeEducation(index)}
                >
                  Remove Education
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendEducation({ degree: "", institution: "", graduationYear: "" })}
          >
            Add Education
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Skills</h3>
          {skillFields.map((field, index) => (
            <div key={field.id} className="space-y-4 p-4 border rounded-lg">
              <FormField
                control={form.control}
                name={`skills.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill Name</FormLabel>
                    <FormControl>
                      <Input placeholder="JavaScript" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`skills.${index}.level`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proficiency Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {skillFields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSkill(index)}
                >
                  Remove Skill
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendSkill({ name: "", level: "" })}
          >
            Add Skill
          </Button>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onPrevious}>
            Previous Step
          </Button>
          <Button type="submit">Next Step</Button>
        </div>
      </form>
    </Form>
  );
}
