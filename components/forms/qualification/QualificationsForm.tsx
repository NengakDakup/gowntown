'use client';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  qualificationFormSchema,
  type QualificationFormValues,
  type EducationFormValues,
  type SkillFormValues,
  InstitutionType,
  type QualificationFormPath,
} from "./schema";
import { defaultValues } from "./defaults";
import { createFormFields } from "./fields";
import { useForm } from "@/context/ProfileFormContext";
import { useFieldArray, useForm as useHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

type QualificationsFormProps = {
  onNext: () => void;
  onPrevious?: () => void;
};

export default function QualificationsForm({ onNext, onPrevious }: QualificationsFormProps) {
  const { formData, updateFormData } = useForm();
  const qualificationData = formData.qualification;

  const form = useHookForm<QualificationFormValues>({
    resolver: zodResolver(qualificationFormSchema),
    defaultValues: {
      ...defaultValues,
      ...qualificationData,
    },
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = 
    useFieldArray({
      control: form.control,
      name: "education"
    });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = 
    useFieldArray({
      control: form.control,
      name: "skills"
    });

  function onSubmit(data: QualificationFormValues) {
    updateFormData('qualification', data);
    console.log(data);
    onNext();
  }

  const mapToInstitutionType = (value: string): InstitutionType | undefined => {
    switch (value) {
      case 'university':
      case 'polytechnic':
      case 'college':
        return value;
      default:
        return undefined;
    }
  };

  const renderEducationForm = (index: number) => {
    const watchedState = mapToInstitutionType(form.watch(`education.${index}.institutionAttended`)?.toLowerCase());
    const formFields = createFormFields(watchedState);

    return (
      <Card key={index} className="mb-4">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Education Record {index + 1}</h3>
            {index > 0 && (
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeEducation(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {formFields.map((field, fieldIndex) => (
              <FormField
                key={`${index}-${field.name}`}
                control={form.control}
                name={`education.${index}.${field.name}` as QualificationFormPath}
                render={({ field: formField } : { field: any }) => (
                  <FormItem>
                    <FormLabel>{field.title}</FormLabel>
                    <FormControl>
                      {field.type === "select" ? (
                        <Select
                          value={typeof formField.value === 'string' ? formField.value : String(formField.value)}
                          onValueChange={formField.onChange}
                        >
                          <SelectTrigger className="bg-muted">
                            <SelectValue placeholder={`Select ${field.title}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={`${index}-${option}`} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : field.type === "number" ? (
                        <Input
                          {...formField}
                          className="bg-muted"
                          type="number"
                          step="0.01"
                          onChange={(e) => formField.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        />
                      ) : (
                        <Input className="bg-muted" {...formField} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderSkillForm = (index: number) => (
    <Card key={index} className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Skill Record {index + 1}</h3>
          {index > 0 && (
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeSkill(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={`skills.${index}.specialSkillAcquired`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Skill Acquired</FormLabel>
                <FormControl>
                  <Input className="bg-muted" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`skills.${index}.skillLevel`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skill Level</FormLabel>
                <FormControl>
                  <Select
                    value={typeof field.value === 'string' ? field.value : String(field.value)}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="bg-muted">
                      <SelectValue placeholder="Select Skill Level" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Beginner", "Intermediate", "Advanced", "Expert"].map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`skills.${index}.dateOfSkillAcquired`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Skill Acquisition</FormLabel>
                <FormControl>
                  <Input className="bg-muted" type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Education History</h2>
            <Button
              type="button"
              variant="outline"
              onClick={() => appendEducation({} as any)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Education
            </Button>
          </div>
          {educationFields.map((field, index) => renderEducationForm(index))}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Skills</h2>
            <Button
              type="button"
              variant="outline"
              onClick={() => appendSkill({} as any)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Skill
            </Button>
          </div>
          {skillFields.map((field, index) => renderSkillForm(index))}
        </div>

        <div className="flex justify-between pt-4">
          {onPrevious && (
            <Button type="button" variant="outline" onClick={onPrevious}>
              Previous
            </Button>
          )}
          <Button type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
