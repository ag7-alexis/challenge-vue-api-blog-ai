import { Category } from './category.model';
import { Model } from './model';
import { User } from './user.model';

export interface Post extends Model {
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
