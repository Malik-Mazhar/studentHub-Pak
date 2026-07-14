// import { User } from './../models/user';
export interface userDataType {
  profileName: string,
  Bio: string,
  class: string,
  subjects: string,
};

export type UploadType = "profile" | "cover" | "image" | "video";
export type ImageUploadProps<T extends UploadType> = {
  onFileSelect: (file: File,  type?: T) => void;
  type?: T;
  content?: React.ReactNode
};

export interface UserProfile {
  profileName: string;
  bio: string;
  pinnedDetail: string;
  location: string;
  gender: string;
  birthday: string;
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
    _id: string;
    postType: string;

    title: string;
    content?: string;

    category?: string;

    tags?: string[];

    resourceLink?: string;

    postImageUrl?: string[];
    postImgPublicId?: string;

    videoLink?: string;

    pollQuestion?: string;
    pollOptions?: string[];
    pollDuration?: number;

    visibility: string;
    postLikesCount: number

    likes: string[];
  isBookmarked: boolean;
};

export interface UserComment {
  _id: string;
  author: User;
  post: string;
  content: string;
  parentComment: string | null;
  likes: string[];
}

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