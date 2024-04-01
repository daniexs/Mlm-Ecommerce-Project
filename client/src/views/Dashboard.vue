<template>
  <div class="dashboard p-4">
    <!-- end nav -->
    <div class="mt-2 w-full">
      <div
        class="lg:flex grid-cols-1 lg:space-y-0 space-y-3 gap-5 justify-between"
      >
        <div>
          <p class="uppercase text-xs text-gray-700 font-semibold">overview</p>
          <h1 class="text-2xl text-gray-900 dark:text-gray-200 font-medium">
            Dashboard
          </h1>
        </div>
      </div>
    </div>

    <!-- grid wrapper card -->
    <div
      class="wrapper-card grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-2 mt-5"
      style="width: 200.5%;"
    >
      <!-- card  -->
      <div
        class="card bg-white dark:bg-gray-800 w-full rounded-md p-5 border dark:border-gray-700 flex"
      >
        <div class="p-2 max-w-sm">
          <div
            class="bg-orange-200 rounded-full w-14 h-14 text-lg p-3 text-orange-600 mx-auto"
          >
            <span class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="30px"
                height="30px"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M10 16V8a2 2 0 0 1 2-2h9V5c0-1.1-.9-2-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-1h-9a2 2 0 0 1-2-2zm3-8c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h9V8h-9zm3 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div class="block p-2 w-full">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
            Rp. {{ dataUser.balance }}
          </p>
          <h2 class="font-normal text-gray-400 text-md mt-1">Credit Wallet</h2>
        </div>
      </div>
      <div
        class="card bg-white dark:bg-gray-800 w-full rounded-md p-5 border dark:border-gray-700 flex"
      >
        <div class="p-2 max-w-sm">
          <div
            class="bg-red-200 rounded-full w-14 h-14 text-lg p-3 text-red-600 mx-auto"
          >
            <span class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="30px"
                height="30px"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 32 32"
              >
                <path
                  fill="none"
                  d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0ZM20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5Z"
                />
                <path
                  fill="currentColor"
                  d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.899 13.899 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3c.28.304.568.596.87.87c.092.084.187.162.28.242c.32.276.649.538.99.782c.044.03.084.069.128.1v-.012a13.901 13.901 0 0 0 16 0v.012c.044-.031.083-.07.128-.1c.34-.245.67-.506.99-.782c.093-.08.188-.159.28-.242c.302-.275.59-.566.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8ZM8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0Z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div class="block p-2 w-full">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
            {{ dataMember.length }}
          </p>
          <h2 class="font-normal text-gray-400 text-md mt-1">
            Total Member
          </h2>
        </div>
      </div>
      <!-- end card -->
      <!-- end card -->
    </div>


    <!-- end wrapper card -->
    <div class="mt-2 lg:flex block lg:gap-2 relative">
      <div
        class="bg-white dark:bg-gray-800 p-0 lg:w-3/4 w-full rounded-md box-border border dark:border-gray-700"
      >
        <apexchart v-if="dataChartDate.length > 0"
          height="350"
          type="area"
          :options="optionsArea"
          :series="seriesArea"
        ></apexchart>
        <br />
        <hr />
      </div>
      <div
        class="bg-white dark:bg-gray-800 p-5 lg:mt-0 lg:w-2/4 border dark:border-gray-700 rounded-md w-full"
      >
        <div class="">
          <h2 class="text-lg font-semibold dark:text-gray-200">
            5 Highest Referral
          </h2>
          <p class="text-gray-400">This is list the latest data</p>
        </div>
        <perfect-scrollbar v-if="dataHighReferral.length>0" class="divide-y h-96 mt-5 dark:divide-gray-700">
          <div v-for="(item, index) in dataHighReferral" :key="index">
            <div class="p-3 w-full">
              <div class="flex gap-5">
                <div>
                  <img
                    class="w-14 rounded-md"
                    src="../assets/img/user1.png"
                    alt=""
                  />
                </div>
                <div class="mt-1">
                  <h2 class="dark:text-gray-200">{{ item.name }}</h2>
                  <p class="text-sm dark:text-gray-500">
                    Total: {{ item.count }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </perfect-scrollbar>
        <div v-else style="text-align: center;margin-top: 40%;">
          <p>No Data</p>
        </div>
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
        // for more guide apexchart.js
        // https://apexcharts.com/docs/chart-types/line-chart/

        // chart data area
        chart: {
          fontFamily: "lexend, sans-serif",
        },
      };
      // end chart data line
    },
    components: {
      Icon,
    },
    methods: {
      ...mapActions(useCounterStore,['getDataProfile', 'getAllReferral', 'getDataMember', 'getDataChart' ]),
    },
    created(){
      this.getDataProfile()
      this.getAllReferral()
      this.getDataMember()
      this.getDataChart()
    },
    computed: {
      ...mapState(useCounterStore, ['dataUser', 'dataHighReferral', 'dataMember', 'dataChartDate' , 'seriesArea', 'optionsArea' ]),
    },
    mounted() {}
  };
</script>
