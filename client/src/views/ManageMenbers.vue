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
            Manage Members
          </h1>
        </div>
        <div class="flex gap-2">
          <Modal
            title="Modal title"
            btnTextSubmit="Update"
            btnText="Crate new member"
            width="max-w-full"
            @submit="createMember(addMemberData)"
            @click="resetAddMenber"
          >
            <template v-slot:body>
              <div class="wrapping-table mt-8">
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
                      class="uppercase px-6 py-3"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="uppercase px-6 py-3"
                    >
                      Email
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50"
                    v-for="(items, i ) in dataMemberException"
                    :key="items.id"
                  >
                    <td class="px-1 py-4">
                      {{ i+1 }}
                    </td>
                    <td class="px-6 py-4">
                      {{ items.name }}
                    </td>
                    <td class="px-6 py-4">
                      {{ items.email }}
                    </td>
                    <td class="px-6 py-4">
                      {{ items.phoneNumber }}
                    </td>
                    <td class="px-6 py-4">
                      <button
                        v-on:click="addMember(items.id)"
                        type="button"
                        class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            </template>
          </Modal>
        </div>
      </div>
    </div>
    <div
      class="mt-2 bg-white dark:bg-gray-800 p-5 w-full rounded-md box-border border dark:border-gray-700"
    >
      <h2 class="font-bold text-lg text-gray-800 dark:text-gray-200">
        Member List
      </h2>
      <p class="text-gray-400 font-lexend font-normal">
        This is a list of latest members
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
                class="uppercase px-6 py-3"
              >
                Name
              </th>
              <th
                scope="col"
                class="uppercase px-6 py-3"
              >
                Email
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50"
              v-for="(items, i ) in dataMember"
              :key="items.id"
            >
              <td class="px-1 py-4">
                {{ i+1 }}
              </td>
              <td class="px-6 py-4">
                {{ items.name }}
              </td>
              <td class="px-6 py-4">
                {{ items.email }}
              </td>
              <td class="px-6 py-4">
                {{ items.phoneNumber }}
              </td>
              <td class="px-6 py-4">
                <button
                  v-on:click="delMember(items.id)"
                  type="button"
                  class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Delete
                </button>
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
  import Modal from "@/components/modal.vue";

  export default {
    name: "Dashboard",
    data() {
      return {
        addMemberData: []
      };
      // end chart data line
    },
    components: {
      Icon, Modal
    },
    methods: {
      ...mapActions(useCounterStore,['getDataMember', 'getDataMemeberException', 'createMember', 'delMember']),
      addMember(id){
        this.addMemberData.push(id)
        console.log(this.addMemberData)
      },
      resetAddMenber(){
        this.addMemberData = []
        console.log('reset bro')
      }
    },
    computed: {
      ...mapState(useCounterStore,['dataMember', 'dataMemberException'])
    },
    created(){
      this.getDataMember()
      this.getDataMemeberException()
    },
    mounted() {},
  };
</script>
