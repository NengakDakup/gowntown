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
import { employmentFormSchema, type EmploymentFormValues } from "./schema";
import { defaultValues } from "./defaults";
import { employmentFields as employmentFormFields } from "./fields";
import { useForm } from "@/context/ProfileFormContext";
import { useFieldArray, useForm as useHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { syncToFirebase } from "@/lib/firebase-utils";

type EmploymentFormProps = {
  onNext: () => void;
  onPrevious?: () => void;
};

export default function EmploymentForm({ onNext, onPrevious }: EmploymentFormProps) {
  const { formData, updateFormData } = useForm();
  const employmentData = formData.employment;

  const form = useHookForm<EmploymentFormValues>({
    resolver: zodResolver(employmentFormSchema),
    defaultValues: {
      ...defaultValues,
      ...employmentData,
    },
  });

  const { fields: employmentFields, append: appendEmployment, remove: removeEmployment } = 
    useFieldArray({
      control: form.control,
      name: "employment"
    });

  const [openEmployment, setOpenEmployment] = useState<number | null>(0);

  const handleEmploymentToggle = (index: number) => {
    setOpenEmployment(openEmployment === index ? null : index);
  };

  const appendNewEmployment = () => {
    appendEmployment({} as any);
    const newIndex = employmentFields.length;
    setOpenEmployment(newIndex);
  };

  const hasEmploymentErrors = (index: number) => {
    const errors = form.formState.errors.employment?.[index];
    return errors && Object.keys(errors).length > 0;
  };

  async function onSubmit(data: EmploymentFormValues) {
    updateFormData('employment', data);
    await syncToFirebase('employment', data);
    onNext();
  }

  const renderEmploymentForm = (index: number) => {
    const employmentRecord = form.watch(`employment.${index}`);
    const hasErrors = hasEmploymentErrors(index);

    return (
      <Collapsible
        key={index}
        open={openEmployment === index}
        onOpenChange={() => handleEmploymentToggle(index)}
        className="mb-4"
      >
        <Card className={cn({
          "border-destructive": hasErrors && openEmployment !== index
        })}>
          <CardContent className="p-4">
            <CollapsibleTrigger className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">Employment Record {index + 1}</h3>
                    {hasErrors && openEmployment !== index && (
                      <span className="text-sm text-destructive">Contains errors</span>
                    )}
                  </div>
                  {employmentRecord && (
                    <p className="text-sm text-muted-foreground">
                      {employmentRecord.jobTitle || "No job title"} at {employmentRecord.nameOfOrganisation || "No Organisation"}
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
                        removeEmployment(index);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", {
                    "-rotate-180": openEmployment === index
                  })} />
                </div>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                {employmentFormFields.map((field) => {
                  // Check if field should be shown based on requirements
                  const watchedValue = form.watch(`employment.${index}.${field.requiredName}` as any);
                  const shouldShow = !field.requiredName || 
                    (field.requiredName && field.requiredValue && 
                     (Array.isArray(watchedValue) ? watchedValue[0] : watchedValue) === field.requiredValue);

                  if (!shouldShow) return null;

                  return (
                    <FormField
                      key={`${index}-${field.name}`}
                      control={form.control}
                      name={`employment.${index}.${field.name}` as any}
                      render={({ field: formField }) => (
                        <FormItem className={field.type === "text" && field.name === "jobDescription" ? "col-span-2" : undefined}>
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
                            ) : field.type === "date" ? (
                              <Input
                                className="bg-muted"
                                type="date"
                                {...formField}
                              />
                            ) : (
                              <Input className="bg-muted" {...formField} />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                })}
              </div>
            </CollapsibleContent>
          </CardContent>
        </Card>
      </Collapsible>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Employment History</h2>
            <Button
              type="button"
              variant="outline"
              onClick={appendNewEmployment}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Employment
            </Button>
          </div>
          {employmentFields.map((field, index) => renderEmploymentForm(index))}
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
