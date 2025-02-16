'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type DropdownMenuWithCheckboxProps = {
  label: string;
  items: string[];
  selectedItems: string[];
  onChange: (selected: string[]) => void;
  triggerLabel?: string;
  contentClassName?: string;
};

export function DropdownMenuWithCheckbox({
  label,
  items,
  selectedItems,
  onChange,
  triggerLabel = 'Filter',
  contentClassName = 'w-56 bg-white text-black',
}: DropdownMenuWithCheckboxProps) {
  const handleToggle = (item: string, checked: boolean) => {
    let newSelection: string[];
    if (checked) {
      newSelection = [...selectedItems, item];
    } else {
      newSelection = selectedItems.filter((i) => i !== item);
    }
    onChange(newSelection);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-white text-black">
          {triggerLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={contentClassName}>
        <DropdownMenuLabel className="text-black">{label}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-200" />
        {items.map((item) => (
          <DropdownMenuCheckboxItem
            key={item}
            checked={selectedItems.includes(item)}
            onCheckedChange={(checked) => handleToggle(item, checked)}
            className="text-black bg-white"
          >
            {item}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
