interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

export default function CustomSelect({
  label,
  options,
  ...props
}: SelectProps) {
  return (
    <div>
      <label  className="block mb-1 text-sm font-medium text-gray-700">{label}</label>

      <select 
        className="border rounded-xl h-12 px-4 w-full"
        {...props}
      
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