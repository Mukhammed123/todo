import { useTodoStore } from "@/stores/todo";
import axios from "axios";
import { userPath } from "@/services/apiPaths";

export const getUserData = async (id, access) => {
  const todoStore = useTodoStore();
  try {
    const response = await axios.get(`${userPath}${id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    if (response.status === 200) {
      todoStore.setUsername(response.data.username);
    }
    return true;
  } catch {
    return false;
  }
};
