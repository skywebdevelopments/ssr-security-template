'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import { Command as CommandPrimitive } from 'cmdk'

type Option = {
  value: string
  label: string
}

type MultiSelectProps = {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
  listClassName?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Select items...',
  className = '',
  listClassName = '',
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = e.target as HTMLInputElement
    if (input.value !== '') return

    if (e.key === 'Backspace' || e.key === 'Delete') {
      onChange(selected.slice(0, -1))
    }
  }

  return (
    <Command className={`overflow-visible bg-background ${className}`}>
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected.map((item) => (
            <Badge key={item} variant="secondary" className="hover:bg-secondary">
              {options.find((option) => option.value === item)?.label}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUnselect(item)
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onClick={() => handleUnselect(item)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            placeholder={placeholder}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && (
          <CommandGroup className={`absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in ${listClassName}`}>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  onChange(
                    selected.includes(option.value)
                      ? selected.filter((item) => item !== option.value)
                      : [...selected, option.value]
                  )
                  setOpen(true)
                }}
                className={"cursor-pointer"}
              >
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </div>
    </Command>
  )
}