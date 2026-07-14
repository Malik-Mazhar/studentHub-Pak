'use client';

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../store/useSelecterhook'
import { profileData } from "../store/userDataSlice";
import axios from "axios";

export default function AuthProvider({ children }: Readonly<{children: React.ReactNode}>){
    const dispatch = useAppDispatch();

    useEffect(() =>{ 

      const init = async () => {

        try {
            const response = await axios.get("/api/user/post/profile");
            console.log("chacking response...", response.data)

            if (response?.data) {
              dispatch(profileData(response.data));
            }

        } catch (error) {
          console.error(error);
        };

  //       try {
  //         const res = await getPosts();
  //         dispatch(profileData(res.documents))
  //       } catch (error) {
  // console.error(error);
  //       }
      };
      
      init();
    }, []);

    return children
};