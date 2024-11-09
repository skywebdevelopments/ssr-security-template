'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { supabase } from '@/app/util/supabase/client'

type CompanyTickets = {
  company_name: string
  ticket_count: number
}

export function TicketsPerCompanyChart() {
  const [data, setData] = useState<CompanyTickets[]>([])

  useEffect(() => {
    async function fetchData() {
      // Fetch all tickets with their associated event IDs
      const { data: tickets, error: ticketsError } = await supabase
        .from('tickets')
        .select('event_id')

      if (ticketsError) {
        console.error('Error fetching tickets:', ticketsError)
        return
      }

      // Fetch all events with their company IDs
      const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('id, company_ids')

      if (eventsError) {
        console.error('Error fetching events:', eventsError)
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
      const eventCompanyMap = new Map(events.map(event => [event.id, event.company_ids]))

      const ticketCounts: Record<string, number> = {}

      tickets.forEach(ticket => {
        const companyIds = eventCompanyMap.get(ticket.event_id)
        if (companyIds && Array.isArray(companyIds)) {
          companyIds.forEach(companyId => {
            const companyName = companyMap.get(companyId) || 'Unknown'
            ticketCounts[companyName] = (ticketCounts[companyName] || 0) + 1
          })
        }
      })

      const formattedData = Object.entries(ticketCounts).map(([company_name, ticket_count]) => ({
        company_name,
        ticket_count
      }))

      setData(formattedData)
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets per Company</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{
          tickets: {
            label: "Tickets",
            color: "hsl(var(--chart-2))",
          },
        }} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="company_name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="ticket_count" fill="var(--color-tickets)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}