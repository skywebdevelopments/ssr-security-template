"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  FileText,
  Building2,
  Users,
  Loader2,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { supabase } from "@/app/util/supabase/client";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  start_at: z.string(),
  end_at: z.string(),
  company_ids: z.array(z.string()).optional(),
  member_ids: z.array(z.string()).optional(),
});

type Company = {
  id: number;
  name: string;
};

type Member = {
  id: number;
  name: string;
  email: string;
};

export function EventForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [showCompanies, setShowCompanies] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [companySearchTerm, setCompanySearchTerm] = useState("");
  const [memberSearchTerm, setMemberSearchTerm] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      start_at: "",
      end_at: "",
      company_ids: [],
      member_ids: [],
    },
  });

  useEffect(() => {
    fetchCompanies();
    fetchMembers();
  }, []);

  useEffect(() => {
    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(companySearchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
  }, [companySearchTerm, companies]);

  useEffect(() => {
    const filtered = members.filter(
      (member) =>
        member.name.toLowerCase().includes(memberSearchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(memberSearchTerm.toLowerCase())
    );
    setFilteredMembers(filtered);
  }, [memberSearchTerm, members]);

  async function fetchCompanies() {
    const { data, error } = await supabase.from("company").select("id, name");
    if (error) {
      console.error("Error fetching companies:", error);
      toast.error("Failed to fetch companies");
    } else {
      setCompanies(data);
      setFilteredCompanies(data);
    }
  }

  async function fetchMembers() {
    const { data, error } = await supabase
      .from("members")
      .select("id, name, email");
    if (error) {
      console.error("Error fetching members:", error);
      toast.error("Failed to fetch members");
    } else {
      setMembers(data);
      setFilteredMembers(data);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // Create event
      const { data: eventData, error: eventError } = await supabase
        .from("events")
        .insert([
          {
            title: values.title,
            description: values.description,
            start_at: values.start_at,
            end_at: values.end_at,
          },
        ])
        .select();

      if (eventError) throw eventError;

      // Generate tickets
      if (values.company_ids && values.company_ids.length > 0) {
        const { data: companyMembers, error: companyMembersError } =
          await supabase
            .from("members")
            .select("id, name")
            .in("company_id", values.company_ids);

        if (companyMembersError) throw companyMembersError;

        for (const member of companyMembers) {
          await supabase.from("tickets").insert([
            {
              owner: member.name,
              event_id: eventData[0].uuid,
            },
          ]);
        }
      } else if (values.member_ids && values.member_ids.length > 0) {
        for (const memberId of values.member_ids) {
          const { data: memberData, error: memberError } = await supabase
            .from("members")
            .select("name")
            .eq("id", memberId)
            .single();

          if (memberError) throw memberError;

          await supabase.from("tickets").insert([
            {
              owner: memberData.name,
              event_id: eventData[0].uuid,
            },
          ]);
        }
      }

      toast.success("Event created and tickets generated");
      form.reset();
    } catch (error) {
      console.error("Error creating event or generating tickets:", error);
      toast.error("Failed to create event or generate tickets");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Event</CardTitle>
        <CardDescription>
          Set up a new event and assign attendees.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Annual Conference"
                          className="pl-8"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FileText className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Textarea
                          placeholder="Event description..."
                          className="pl-8 min-h-[100px]"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FormField
                control={form.control}
                name="start_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date and Time</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="datetime-local"
                          className="pl-8"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FormField
                control={form.control}
                name="end_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date and Time</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="datetime-local"
                          className="pl-8"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <FormField
                control={form.control}
                name="company_ids"
                render={() => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Building2 className="mr-2 h-4 w-4" />
                      Assign to Companies
                    </FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => setShowCompanies(!showCompanies)}
                    >
                      {showCompanies ? (
                        <>
                          Hide Companies List
                          <ChevronUp className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Show Companies List
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <AnimatePresence>
                      {showCompanies && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="mt-4 space-y-4">
                            <div className="relative">
                              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="text"
                                placeholder="Search companies..."
                                className="pl-8"
                                value={companySearchTerm}
                                onChange={(e) =>
                                  setCompanySearchTerm(e.target.value)
                                }
                              />
                            </div>
                            <ScrollArea className="h-[200px] rounded-md border bg-slate-50 text-black">
                              <div className="p-4 space-y-2">
                                {filteredCompanies.map((company) => (
                                  <div
                                    key={company.id}
                                    className="flex items-center space-x-2"
                                  >
                                    <Checkbox
                                      id={`company-${company.id}`}
                                      onCheckedChange={(checked) => {
                                        const currentCompanies =
                                          form.getValues("company_ids") || [];
                                        if (checked) {
                                          form.setValue("company_ids", [
                                            ...currentCompanies,
                                            company.id.toString(),
                                          ]);
                                        } else {
                                          form.setValue(
                                            "company_ids",
                                            currentCompanies.filter(
                                              (id) =>
                                                id !== company.id.toString()
                                            )
                                          );
                                        }
                                      }}
                                    />
                                    <label
                                      htmlFor={`company-${company.id}`}
                                      className="text-sm"
                                    >
                                      {company.name}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <FormField
                control={form.control}
                name="member_ids"
                render={() => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      Or Assign to Specific Members
                    </FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => setShowMembers(!showMembers)}
                    >
                      {showMembers ? (
                        <>
                          Hide Members List
                          <ChevronUp className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Show Members List
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <AnimatePresence>
                      {showMembers && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="mt-4 space-y-4">
                            <div className="relative">
                              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="text"
                                placeholder="Search members..."
                                className="pl-8"
                                value={memberSearchTerm}
                                onChange={(e) =>
                                  setMemberSearchTerm(e.target.value)
                                }
                              />
                            </div>
                            <ScrollArea className="h-[200px] rounded-md border bg-slate-50 text-black">
                              <div className="p-4 space-y-2">
                                {filteredMembers.map((member) => (
                                  <div
                                    key={member.id}
                                    className="flex items-center space-x-2"
                                  >
                                    <Checkbox
                                      id={`member-${member.id}`}
                                      onCheckedChange={(checked) => {
                                        const currentMembers =
                                          form.getValues("member_ids") || [];
                                        if (checked) {
                                          form.setValue("member_ids", [
                                            ...currentMembers,
                                            member.id.toString(),
                                          ]);
                                        } else {
                                          form.setValue(
                                            "member_ids",
                                            currentMembers.filter(
                                              (id) =>
                                                id !== member.id.toString()
                                            )
                                          );
                                        }
                                      }}
                                    />
                                    <label
                                      htmlFor={`member-${member.id}`}
                                      className="text-sm"
                                    >
                                      {member.name} ({member.email})
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Event and Generate Tickets"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
