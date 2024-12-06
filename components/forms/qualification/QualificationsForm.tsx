'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
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
import { qualificationFormSchema, type QualificationFormValues, type InstitutionType } from "./schema";
import { defaultValues } from "./defaults";
import { createFormFields } from "./fields";
import { useForm } from "@/context/ProfileFormContext";

interface QualificationsFormProps {
  onNext: () => void;
  onPrevious?: () => void;
}

export default function QualificationsForm({ onNext, onPrevious }: QualificationsFormProps) {
  const { formData, updateFormData } = useForm();
  const qualificationData = formData.qualification as Partial<QualificationFormValues>;

  const form = useHookForm<QualificationFormValues>({
    resolver: zodResolver(qualificationFormSchema),
    defaultValues: {
      ...defaultValues,
      ...qualificationData,
    },
  });

  const watchedState = form.watch("institutionAttended").toLowerCase() as InstitutionType;
  const formFields = createFormFields(watchedState);

  function onSubmit(data: QualificationFormValues) {
    const institutionType = data.institutionAttended.toLowerCase();
    if (institutionType !== 'university' && institutionType !== 'polytechnic' && institutionType !== 'college') {
      console.error('Invalid institution type');
      return;
    }
    const formData = {
      ...data,
      institutionAttended: institutionType as InstitutionType
    };
    updateFormData('qualification', formData);
    console.log(formData);
    onNext();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-4">Education History</h2>
          </div>
          {formFields.slice(0, 11).map((field) => {
            const shouldRender = ('requiredName' in field)
              ? form.watch(field.requiredName as keyof QualificationFormValues) === field.requiredValue
              : true;

            if (!shouldRender) return null;

            return (
              <FormField
                key={field.title}
                control={form.control}
                name={field.name as keyof QualificationFormValues}
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
                        <Input 
                          type="number" 
                          {...formField} 
                          onChange={(e) => formField.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                        />
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

          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-4 mt-6">Skills</h2>
          </div>
          {formFields.slice(11).map((field) => (
            <FormField
              key={field.title}
              control={form.control}
              name={field.name as keyof QualificationFormValues}
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
                      <Input 
                        type="number" 
                        {...formField} 
                        onChange={(e) => formField.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
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
          ))}
        </div>
        <div className="flex justify-between">
          {onPrevious && (
            <Button type="button" variant="outline" onClick={onPrevious}>
              Previous
            </Button>
          )}
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
}