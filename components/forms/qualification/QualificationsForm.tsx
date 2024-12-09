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
import { Plus, Trash2, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { syncToFirebase } from "@/lib/firebase-utils";

interface QualificationsFormProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function QualificationsForm({ onNext, onPrevious }: QualificationsFormProps) {
  const { formData, updateFormData, isLoading } = useForm();
  const qualificationData = formData.qualification;

  const form = useHookForm<QualificationFormValues>({
    resolver: zodResolver(qualificationFormSchema),
    defaultValues: {
      ...defaultValues,
      ...qualificationData,
    },
  });

  useEffect(() => {
    if (qualificationData) {
      form.reset(qualificationData as QualificationFormValues);
    }
  }, [qualificationData, form]);

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

  async function onSubmit(data: QualificationFormValues) {
    updateFormData('qualification', data);
    await syncToFirebase('qualification', data);
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

  const [openEducation, setOpenEducation] = useState<number | null>(0);
  const [openSkill, setOpenSkill] = useState<number | null>(0);

  const handleEducationToggle = (index: number) => {
    setOpenEducation(openEducation === index ? null : index);
  };

  const handleSkillToggle = (index: number) => {
    setOpenSkill(openSkill === index ? null : index);
  };

  const appendNewEducation = () => {
    appendEducation({} as any);
    const newIndex = educationFields.length;
    setOpenEducation(newIndex);
  };

  const appendNewSkill = () => {
    appendSkill({} as any);
    const newIndex = skillFields.length;
    setOpenSkill(newIndex);
  };

  const hasEducationErrors = (index: number) => {
    const errors = form.formState.errors.education?.[index];
    return errors && Object.keys(errors).length > 0;
  };

  const hasSkillErrors = (index: number) => {
    const errors = form.formState.errors.skills?.[index];
    return errors && Object.keys(errors).length > 0;
  };

  const renderEducationForm = (index: number) => {
    const educationData = form.watch(`education.${index}`);
    const watchedState = mapToInstitutionType(educationData?.institutionAttended?.toLowerCase());
    const formFields = createFormFields(watchedState);
    const hasErrors = hasEducationErrors(index);

    return (
      <Collapsible
        key={index}
        open={openEducation === index}
        onOpenChange={() => handleEducationToggle(index)}
        className="mb-4"
      >
        <Card className={cn({
          "border-destructive": hasErrors && openEducation !== index
        })}>
          <CardContent className="p-4">
            <CollapsibleTrigger className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">Education Record {index + 1}</h3>
                    {hasErrors && openEducation !== index && (
                      <span className="text-sm text-destructive">Contains errors</span>
                    )}
                  </div>
                  {educationData && (
                    <p className="text-sm text-muted-foreground">
                      {educationData.institutionName || "No institution name"} - {educationData.courseOfStudy || "No course specified"}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {index > 0 && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeEducation(index);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", {
                    "-rotate-180": openEducation === index
                  })} />
                </div>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="pt-4">
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
            </CollapsibleContent>
          </CardContent>
        </Card>
      </Collapsible>
    );
  };

  const renderSkillForm = (index: number) => {
    const skillData = form.watch(`skills.${index}`);
    const hasErrors = hasSkillErrors(index);

    return (
      <Collapsible
        key={index}
        open={openSkill === index}
        onOpenChange={() => handleSkillToggle(index)}
        className="mb-4"
      >
        <Card className={cn({
          "border-destructive": hasErrors && openSkill !== index
        })}>
          <CardContent className="p-4">
            <CollapsibleTrigger className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">Skill Record {index + 1}</h3>
                    {hasErrors && openSkill !== index && (
                      <span className="text-sm text-destructive">Contains errors</span>
                    )}
                  </div>
                  {skillData && (
                    <p className="text-sm text-muted-foreground">
                      {skillData.specialSkillAcquired || "No skill specified"} - {skillData.skillLevel || "No level specified"}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {index > 0 && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSkill(index);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", {
                    "-rotate-180": openSkill === index
                  })} />
                </div>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="pt-4">
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
            </CollapsibleContent>
          </CardContent>
        </Card>
      </Collapsible>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Education History</h2>
            <Button
              type="button"
              variant="outline"
              onClick={appendNewEducation}
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
              onClick={appendNewSkill}
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
