'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { supabase } from '@/app/util/supabase/client'

type CompanyEvents = {
  company_name: string
  event_count: number
}

export function EventsPerCompanyChart() {
  const [data, setData] = useState<CompanyEvents[]>([])

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('events')
        .select(`
          id,
          company_ids
        `)

      if (error) {
        console.error('Error fetching events:', error)
        return
      }

      // Fetch all companies
      const { data: companies, error: companiesError } = await supabase
        .from('company')
        .select('id, name')

      if (companiesError) {
        console.error('Error fetching companies:', companiesError)
        return
      }

      const companyMap = new Map(companies.map(company => [company.id, company.name]))

      const eventCounts: Record<string, number> = {}

      data.forEach(event => {
        if (event.company_ids && Array.isArray(event.company_ids)) {
          event.company_ids.forEach(companyId => {
            const companyName = companyMap.get(companyId) || 'Unknown'
            eventCounts[companyName] = (eventCounts[companyName] || 0) + 1
          })
        }
      })

      const formattedData = Object.entries(eventCounts).map(([company_name, event_count]) => ({
        company_name,
        event_count
      }))

      setData(formattedData)
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Events per Company</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{
          events: {
            label: "Events",
            color: "hsl(var(--chart-1))",
          },
        }} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="company_name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="event_count" fill="var(--color-events)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}