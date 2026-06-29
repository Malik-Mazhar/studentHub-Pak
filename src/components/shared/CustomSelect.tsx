interface SelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function CustomSelect({
  label,
  options = [],
  value,
  onChange,
}: SelectProps) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>

      <select
        className="border rounded-xl h-12 px-4 w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}