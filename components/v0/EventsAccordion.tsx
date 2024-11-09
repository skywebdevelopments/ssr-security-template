'use client'

import { useState, useEffect } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from '@/app/util/supabase/client'
import { Loader2 } from 'lucide-react'

type Event = {
  id: string
  title: string
  start_at: string
  end_at: string
  invited_members: { id: string; name: string }[]
}

export function EventsAccordion() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select(`
          id,
          title,
          start_at,
          end_at,
          company_ids,
          member_ids
        `)
        .order('start_at', { ascending: false })

      if (error) {
        console.error('Error fetching events:', error)
        setLoading(false)
        return
      }

      const eventsWithMembers = await Promise.all(data.map(async (event) => {
        let members: { id: string; name: string }[] = []

        if (event.company_ids && event.company_ids.length > 0) {
          const { data: companyMembers, error: membersError } = await supabase
            .from('members')
            .select('id, name')
            .in('company_id', event.company_ids)

          if (membersError) {
            console.error('Error fetching company members:', membersError)
          } else {
            members = companyMembers
          }
        }

        if (event.member_ids && event.member_ids.length > 0) {
          const { data: individualMembers, error: membersError } = await supabase
            .from('members')
            .select('id, name')
            .in('id', event.member_ids)

          if (membersError) {
            console.error('Error fetching individual members:', membersError)
          } else {
            members = [...members, ...individualMembers]
          }
        }

        return {
          ...event,
          invited_members: members
        }
      }))

      setEvents(eventsWithMembers)
      setLoading(false)
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Events and Invited Members</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (events.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Events and Invited Members</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">No events found.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Events and Invited Members</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full pr-4">
          <Accordion type="single" collapsible className="w-full">
            {events.map((event) => (
              <AccordionItem key={event.id} value={event.id}>
                <AccordionTrigger>{event.title}</AccordionTrigger>
                <AccordionContent>
                  <p>Start: {new Date(event.start_at).toLocaleString()}</p>
                  <p>End: {new Date(event.end_at).toLocaleString()}</p>
                  <h4 className="font-semibold mt-2">Invited Members:</h4>
                  {event.invited_members.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {event.invited_members.map((member) => (
                        <li key={member.id}>{member.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No members invited.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}