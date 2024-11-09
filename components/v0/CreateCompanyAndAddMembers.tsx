"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Mail,
  MapPin,
  Search,
  Users,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Plus,
  X,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/app/util/supabase/client";

const companyFormSchema = z.object({
  name: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  address: z.string().optional(),
});

const searchFormSchema = z.object({
  search: z.string().min(1, {
    message: "Please enter a search term.",
  }),
});

type Member = {
  id: number;
  name: string;
  email: string;
};

export function CreateCompanyAndAddMembers() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [searchResults, setSearchResults] = useState<Member[]>([]);

  const companyForm = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
    },
  });

  const searchForm = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      search: "",
    },
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    const { data, error } = await supabase
      .from("members")
      .select("id, name, email");
    if (error) {
      console.error("Error fetching members:", error);
      toast.error("Failed to fetch members");
    } else {
      setMembers(data);
    }
  }

  async function onSearchMembers(values: z.infer<typeof searchFormSchema>) {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("members")
        .select("id, name, email")
        .or(`name.ilike.%${values.search}%,email.ilike.%${values.search}%`)
        .limit(10);

      if (error) throw error;
      setSearchResults(data);
      if (data.length === 0) {
        toast.info("No members found");
      }
    } catch (error) {
      console.error("Error searching members:", error);
      toast.error("Failed to search members");
    } finally {
      setIsLoading(false);
    }
  }

  function addMember(member: Member) {
    if (!selectedMembers.some((m) => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
      toast.success(`Added ${member.name} to selection`);
    } else {
      toast.info(`${member.name} is already selected`);
    }
  }

  function removeMember(memberId: number) {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== memberId));
    const memberName = selectedMembers.find((m) => m.id === memberId)?.name;
    toast.success(`Removed ${memberName} from selection`);
  }

  async function createCompanyAndAddMembers() {
    setIsLoading(true);
    try {
      const companyData = companyForm.getValues();
      const { data: companyResult, error: companyError } = await supabase
        .from("company")
        .insert([companyData])
        .select();

      if (companyError) throw companyError;

      const companyId = companyResult[0].id;

      for (const member of selectedMembers) {
        const { error: memberError } = await supabase
          .from("members")
          .update({ company_id: companyId })
          .eq("id", member.id);

        if (memberError) throw memberError;
      }

      toast.success("Company created and members added successfully");
      companyForm.reset();
      searchForm.reset();
      setSelectedMembers([]);
      setStep(1);
    } catch (error) {
      console.error("Error creating company and assigning members:", error);
      toast.error("Failed to create company and assign members");
    } finally {
      setIsLoading(false);
    }
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Company and Add Members</CardTitle>
        <CardDescription>Step {step} of 2</CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" {...fadeIn} transition={{ duration: 0.3 }}>
              <Form {...companyForm}>
                <form
                  onSubmit={companyForm.handleSubmit(() => setStep(2))}
                  className="space-y-8"
                >
                  <FormField
                    control={companyForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building2 className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Acme Inc."
                              className="pl-8"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={companyForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="contact@acme.com"
                              className="pl-8"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={companyForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="123 Main St, City, Country"
                              className="pl-8"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    variant="default"
                    className=" w-full"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="step2" {...fadeIn} transition={{ duration: 0.3 }}>
              <div className="space-y-8">
                <Form {...searchForm}>
                  <form
                    onSubmit={searchForm.handleSubmit(onSearchMembers)}
                    className="space-y-4"
                  >
                    <FormField
                      control={searchForm.control}
                      name="search"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Search Members</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search by name or email"
                                className="pl-8"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Search
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Search Results</h3>
                  <ScrollArea className="h-[200px] rounded-md border">
                    <div className="p-4">
                      {searchResults.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between py-2"
                        >
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {member.email}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addMember(member)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Selected Members</h3>
                  <ScrollArea className="h-[200px] rounded-md border">
                    <div className="p-4">
                      {selectedMembers.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between py-2"
                        >
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {member.email}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeMember(member.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex justify-between">
        {step === 2 && (
          <Button variant="outline" onClick={() => setStep(1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        {step === 2 && (
          <Button
            variant="default"
            onClick={createCompanyAndAddMembers}
            disabled={isLoading || selectedMembers.length === 0}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Create Company and Add Members
                <Users className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
