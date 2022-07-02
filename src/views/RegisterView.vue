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
            Register
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
                placeholder="Mukhammed"
                required
              />
            </div>
            <div class="my-4">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Email</label
              >
              <input
                v-model="email"
                type="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="example@gmail.com"
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
                placeholder="********"
                required
              />
            </div>
            <div class="my-4">
              <label
                for="confirm_password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Confirm Password</label
              >
              <input
                v-model="confirmPassword"
                type="password"
                id="confirm_password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="********"
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
              @click="register"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#FFF"
                  d="M15.812 4.819c-.33-.341-.312-.877.028-1.207l3.469-3.365c.17-.164.387-.247.603-.247.219 0 .438.085.604.257l-4.704 4.562zm-5.705 8.572c-.07.069-.107.162-.107.255 0 .194.158.354.354.354.089 0 .178-.033.247-.1l.583-.567-.493-.509-.584.567zm4.924-6.552l-1.994 1.933c-1.072 1.039-1.619 2.046-2.124 3.451l.881.909c1.419-.461 2.442-.976 3.514-2.016l1.994-1.934-2.271-2.343zm5.816-5.958l-5.137 4.982 2.586 2.671 5.138-4.98c.377-.366.566-.851.566-1.337 0-1.624-1.968-2.486-3.153-1.336zm-11.847 12.119h-4v1h4v-1zm9-1.35v1.893c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362v-20h12.629l2.062-2h-16.691v24h10.189c3.163 0 9.811-7.223 9.811-9.614v-4.687l-2 1.951z"
                />
              </svg>
              <span
                style="margin-left: 5px; font-weight: bold; font-size: large"
                >Register</span
              >
            </button>
          </div>
          <div style="display: flex; justify-content: center">
            <router-link to="/login"
              ><span style="color: blue; cursor: pointer"
                >Already have an account? Login</span
              ></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { registerPath, todoPath } from "@/services/apiPaths";
import axios from "axios";

export default {
  name: "RegisterView",
  setup() {
    const username = ref("");
    const password = ref("");
    const email = ref("");
    const confirmPassword = ref("");
    const router = useRouter();

    const register = async () => {
      if (username.value.length > 0 && password.value.length > 0) {
        const data = {
          username: username.value,
          email: email.value,
          password: password.value,
          confirm_password: confirmPassword.value,
        };
        const loginResponse = await axios.post(registerPath, data, {
          headers: {
            "Content-Type": "Application/json",
          },
        });
        if (loginResponse.status === 201) {
          router.push("/");
        }
      }
    };

    return {
      email,
      confirmPassword,
      username,
      password,
      register,
    };
  },
};
</script>
