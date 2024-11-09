'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Search, Building2, Users, ArrowRight, CheckCircle2 } from 'lucide-react'
import { supabase } from '@/app/util/supabase/client'
import { toast } from 'sonner'

type Company = {
  id: string
  name: string
}

type Member = {
  id: string
  name: string
  email: string
  company_id: string | null
}

export function AssignMembersStepper() {
  const [step, setStep] = useState(1)
  const [companies, setCompanies] = useState<Company[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [assigning, setAssigning] = useState(false)
  const [companySearch, setCompanySearch] = useState('')
  const [memberSearch, setMemberSearch] = useState('')

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const { data: companiesData, error: companiesError } = await supabase
        .from('company')
        .select('id, name')

      if (companiesError) {
        console.error('Error fetching companies:', companiesError)
        toast.error('Failed to fetch companies')
        setLoading(false)
        return
      }

      const { data: membersData, error: membersError } = await supabase
        .from('members')
        .select('id, name, email, company_id')

      if (membersError) {
        console.error('Error fetching members:', membersError)
        toast.error('Failed to fetch members')
        setLoading(false)
        return
      }

      setCompanies(companiesData)
      setMembers(membersData)
      setLoading(false)
    }

    fetchData()
  }, [])

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(companySearch.toLowerCase())
  )

  const filteredMembers = members.filter(member =>
    (member.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
    member.email.toLowerCase().includes(memberSearch.toLowerCase())) &&
    member.company_id !== selectedCompany
  )

  const handleAssign = async () => {
    if (!selectedCompany || selectedMembers.length === 0) {
      toast.error('Please select a company and at least one member')
      return
    }

    setAssigning(true)
    const { error } = await supabase
      .from('members')
      .update({ company_id: selectedCompany })
      .in('id', selectedMembers)

    if (error) {
      console.error('Error assigning members:', error)
      toast.error('Failed to assign members. Please try again.')
    } else {
      toast.success('Members assigned successfully!')
      setMembers(prevMembers =>
        prevMembers.map(member =>
          selectedMembers.includes(member.id) ? { ...member, company_id: selectedCompany } : member
        )
      )
      setStep(3)
    }
    setAssigning(false)
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Assign Members to Company</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Assign Members to Company</CardTitle>
        <CardDescription>
          {step === 1 ? 'Select a company' : step === 2 ? 'Select members to assign' : 'Assignment complete'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                value={companySearch}
                onChange={(e) => setCompanySearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <ScrollArea className="h-[300px] w-full border rounded-md p-4">
              {filteredCompanies.map((company) => (
                <div key={company.id} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={company.id}
                    checked={selectedCompany === company.id}
                    onCheckedChange={() => setSelectedCompany(company.id)}
                  />
                  <label
                    htmlFor={company.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <div className="flex items-center">
                      <Building2 className="mr-2 h-4 w-4 text-blue-500" />
                      {company.name}
                    </div>
                  </label>
                </div>
              ))}
            </ScrollArea>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <ScrollArea className="h-[300px] w-full border rounded-md p-4">
              {filteredMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={member.id}
                    checked={selectedMembers.includes(member.id)}
                    onCheckedChange={(checked) => {
                      setSelectedMembers(prev =>
                        checked
                          ? [...prev, member.id]
                          : prev.filter(id => id !== member.id)
                      )
                    }}
                  />
                  <label
                    htmlFor={member.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-gray-400" />
                      {member.name} ({member.email})
                    </div>
                  </label>
                </div>
              ))}
            </ScrollArea>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center h-[300px]">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <p className="text-lg font-semibold">Assignment Complete!</p>
            <p className="text-sm text-gray-500">Members have been successfully assigned to the company.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && step < 3 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        {step < 2 && (
          <Button onClick={() => setStep(step + 1)} disabled={!selectedCompany}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
        {step === 2 && (
          <Button onClick={handleAssign} disabled={selectedMembers.length === 0 || assigning}>
            {assigning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Assigning...
              </>
            ) : (
              <>
                Assign Members <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        )}
        {step === 3 && (
          <Button onClick={() => {
            setStep(1)
            setSelectedCompany(null)
            setSelectedMembers([])
          }}>
            Start Over
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}