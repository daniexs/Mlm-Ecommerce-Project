<template>
  <div class="dashboard p-4">
    <!-- end nav -->
    <div class="mt-2 w-full">
      <div
        class="lg:flex grid-cols-1 lg:space-y-0 space-y-3 gap-5 justify-between"
      >
        <div>
          <!-- <p class="uppercase text-xs text-gray-700 font-semibold">overview</p> -->
          <h1 class="text-2xl text-gray-900 dark:text-gray-200 font-medium">
            History Order
          </h1>
        </div>
      </div>
    </div>
    <div
      class="mt-2 bg-white dark:bg-gray-800 p-5 w-full rounded-md box-border border dark:border-gray-700"
    >
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
                Date
              </th>
              <th
                scope="col"
                class="uppercase px-1 py-3"
              >
                Invoice
              </th>
              <th
                scope="col"
                class="uppercase px-6 py-3"
              >
                Phone Number
              </th>
              <th
                scope="col"
                class="uppercase px-6 py-3"
              >
                Product
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50"
              v-for="(items, i) in dataOrder"
              :key="items.transaction"
            >
              <td class="px-1 py-4">
                {{ i+1 }}
              </td>
              <td class="px-1 py-4">
                {{ items.createdAt }}
              </td>
              <td class="px-1 py-4">
                {{ items.invoice }}
              </td>
              <td class="px-6 py-4">
                {{ items.phoneNumber }}
              </td>
              <td class="px-6 py-4">
                {{ items.Product.name }}
              </td>
              <!-- <td class="px-6 py-4">
                <span
                  class="text-green-800 bg-green-300 px-3 py-1 rounded-md"
                  v-if="items.statusTransaction == 'completed'"
                >
                  {{ items.statusTransaction }}
                </span>
                <span
                  class="text-purple-800 bg-purple-300 px-3 py-1 rounded-md"
                  v-else-if="items.statusTransaction == 'progress'"
                >
                  {{ items.statusTransaction }}
                </span>
                <span
                  class="text-red-800 bg-red-300 px-3 py-1 rounded-md"
                  v-else
                >
                  {{ items.statusTransaction }}
                </span>
              </td> -->
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
      ...mapActions(useCounterStore,['getDataOrder'])
    },
    computed: {
      ...mapState(useCounterStore,['dataOrder'])
    },
    created(){
      this.getDataOrder()
    },
    mounted() {},
  };
</script>
