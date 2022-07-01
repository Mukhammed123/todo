<template>
  <div
    id="defaultModal"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
  >
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
      "
    >
      <!-- Modal content -->
      <div
        class="relative bg-white rounded-lg shadow dark:bg-gray-700"
        style="width: 500px"
      >
        <!-- Modal header -->
        <div
          style="
            border: 2px solid rgb(198, 198, 198);
            border-collapse: collapse;
          "
          class="flex justify-center items-start p-4 rounded-t border-b dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Login
          </h3>
        </div>
        <!-- Modal body -->
        <div
          class="p-6 space-y-6"
          style="border: 2px solid rgb(215, 214, 214); border-top: 0"
        >
          <div>
            <div class="my-4">
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Username</label
              >
              <input
                v-model="username"
                type="text"
                id="first_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Username"
                required
              />
            </div>
            <div class="my-4">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Password"
                required
              />
            </div>
          </div>
          <div style="display: flex; justify-content: center">
            <button
              type="submit"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="login"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style="margin: 0"
              >
                <path
                  fill="#FFF"
                  d="M8 9v-4l8 7-8 7v-4h-8v-6h8zm2-7v2h12v16h-12v2h14v-20h-14z"
                />
              </svg>
              <span
                style="margin-left: 5px; font-weight: bold; font-size: large"
                >Login</span
              >
            </button>
          </div>
          You don't have an account? Create one
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useTodoStore } from "@/stores/todo";
import { useRouter } from "vue-router";
import { loginPath, todoPath } from "@/services/apiPaths";
import axios from "axios";

export default {
  name: "LoginView",
  setup() {
    const username = ref("");
    const password = ref("");
    const router = useRouter();
    const todoStore = useTodoStore();

    const login = async () => {
      if (username.value.length > 0 && password.value.length > 0) {
        const data = {
          username: username.value,
          password: password.value,
        };
        const loginResponse = await axios.post(loginPath, data, {
          headers: {
            "Content-Type": "Application/json",
          },
        });
        if (loginResponse.status === 200) {
          const accessToken = loginResponse.data.access;
          const refreshToken = loginResponse.data.refresh;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          todoStore.setAccessToken(accessToken);
          todoStore.setRefreshToken(refreshToken);
          todoStore.setIsLoggedIn(true);
          router.push("/");
        }
      }
    };

    return {
      username,
      password,
      login,
    };
  },
};
</script>
