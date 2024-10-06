import { Minus, Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StepSidebarInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const StepSidebar = ({ value, onChange }: StepSidebarInputProps) => {
  const increment = () => onChange(value + 0.25);
  const decrement = () => onChange(value - 0.25);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const parsedValue = inputValue === "" ? 0 : parseInt(inputValue, 10);

    if (!isNaN(parsedValue)) {
      onChange(parsedValue);
    }
  };

  return (
    <div className="flex items-center">
      <Button
        onClick={decrement}
        variant="outline"
        className="p-2 rounded-r-none border-r-0"
        size="icon"
      >
        <Minus className="size-4" />
      </Button>
      <Input
        onChange={handleChange}
        value={value}
        className="w-[50px] h-8 focus-visible:ring-offset-0 focus-visible:ring-0 rounded-none"
      />
      <Button
        onClick={increment}
        variant="outline"
        className="p-2 rounded-l-none border-l-0"
        size="icon"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
};
