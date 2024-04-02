<template>
  <div class="dashboard p-4">
    <!-- end nav -->
    <div class="mt-2 w-full">
      <div
        class="lg:flex grid-cols-1 lg:space-y-0 space-y-3 gap-5 justify-between"
      >
        <div>
          <h1 class="text-2xl text-gray-900 dark:text-gray-200 font-medium">
            Referral Progam
          </h1>
          <p class="text-1xl text-gray-900 dark:text-gray-200 font-medium">For each friend you invite, we will  send you a cashback Rp. 20.000 that you can use to 
            purchase on any product on our site.</p>
          <p style="margin-top: 2vh;" class="text-1xl text-gray-900 dark:text-gray-200 font-medium">Your referral code :</p>
          <span style="margin-top: 3vh;max-width: 50vb;" class="bg-blue-100 flex gap-5 items-center justify-between py-3 px-5 rounded-full">
            <code class="text-blue-900 text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
                {{ dataUser.code }}
            </code>
            <button class="text-blue-900" v-on:click="copyText(dataUser.code)">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                        fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                </svg>
            </button>
          </span>
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
            Total Bonus Referral
          </p>
        </div>

        <div class="block p-2 w-full">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
            Rp. {{ dataReferral.length * 20000 }}
          </p>
        </div>
      </div>
      <!-- end card -->
      <div
        class="card bg-white dark:bg-gray-800 w-full rounded-md p-5 border dark:border-gray-700 flex"
      >
        <div class="p-2 max-w-sm">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
            Total Your Referral Used
          </p>
        </div>

        <div class="block p-2 w-full">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
            {{ dataReferral.length }}
          </p>
        </div>
      </div>
      <!-- end card -->
      <div
        class="card bg-white dark:bg-gray-800 w-full rounded-md p-5 border dark:border-gray-700 flex"
      >
        <div class="p-2 max-w-sm">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
            Referral Bonus
          </p>
        </div>

        <div class="block p-2 w-full">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
            Rp. {{ dataUser.referral }}
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
    </div>
    <div
      class="mt-2 bg-white dark:bg-gray-800 p-5 w-full rounded-md box-border border dark:border-gray-700"
    >
      <h2 class="font-bold text-lg text-gray-800 dark:text-gray-200">
        Track your invites
      </h2>
      <p class="text-gray-400 font-lexend font-normal">
        This is a list of your invites
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
                Name
              </th>
              <th
                scope="col"
                class="uppercase px-6 py-3"
              >
                Referred On
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50"
              v-for="(items, i) in dataReferral"
              :key="items.id"
            >
              <td class="px-1 py-4">
                {{ i+1 }}
              </td>
              <td class="px-1 py-4">
                {{ items.name }}
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
      ...mapActions(useCounterStore,['getDataProfile', 'getReferral', 'moveReferral']),
      async copyText(mytext) {
        try {
          await navigator.clipboard.writeText(mytext);
          alert('Copied');
        } catch($e) {
          alert('Cannot copy');
        }
      },
      async modal(){
        const { value: email } = await Swal.fire({
          title: "Withdraw To E-Wallet",
          input: "number",
          inputPlaceholder: "Enter your ammount",
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return "You need to write something!";
            } else if(value > this.dataUser.referral){
              return "Your amount is not enought"
            }
          }
        });
        await this.moveReferral(email)
        if (email) {
          Swal.fire("Success!", "", "success")

        }
      }
    },
    created(){
      this.getDataProfile()
      this.getReferral()
    },
    computed: {
      ...mapState(useCounterStore, ['dataUser', 'dataReferral'])
    },
    mounted() {}
  };
</script>
