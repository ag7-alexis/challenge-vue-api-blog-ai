import axios from 'axios';
import { User } from '@challenge-vue-api-blog-ai/shared';


export async function UserInfo() {

    const userInfo = await axios.get<User>("/api/auth")
    const { data, status } = userInfo // object destructuring FTW!
    if (status === 200) {
      return data;
    } else {
        return false;
    }
};

export function isAuthenticated() {

};