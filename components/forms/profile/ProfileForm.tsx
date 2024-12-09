'use client';

import { useEffect, useState } from "react";
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
import { profileFormSchema, type ProfileFormValues } from "./schema";
import { defaultValues } from "./defaults";
import { createFormFields } from "./fields";
import { useForm } from "@/context/ProfileFormContext";
import { syncToFirebase } from "@/lib/firebase-utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SpinningIcon } from "@/components/custom-icons";

interface ProfileFormProps {
  onNext: () => void;
  onPrevious?: () => void;
}

export default function ProfileForm({ onNext, onPrevious }: ProfileFormProps) {
  const { formData, updateFormData, isLoading } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const profileData = formData.profile;

  const form = useHookForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      ...defaultValues,
      ...profileData,
    },
  });

  useEffect(() => {
    if (profileData) {
      form.reset(profileData as ProfileFormValues);
    }
  }, [profileData, form]);

  const watchedState = form.watch("stateOfOrigin");
  const formFields = createFormFields(watchedState);

  async function onSubmit(data: ProfileFormValues) {
    try {
      setIsSubmitting(true);
      await syncToFirebase('profile', data);
      updateFormData('profile', data);
      onNext();
    } catch (error) {
      console.error(error);
      toast({
        description: "Failed to update profile, please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

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
        <div className="grid grid-cols-2 gap-4">
          {formFields.map((field) => {
            const shouldRender = ('requiredName' in field)
              ? form.watch(field.requiredName as keyof ProfileFormValues) === field.requiredValue
              : true;

            if (!shouldRender) return null;

            return (
              <FormField
                key={field.title}
                control={form.control}
                name={field.name as keyof ProfileFormValues}
                render={({ field: formField }) => (
                  <FormItem className={field.type === "textarea" ? "col-span-2" : ""}>
                    <FormLabel>{field.title}</FormLabel>
                    <FormControl>
                      {field.type === "select" ? (
                        <Select
                          onValueChange={formField.onChange}
                          defaultValue={formField.value !== undefined ? String(formField.value) : ""}
                        >
                          <SelectTrigger className="bg-muted">
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
                        <Input type="date" className="bg-muted" {...formField} />
                      ) : field.type === "number" ? (
                        <Input 
                          type="number" 
                          {...formField}
                          className="bg-muted" 
                          onChange={(e) => formField.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        />
                      ) : field.type === "textarea" ? (
                        <Textarea className="bg-muted" {...formField} />
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
        <div className="flex justify-between">
          {onPrevious && (
            <Button type="button" variant="outline" onClick={onPrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <SpinningIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="mr-2 h-4 w-4" />
            )}
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
