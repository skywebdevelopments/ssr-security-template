
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight, ChevronDown, User, Briefcase, Loader2, Search } from 'lucide-react'
import { supabase } from '@/app/util/supabase/client'

type Company = {
  id: string
  name: string
  members: { id: string; name: string }[]
}

export function CompanyMemberTreeView() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [expandedCompanies, setExpandedCompanies] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

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

      const companiesWithMembers = await Promise.all(companiesData.map(async (company) => {
        const { data: members, error: membersError } = await supabase
          .from('members')
          .select('id, name')
          .eq('company_id', company.id)

        if (membersError) {
          console.error(`Error fetching members for company ${company.id}:`, membersError)
          return { ...company, members: [] }
        }

        return { ...company, members }
      }))

      setCompanies(companiesWithMembers)
      setLoading(false)
    }

    fetchCompaniesAndMembers()
  }, [])

  const toggleCompany = (companyId: string) => {
    setExpandedCompanies(prev => {
      const newSet = new Set(prev)
      if (newSet.has(companyId)) {
        newSet.delete(companyId)
      } else {
        newSet.add(companyId)
      }
      return newSet
    })
  }

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.members.some(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Companies and Members</CardTitle>
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
          <Briefcase className="mr-2 h-5 w-5" />
          Companies and Members
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search companies or members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <ScrollArea className="h-[400px] w-full pr-4">
          {filteredCompanies.length === 0 ? (
            <p className="text-center text-gray-500">No companies or members found.</p>
          ) : (
            <ul className="space-y-2">
              {filteredCompanies.map((company) => (
                <li key={company.id}>
                  <div
                    className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                    onClick={() => toggleCompany(company.id)}
                  >
                    {expandedCompanies.has(company.id) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    <Briefcase className="ml-2 h-5 w-5 text-blue-500" />
                    <span className="ml-2 font-semibold">{company.name}</span>
                    <span className="ml-2 text-sm text-gray-500">({company.members.length} members)</span>
                  </div>
                  {expandedCompanies.has(company.id) && (
                    <ul className="ml-6 mt-2 space-y-1">
                      {company.members.map((member) => (
                        <li key={member.id} className="flex items-center p-1 hover:bg-gray-50 rounded">
                          <User size={16} className="mr-2 text-gray-400" />
                          <span>{member.name}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}