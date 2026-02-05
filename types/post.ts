export interface PostItemProps {
  id: number;
  title: string;
  content: string | null;
  cover: string;
  createdAt: Date;
  author: {
    id: number;
    name: string | null;
    email: string;
    avatar: string | null;
  };
}