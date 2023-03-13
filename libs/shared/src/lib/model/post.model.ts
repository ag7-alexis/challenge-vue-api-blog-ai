import { Category } from './category.model';
import { User } from './user.model';

export interface Post {
  uuid: string;
  title: string;
  content: string;

  thumbnail: string;

  status: 'published' | 'draft' | 'trash';

  categoryUuid: string;
  category: Category;

  creationDate: string;
  createdByUser: User;
  createdByUserUuid: User;
}
