// import { User } from './../models/user';
export interface userDataType {
  profileName: string,
  Bio: string,
  class: string,
  subjects: string,
};


export type ImageUploadProps = {
  onFileSelect: (file: File,  type?: "profile" | "cover") => void;
  type: "profile" | "cover";
};

export interface UserProfile {
  profileName: string;
  bio: string;
  pinnedDetail: string;
  location: string;
  gender: string;
  profileImgUrl: string;
  coverImageUrl: string;
  coverImgPublicId: string
  profileImgPublicId: string;
};

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;

  verifyCode?: string;
  verifyCodeExpiry?: string;

  isverifyed: boolean;
  isAcceptMessage: boolean;

  userProfile?: UserProfile;

  __v?: number;
};

export interface userPostType {
  title?: string,
  content: string,
  featuredImage?: string,
  userId: string,
};

export interface ApiResponse {
  success: boolean;
  message: string;
  statusCode?: number;
  // isAcceptingMessages?: boolean;
  isAcceptMessages?: boolean;
  // messages ?: Array<Message>
  updatedUser?: User;
  data?: User;
  secure_url?: string;
  publicId?: string;
};