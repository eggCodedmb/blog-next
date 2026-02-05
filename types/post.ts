export interface PostItemProps {
  id: number;
  title: string;
  content: string | null;
  cover: string;
  createdAt: Date | string;
  author: {
    id: number;
    name: string | null;
    email: string;
    avatar: string | null;
  };
  _count?: {
    comments: number;
    favorites: number;
  };
  comments?: {
    id: number;
    content: string;
    createdAt: Date | string;
    author: {
      id: number;
      name: string | null;
      email: string;
      avatar: string | null;
    };
  }[];
  favorites?: {
    id: number;
  }[];
}
