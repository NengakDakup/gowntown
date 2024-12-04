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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const employmentFormSchema = z.object({
  experience: z.array(z.object({
    company: z.string().min(2, "Company name is required"),
    position: z.string().min(2, "Position is required"),
    startDate: z.string().min(2, "Start date is required"),
    endDate: z.string().optional(),
    currentlyWorking: z.boolean().default(false),
    description: z.string().min(10, "Description must be at least 10 characters"),
  })),
});

type EmploymentFormValues = z.infer<typeof employmentFormSchema>;

interface EmploymentFormProps {
  onPrevious: () => void;
}

export default function EmploymentForm({ onPrevious }: EmploymentFormProps) {
  const form = useForm<EmploymentFormValues>({
    resolver: zodResolver(employmentFormSchema),
    defaultValues: {
      experience: [
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "experience",
    control: form.control,
  });

  function onSubmit(data: EmploymentFormValues) {
    console.log(data);
    // Handle form submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Employment History</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 p-4 border rounded-lg">
              <FormField
                control={form.control}
                name={`experience.${index}.company`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`experience.${index}.position`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`experience.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`experience.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                          disabled={form.watch(`experience.${index}.currentlyWorking`)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`experience.${index}.currentlyWorking`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I currently work here
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`experience.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your responsibilities and achievements"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  Remove Experience
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              append({
                company: "",
                position: "",
                startDate: "",
                endDate: "",
                currentlyWorking: false,
                description: "",
              })
            }
          >
            Add Experience
          </Button>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onPrevious}>
            Previous Step
          </Button>
          <Button type="submit">Save Profile</Button>
        </div>
      </form>
    </Form>
  );
}
