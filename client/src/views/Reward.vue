<template>
  <div class="dashboard p-4">
    <!-- end nav -->
    <div class="mt-2 w-full">
      <div
        class="lg:flex grid-cols-1 lg:space-y-0 space-y-3 gap-5 justify-between"
      >
        <div>
          <h1 class="text-2xl text-gray-900 dark:text-gray-200 font-medium">
            Reward Progam
          </h1>
          <p class="text-1xl text-gray-900 dark:text-gray-200 font-medium">For each recriut member, we will  send you a reward Rp. 10.000 that you can use to 
            purchase on any product on our site.</p>
        </div>
      </div>
    </div>
    <div
      class="wrapper-card grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-2 mt-5"
    >
      <!-- card  -->
      <div
        class="card bg-white dark:bg-gray-800 w-full rounded-md p-5 border dark:border-gray-700 flex"
      >
        <div class="p-2 max-w-sm">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
            Total Bonus Reward
          </p>
        </div>

        <div class="block p-2 w-full">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
            Rp. {{ dataUser.reward }}
          </p>
        </div>
          <button style="margin-top: 1vh;"
            type="button"
            v-on:click="modal"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Withdraw
          </button>
      </div>
      <!-- end card -->
    </div>
    <div
      class="mt-2 bg-white dark:bg-gray-800 p-5 w-full rounded-md box-border border dark:border-gray-700"
    >
      <h2 class="font-bold text-lg text-gray-800 dark:text-gray-200">
        Track your reward
      </h2>
      <p class="text-gray-400 font-lexend font-normal">
        This is a list of reward
      </p>
      <div class="wrapping-table mt-10">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400 lg:overflow-auto overflow-x-scroll"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th
                scope="col"
                class="uppercase px-1 py-3"
              >
                No
              </th>
              <th
                scope="col"
                class="uppercase px-1 py-3"
              >
                Description
              </th>
              <th
                scope="col"
                class="uppercase px-1 py-3"
              >
                Amount
              </th>
              <th
                scope="col"
                class="uppercase px-6 py-3"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50"
              v-for="(items, i) in dataReward"
              :key="items.id"
            >
              <td class="px-1 py-4">
                {{ i+1 }}
              </td>
              <td class="px-1 py-4">
                {{ items.from }}
              </td>
              <td class="px-1 py-4">
                {{ items.amount }}
              </td>
              <td class="px-6 py-4">
                {{ items.createdAt }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import { useCounterStore } from "@/store/counter";
import { Icon } from "@iconify/vue";
  import { mapActions, mapState } from "pinia";

  export default {
    name: "Dashboard",
    data() {
      return {

      };
      // end chart data line
    },
    components: {
      Icon,
    },
    methods: {
      ...mapActions(useCounterStore,['getDataProfile', 'moveReward','getDataReward']),
      async modal(){
        const { value: email } = await Swal.fire({
          title: "Withdraw To E-Wallet",
          input: "number",
          inputPlaceholder: "Enter your ammount",
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return "You need to write something!";
            } else if(value > this.dataUser.reward){
              return "Your amount is not enought"
            }
          }
        });
        await this.moveReward(email)
        if (email) {
          Swal.fire("Success!", "", "success")

        }
      }
    },
    created(){
      this.getDataProfile()
      this.getDataReward()
    },
    computed: {
      ...mapState(useCounterStore, ['dataUser', 'dataReward'])
    },
    mounted() {}
  };
</script>
