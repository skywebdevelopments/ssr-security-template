'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket } from 'lucide-react'
import { supabase } from '@/app/util/supabase/client'

export function TotalTicketsMetric() {
  const [totalTickets, setTotalTickets] = useState<number | null>(null)

  useEffect(() => {
    async function fetchTotalTickets() {
      const { count, error } = await supabase
        .from('tickets')
        .select('*', { count: 'exact', head: true })

      if (error) {
        console.error('Error fetching total tickets:', error)
        return
      }

      setTotalTickets(count)
    }

    fetchTotalTickets()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
        <Ticket className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalTickets !== null ? totalTickets : 'Loading...'}</div>
      </CardContent>
    </Card>
  )
}