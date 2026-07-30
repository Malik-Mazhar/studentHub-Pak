"use client";

import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomInput from '../CustomInput';
import CustomSelect from '../CustomSelect';
import CoustomButton  from '../CustomButton';

import { playlistSchema, PlaylistForm } from "@/src/zod-Schemas/playlistSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/src/lib/apiResponse";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SharePlaylist() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PlaylistForm>({
    resolver: zodResolver(playlistSchema),
    defaultValues: {
      youtubePlaylistLink: "",
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
      router.push("/community")

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
    }
  };

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
            // error={errors.youtubePlaylistLink?.message}
            optional= {false}
            {...register("youtubePlaylistLink")}
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