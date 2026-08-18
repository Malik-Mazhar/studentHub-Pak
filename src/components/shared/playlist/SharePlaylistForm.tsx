"use client";

import { ChevronDown, ChevronUp, Loader2, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomInput from '../CustomInput';
import CustomSelect from '../CustomSelect';
import CoustomButton  from '../CustomButton';

import { playlistSchema, PlaylistForm } from "@/src/zod-Schemas/playlistSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/src/lib/apiResponse";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SharePlaylist() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiError, setApiError] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PlaylistForm>({
    resolver: zodResolver(playlistSchema),
    defaultValues: {
      youtubePlaylistLink: "",
      categories: [],
      visibility: "Everyone",
    },
  });

  const onSubmit = async (data: PlaylistForm) => {
    try {
      const response = await axios.post("/api/user/post/createplaylist", data );

      toast("post created successfully!", {
          position: "top-right",        
          description: <span className="text-black">{ response.data?.message }</span>,
      });

      console.log(response.data);
      router.push("/courses")

    } catch (err) {
            
      const axiosError = err as AxiosError<ApiResponse>;

      toast('Share playList Url Failed', {
      position: "top-right",
      description: <span className="text-black">{axiosError.response?.data?.message}</span>,
      action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
          },
      });

      setApiError(axiosError.response?.data?.message ?? "Something went wrong")
    }
  };

  const coursesCategories = [
    {
      name: "Programming",
      slug: "programming",
    },
    {
      name: "Web Development",
      slug: "web-development",
    },
    {
      name: "Mobile App Development",
      slug: "mobile-app-development",
    },
    {
      name: "Artificial Intelligence",
      slug: "artificial-intelligence",
    },
    {
      name: "Cyber Security",
      slug: "cyber-security",
    },
    {
      name: "Data Science",
      slug: "data-science",
    },
    {
      name: "Graphic Design",
      slug: "graphic-design",
    },
    {
      name: "UI/UX Design",
      slug: "ui-ux-design",
    },
    {
      name: "Digital Marketing",
      slug: "digital-marketing",
    },
    {
      name: "Video Editing",
      slug: "video-editing",
    },
    {
      name: "Business & Entrepreneurship",
      slug: "business-and-entrepreneurship",
    },
    {
      name: "Finance & Accounting",
      slug: "finance-and-accounting",
    },
    {
      name: "English Language",
      slug: "english-language",
    },
    {
      name: "Freelancing",
      slug: "freelancing",
    },
    {
      name: "Office Productivity (MS Office)",
      slug: "office-productivity-ms-office",
    },
  ];

  return (
     <section className="pt-10 relative">

      <div className="">

        <h1 className="text-3xl font-bold">
          Share YouTube Playlist
        </h1>

        <p className="text-gray-500 mt-2">
          Share educational YouTube playlists with the community.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
        >

          <CustomInput
            label="Playlist URL"
            type="text"
            placeholder="https://www.youtube.com/playlist?list=..."
            error={errors.youtubePlaylistLink?.message || apiError}
            optional= {false}
            {...register("youtubePlaylistLink")}
          />

          <Controller
            name="categories"
            control={control}
            render={({ field }) => {
              const selectedCategories = field.value || [];

              return (
                <div className="relative w-full">

                  {/* Selected Categories + Dropdown Button */}
                  <div
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="min-h-11 w-full px-3 py-2 border border-gray-300
                              rounded-xl bg-white flex items-center gap-2
                              cursor-pointer"
                  >

                    {/* Chips */}
                    <div className="flex flex-wrap gap-2 flex-1">

                      {selectedCategories.length > 0 ? (
                        selectedCategories.map((slug) => {
                          const category = coursesCategories.find(
                            (item) => item.slug === slug
                          );

                          return (
                            <span
                              key={slug}
                              className="inline-flex items-center gap-1
                                        bg-blue-50 text-blue-600
                                        px-2.5 py-1 rounded-lg text-sm"
                            >
                              {category?.name}

                              {/* Remove */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();

                                  field.onChange(
                                    selectedCategories.filter(
                                      (item) => item !== slug
                                    )
                                  );
                                }}
                                className="text-blue-400 hover:text-blue-700 cursor-pointer"
                              >
                                <X size={16} />
                              </button>
                            </span>
                          );
                        })
                      ) : (
                        <span className="text-gray-400 text-sm py-1">
                          Select categories
                        </span>
                      )}

                    </div>

                    {/* Arrow */}
                    <span className="text-gray-400">
                      {isOpen ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </span>

                  </div>

                  {/* Dropdown */}
                  {isOpen && (
                    <div
                      className="absolute z-50 mt-2 w-full max-h-64
                                overflow-y-auto bg-white border
                                border-gray-200 rounded-xl shadow-lg p-2"
                    >

                      {coursesCategories.map((item) => {

                        const isSelected = selectedCategories.includes(
                          item.slug
                        );

                        return (
                          <div
                            key={item.slug}
                            onClick={() => {

                              if (isSelected) {

                                field.onChange(
                                  selectedCategories.filter(
                                    (slug) => slug !== item.slug
                                  )
                                );

                              } else {

                                field.onChange([
                                  ...selectedCategories,
                                  item.slug,
                                ]);

                              }

                            }}
                            className="flex items-center gap-3 px-3 py-2.5
                                      rounded-lg hover:bg-gray-50
                                      cursor-pointer"
                          >

                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}}
                              className="cursor-pointer"
                            />

                            <span className="text-sm text-gray-700">
                              {item.name}
                            </span>

                          </div>
                        );
                      })}

                    </div>
                  )}

                  {errors.categories && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.categories.message}
                    </p>
                  )}

                </div>
              );
            }}
          />



          <CustomSelect
            label="Visibility"
            options={["Everyone", "Only Me"]}
            {...register("visibility")}
          />

          <div className="flex justify-end gap-4">

            <CoustomButton
              type="button"
              className="px-8 h-11"
            >
              Cancel
            </CoustomButton>

            <CoustomButton
              type="submit"
              className="px-8 h-11"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sharing...
                </div>
              ) : (
                "Share Playlist"
              )}
            </CoustomButton>

          </div>

        </form>

      </div>

    </section>
  );
}