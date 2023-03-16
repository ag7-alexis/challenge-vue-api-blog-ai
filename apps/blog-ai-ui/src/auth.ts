import axios from 'axios';
import { User } from '@challenge-vue-api-blog-ai/shared';
import { userInfo } from 'os';


export async function UserInfo() {

    try {
      const userInfo = await axios.get("/api/auth");
      const { data, status } = userInfo // object destructuring FTW!
      console.log(data);
      return data;
    } catch (error) {
      return false;
    }

};