import { useRef } from "react";
import { Camera } from "lucide-react";
import { ImageUploadProps } from "../types/dataTaype";

function ImageUpload({ onFileSelect, type }: ImageUploadProps ) {
  const fileRef = useRef<HTMLInputElement | null>(null);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  onFileSelect(file, type);
};

  return (
    <div>
      {/* Hidden input */}
      <input
        type="file"
        ref={fileRef}
        className="hidden"
        onChange={handleChange}
      />

      {/* Custom button */}
      <button
        onClick={() => fileRef.current?.click()}
        type="button" 
        className="absolute bottom-1 right-1 p-2 rounded-full cursor-pointer bg-white border shadow-md hover:bg-gray-100"
      >
        <Camera  size={20}/>
      </button>
    </div>
  )
}

export default ImageUpload

// "use client";
// import { useState } from "react";
// import { ApiResponse } from "../types/dataTaype";

// export default function ImageUpload({ onUpload }: { onUpload: (data: ApiResponse) => void }) {
//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const fileRef = useRef<HTMLInputElement | null>(null);

//   // handle file select
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (!selectedFile) return;

//     setFile(selectedFile);

//     // preview
//     const url = URL.createObjectURL(selectedFile);
//     setPreview(url);
//   };

//   // upload function
//   const handleUpload = async () => {
//     if (!file) return alert("Select file first");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);

//       const res = await fetch("/api/Image-upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       console.log("Response:", data);

//       if (data.success) {  
//         onUpload(data);
//         alert("Upload Success ✅");
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.log("Upload Error:", error);
//       alert("Upload failed ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>

//       <input 
//       type="file" 
//       ref={fileRef}
//       className="hidden"
//       accept="image/*" 
//       onChange={handleChange} />

//              {/* Custom button */}
//       <button
//         onClick={() => fileRef.current?.click()}
//         type="button" 
//         className="flex items-center gap-2 px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 transition"
//       >
//         <Camera className="w-5 h-5 text-gray-600" />
//         <span className="text-gray-700 font-medium">Upload New Photo</span>
//       </button>

//       {preview && (
//         <img
//           src={preview}
//           alt="preview"
//           className="w-32 h-32 object-cover rounded"
//         />
//       )}

//       {/* <button
//         onClick={handleUpload}
//         disabled={loading}
//         className="bg-blue-500 text-white px-3 py-1 rounded"
//       >
//         {loading ? "Uploading..." : "Upload"}
//       </button> */}
//     </div>
//   );
// }