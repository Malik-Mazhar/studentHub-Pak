import { FaTimes } from "react-icons/fa";

interface TagInputProps {
  label?: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  max?: number;
}

export default function TagInput({
  label,
  tags,
  setTags,
  max = 5,
}: TagInputProps) {

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();

    if (e.key === " " && value !== "") {
      e.preventDefault();

      if (tags.length >= max) return;
      if (tags.includes(value)) return;

      setTags([...tags, value]);
      e.currentTarget.value = "";
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-6">

      {label && (
        <label className="block text-sm font-semibold mb-2">
          {label}{" "}
          <span className="text-gray-400">(Optional)</span>
        </label>
      )}

      <div className="flex flex-wrap gap-2 p-2 border rounded-xl min-h-12">

        {tags.map((tag, index) => (
          <span
            key={index}
            className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
          >
            {tag}
            <FaTimes
              size={10}
              className="cursor-pointer"
              onClick={() => removeTag(index)}
            />
          </span>
        ))}

        <input
          onKeyDown={addTag}
          className="flex-1 outline-none min-w-30"
          placeholder="Type and press Enter..."
        />
      </div>
    </div>
  );
}