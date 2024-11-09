'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, ArrowRight, User, Briefcase } from 'lucide-react'
import { supabase } from '@/app/util/supabase/client'
import { toast } from 'sonner'

type Company = {
  id: string
  name: string
  memberCount: number
}

type Member = {
  id: string
  name: string
  company_id: string
}

export function MemberTransferView() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [sourceCompany, setSourceCompany] = useState<string | null>(null)
  const [targetCompany, setTargetCompany] = useState<string | null>(null)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [transferring, setTransferring] = useState(false)

  useEffect(() => {
    async function fetchCompaniesAndMembers() {
      setLoading(true)
      const { data: companiesData, error: companiesError } = await supabase
        .from('company')
        .select('id, name')

      if (companiesError) {
        console.error('Error fetching companies:', companiesError)
        setLoading(false)
        return
      }

      const { data: membersData, error: membersError } = await supabase
        .from('members')
        .select('id, name, company_id')

      if (membersError) {
        console.error('Error fetching members:', membersError)
        setLoading(false)
        return
      }

      const companiesWithMemberCount = companiesData.map(company => ({
        ...company,
        memberCount: membersData.filter(member => member.company_id === company.id).length
      }))

      setCompanies(companiesWithMemberCount)
      setMembers(membersData)
      setLoading(false)
    }

    fetchCompaniesAndMembers()
  }, [])

  const handleTransfer = async () => {
    if (!sourceCompany || !targetCompany || selectedMembers.length === 0) {
      toast.error('Please select source company, target company, and at least one member to transfer.')
      return
    }

    setTransferring(true)
    const { error } = await supabase
      .from('members')
      .update({ company_id: targetCompany })
      .in('id', selectedMembers)

    if (error) {
      console.error('Error transferring members:', error)
      toast.error('Failed to transfer members. Please try again.')
    } else {
      toast.success('Members transferred successfully!')
      setMembers(prevMembers => 
        prevMembers.map(member => 
          selectedMembers.includes(member.id) ? { ...member, company_id: targetCompany } : member
        )
      )
      setCompanies(prevCompanies => 
        prevCompanies.map(company => {
          if (company.id === sourceCompany) {
            return { ...company, memberCount: company.memberCount - selectedMembers.length }
          }
          if (company.id === targetCompany) {
            return { ...company, memberCount: company.memberCount + selectedMembers.length }
          }
          return company
        })
      )
      setSelectedMembers([])
    }
    setTransferring(false)
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Transfer Members</CardTitle>
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
        <CardTitle className="flex items-center">
          <ArrowRight className="mr-2 h-5 w-5" />
          Transfer Members
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="sourceCompany" className="block text-sm font-medium text-gray-700 mb-1">
              Source Company
            </label>
            <Select onValueChange={setSourceCompany} value={sourceCompany || undefined}>
              <SelectTrigger id="sourceCompany">
                <SelectValue placeholder="Select source company" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    <div className="flex items-center">
                      <Briefcase className="mr-2 h-4 w-4 text-blue-500" />
                      {company.name} ({company.memberCount.toString()} members)
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="targetCompany" className="block text-sm font-medium text-gray-700 mb-1">
              Target Company
            </label>
            <Select onValueChange={setTargetCompany} value={targetCompany || undefined}>
              <SelectTrigger id="targetCompany">
                <SelectValue placeholder="Select target company" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    <div className="flex items-center">
                      <Briefcase className="mr-2 h-4 w-4 text-blue-500" />
                      {company.name} ({company.memberCount.toString()} members)
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <ScrollArea className="h-[300px] w-full border rounded-md p-4">
          {members
            .filter((member) => member.company_id === sourceCompany)
            .map((member) => (
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
                    <User className="mr-2 h-4 w-4 text-gray-400" />
                    {member.name}
                  </div>
                </label>
              </div>
            ))}
        </ScrollArea>
        <Button
          onClick={handleTransfer}
          disabled={!sourceCompany || !targetCompany || selectedMembers.length === 0 || transferring}
          className="mt-4 w-full"
        >
          {transferring ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Transferring...
            </>
          ) : (
            'Transfer Selected Members'
          )}
        </Button>
      </CardContent>
    </Card>
  )
}