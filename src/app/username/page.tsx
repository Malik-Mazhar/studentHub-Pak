// "use client"

// import Sidebar from "@/src/components/shared/app-sidebar"
// import CustomButton from "@/src/components/shared/CustomButton"
// import { FiEdit3 } from "react-icons/fi";
// import { HiDotsHorizontal } from "react-icons/hi";
// import { IoLocationOutline } from "react-icons/io5";
// import { CgCalendarDates } from "react-icons/cg";
// import { useState } from "react";
// import Image from "next/image";
// import { FaHeart, FaRegBookmark, FaRegComment, FaShare } from "react-icons/fa6";
// import { FaCheckCircle } from "react-icons/fa";


// function page() {
//   const [activeTab, setActiveTab] = useState("Overview");
//   const profileTabs = ["OverView", "Posts", "Notes", "Groups", "Activity", "Bookmarks"];
//   const allTabs = [
//     {
//       key: "OverView",
//       title: "About Me",
//       content: "This is overview page content"
//     },
//     {
//       key: "Posts",
//       title: "My Posts",
//       content: "This is post page content"
//     },
//     {
//       key: "Notes",
//       title: "Study Notes",
//       content: "This is notes page containyt"
//     },
//     {
//       key: "Groups",
//       title: "My Groups",
//       content: "This is notes page containyt"
//     },
//     {
//       key: "Activity",
//       title: "Recent Activity",
//       content: "This is notes page containyt"
//     },
//         {
//       key: "Bookmarks",
//       title: "Saved Items",
//       content: "This is notes page containyt"
//     }
//   ];

//   const selectTabs = allTabs.find((x) => x.key == activeTab);

//   const posts = [
//     {
//       key: 1,
//       profileImg: "/img/defaultProfile.JFIF",
//       userName: "Ahmad Raza",
//       content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit autem voluptate atque consectetur error ipsum?"
//     },
//     {
//       key: 2,
//       profileImg: "/img/defaultProfile.JFIF",
//       userName: "Ahmad Raza",
//       content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit autem voluptate atque consectetur error ipsum?"
//     },
//     {
//       key: 3,
//       profileImg: "/img/defaultProfile.JFIF",
//       userName: "Ahmad Raza",
//       content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit autem voluptate atque consectetur error ipsum?"
//     }
//   ];

//   const user = {
//   profilePicture: "image.jpg",
//   coverPhoto: "cover.jpg",
//   bio: "I am a developer",
//   education: "",
//   skills: ["React", "Node.js"],
//   socialLinks: ""
//   };

//   const tasks = [
//     {
//       label: "Add Profile Picture",
//       completed: !!user.profilePicture,
//     },
//     {
//       label: "Add Cover Photo",
//       completed: !!user.coverPhoto,
//     },
//     {
//       label: "Add Bio",
//       completed: !!user.bio,
//     },
//     {
//       label: "Add Education",
//       completed: !!user.education,
//     },
//     {
//       label: "Add Skills",
//       completed: user.skills?.length > 0,
//     },
//     {
//       label: "Add Social Links",
//       completed: !!user.socialLinks,
//     },
//   ];

//   const completedCount = tasks.filter(
//   task => task.completed
// ).length;

// const percentage = (completedCount / tasks.length) * 100;

//   return (
//     <div className="flex gap-6">
//        <Sidebar />
//           <div className="max-w-[60%]">
//             <div className="relative">

//               {/* Banner */}
//               <Image
//                 src="/img/profileBanner.png"
//                 alt="banner"
//                 width={1133}
//                 height={333}
//                 className="w-full rounded-t-2xl"
//               />

//               {/* Profile Image */}
//               <div className="absolute left-6 -bottom-14">
//                 <img
//                   src="/img/defaultProfile.JFIF"
//                   alt="profile"
//                   className="w-28 h-28 rounded-full border-4 border-white"
//                 />
//               </div>

//             </div>



//             <div className="bg-white rounded-2xl shadow-sm px-6 pt-3 pb-5">

//               <div className="flex items-start gap-3 pl-16 ml-15">

//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 pb-2">
//                     <h1 className="text-xl font-bold">
//                       Ahmad Raza
//                     </h1>
//                       <span className="rounded-lg text-blue-800 text-xs bg-green-100 px-2 font-semibold">Student</span>
//                   </div>

//                   <p className="text-gray-500 text-[14px]">
//                     BS Computer Science • FAST NUCES
//                   </p>

//                   <p className="mt-1 mb-2 text-sm text-gray-600">
//                     Passionate about programming,
//                     teaching and helping peers.
//                   </p>
//                 </div>

//                 <CustomButton className="flex items-center gap-x-3 text-xs rounded border border-gray-300 bg-gray-100 bg-none text-black shadow-sm">
//                   <FiEdit3 size={10} /> Edit Profile
//                 </CustomButton>
//                 <CustomButton className="rounded border border-gray-300 bg-gray-100 bg-none text-black py-2">
//                   <HiDotsHorizontal size={10}/>
//                 </CustomButton>
                

//               </div>

//               <div className="flex justify-between max-w-80 text-sm text-gray-600 pl-20 ml-15">
//                 <span className="flex items-center gap-3"><IoLocationOutline /> Location</span>
//                 <span className="flex items-center gap-3"><CgCalendarDates /> created date</span>
//               </div>

//               <div className="flex flex-wrap justify-between mt-8 border-t pt-4 gap-4">

//                 <div className="text-center flex-1">
//                   <h3 className="font-bold text-md">125</h3>
//                   <p className="text-gray-500 text-sm">Posts</p>
//                 </div>

//                 <div className="w-px h-10 bg-gray-200" />

//                 <div className="text-center flex-1">
//                   <h3 className="font-bold text-md">2.4K</h3>
//                   <p className="text-gray-500 text-sm">Followers</p>
//                 </div>
                
//                 <div className="w-px h-10 bg-gray-200" />

//                 <div className="text-center flex-1">
//                   <h3 className="font-bold text-md">320</h3>
//                   <p className="text-gray-500 text-sm">Following</p>
//                 </div>
                
//                 <div className="w-px h-10 bg-gray-200" />

//                 <div className="text-center flex-1">
//                   <h3 className="font-bold text-md">45</h3>
//                   <p className="text-gray-500 text-sm">Groups</p>
//                 </div>
                
//                 <div className="w-px h-10 bg-gray-200"></div>

//                 <div className="text-center flex-1">
//                   <h3 className="font-bold text-md">12</h3>
//                   <p className="text-gray-500 text-sm">Badges</p>
//                 </div>

//               </div>

//             </div>

//               <div className="flex flex-wrap justify-between mt-8 border gap-4 rounded-lg relative">
//                 {profileTabs.map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`cursor-pointer px-3 py-3 font-semibold border-b-2 ${
//                       activeTab === tab
//                         ? "border-blue-700 text-blue-700 font-bold"
//                         : "border-transparent"
//                     }`}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>

//               <div className="h-60 w-full p-5 overflow-scroll mt-8 border gap-4 rounded-lg relative">
//                 <h2 className="text-xl font-bold">{selectTabs?.title}</h2>
//                 <p className="pt-4 leading-relaxed font-semibold text-gray-700">{selectTabs?.content}</p>
//               </div>

//               <div className="p-5 mt-8 border gap-4 rounded-lg relative">
//                 <div className="flex justify-between items-center mb-5">
//                   <h2 className="text-xl font-bold">Recent Posts</h2>
//                   <span className="text-blue-500">View All</span>
//                 </div>

//                 {posts.map((post) => (
//                   <div key={post.key} className="border p-5 rounded-lg gap-4 mt-5">
                
                
//                       <div className="flex items-center gap-3">
//                         <div className="w-14 h-14 relative pt-5">
//                           <Image
//                             src={"/img/defaultProfile.JFIF"}
//                             alt="Logo"
//                             fill
//                             className='object-contain rounded-full'
//                           />
//                         </div>
//                         <div className='text-[12px] leading-4'>
//                             <h2 className='text-gray-800 font-bold text-[14px]'>Ahmad Raza</h2>
//                             <p className='text-gray-600'>3 houver ago</p>
//                         </div>
//                       </div>

//                       <div>
//                         <p className="">{post.content}</p>
//                       </div>

//                       <div className="flex items-center gap-8 pt-13">

//                       <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
//                         <FaHeart />
//                         <span>124</span>
//                       </button>

//                       <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
//                         <FaRegComment />
//                         <span>23</span>
//                       </button>

//                       <button className="flex items-center gap-2 text-gray-600 hover:text-green-500">
//                         <FaShare />
//                         <span>12</span>
//                       </button>

//                       <button className="ml-auto text-gray-600 hover:text-yellow-500">
//                         <FaRegBookmark />
//                       </button>

//                     </div>
//                   </div>
//                 ))}

                
//               </div>


//           </div>

//           <div>
//             <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm w-60">
  
//                   {/* Heading */}
//                   <h3 className="font-semibold text-gray-800">
//                     Profile Completeness
//                   </h3>

//                   {/* Percentage */}
//                   <p className="text-green-600 text-sm font-medium mt-4">
//                     85% Complete
//                   </p>

//                   {/* Progress Bar */}
//                   <div className="w-full bg-gray-200 rounded-full h-2 mt-2 mb-4">
//                     <div className="bg-green-500 h-2 rounded-full w-[85%]"></div>
//                   </div>

//                   {/* Checklist */}
//                 {tasks.map((task) => (
//                   <div
//                     key={task.label}
//                     className="flex items-center gap-3 py-1"
//                   >
//                     {task.completed ? (
//                       <FaCheckCircle className="text-green-500" />
//                     ) : (
//                       <div className="w-4 h-4 rounded-full border" />
//                     )}

//                     <span>{task.label}</span>
//                   </div>
//                 ))}
//           </div>
//           </div>

//       </div>
//   )
// }

// export default page;






"use client"
import { useState } from "react";

interface BaseField {
  name: string;
  label: string;
}

interface TextField extends BaseField {
  type: "text" | "email" | "date" | "textarea";
  placeholder?: string;
}

interface SelectField extends BaseField {
  type: "select";
  options: string[];
}

type Field = TextField | SelectField;

const profileSections = {
  Intro: [
    {
      name: "bio",
      label: "Bio",
      type: "textarea",
      placeholder: "Introduce yourself",
    },
  ],

  "Personal Details": [
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: ["Male", "Female", "Other"],
    },
    {
      name: "birthday",
      label: "Birthday",
      type: "date",
    },
    {
      name: "relationship",
      label: "Relationship Status",
      type: "text",
    },
  ],

  Work: [
    {
      name: "company",
      label: "Company",
      type: "text",
    },
    {
      name: "position",
      label: "Position",
      type: "text",
    },
  ],

  Education: [
    {
      name: "school",
      label: "School",
      type: "text",
    },
    {
      name: "degree",
      label: "Degree",
      type: "text",
    },
  ],

  Hobbies: [
    {
      name: "hobby",
      label: "Hobby",
      type: "text",
    },
  ],

  Interests: [
    {
      name: "interest",
      label: "Interest",
      type: "text",
    },
  ],

  Travel: [
    {
      name: "country",
      label: "Favourite Destination",
      type: "text",
    },
  ],

  Links: [
    {
      name: "website",
      label: "Website",
      type: "text",
    },
    {
      name: "github",
      label: "GitHub",
      type: "text",
    },
    {
      name: "linkedin",
      label: "LinkedIn",
      type: "text",
    },
  ],

  "Contact Info": [
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "phone",
      label: "Phone",
      type: "text",
    },
  ],
} satisfies Record<string, Field[]>;

type Section = keyof typeof profileSections;

export default function ProfilePage() {
  const [activeSection, setActiveSection] =
    useState<Section>("Intro");

  const fields = profileSections[activeSection];

  const sections = Object.keys(
    profileSections
  ) as Section[];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-72 border-r p-5">
            <h2 className="text-2xl font-bold mb-5">
              About
            </h2>

            <div className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() =>
                    setActiveSection(section)
                  }
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    activeSection === section
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-8">
            <h2 className="text-2xl font-semibold mb-6">
              {activeSection}
            </h2>

            <form className="space-y-5">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block mb-2 font-medium">
                    {field.label}
                  </label>

                  {field.type === "textarea" && (
                    <textarea
                      rows={4}
                      placeholder={field.placeholder}
                      className="w-full border rounded-lg p-3"
                    />
                  )}

                  {field.type === "select" && (
                    <select className="w-full border rounded-lg p-3">
                      {field.options.map((option) => (
                        <option key={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}

                  {field.type !== "textarea" &&
                    field.type !== "select" && (
                      <input
                        type={field.type}
                        placeholder={field.label}
                        className="w-full border rounded-lg p-3"
                      />
                    )}
                </div>
              ))}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  className="px-5 py-2 bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}