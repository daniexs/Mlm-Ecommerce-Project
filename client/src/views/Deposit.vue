<template>
  <div class="dashboard p-4">
    <!-- end nav -->
    <div class="mt-2 w-full">
      <div
        class="lg:flex grid-cols-1 lg:space-y-0 space-y-3 gap-5 justify-between"
      >
        <div>
          <h1 class="text-2xl text-gray-900 dark:text-gray-200 font-medium">
            Deposit Progam
          </h1>
          <p class="text-1xl text-gray-900 dark:text-gray-200 font-medium">
            For each deposit, we will  send you a cashback 100% that you can use to 
            purchase on any product on our site.
          </p>
        </div>
      </div>
    </div>
    <div style="margin-top: 3vh;" >
      <Modal
            title="Deposit"
            btnTextSubmit="Place Order"
            btnText="Deposit"
            @submit="handlerpayment"
          >
            <template v-slot:body>
              <div>
                Fill ammount of money
              </div>
              <input
                  type="number"
                  name="floating_password"
                  id="floating_password"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 border-1 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                  placeholder="fill.."
                  required
                  v-model="ammount"
                />
            </template>
      </Modal>
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
            Total All Deposit
          </p>
        </div>

        <div class="block p-2 w-full">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
            Rp. {{ dataDeposit.allCashback }}
          </p>
        </div>
      </div>
      <!-- end card -->
      <div
        class="card bg-white dark:bg-gray-800 w-full rounded-md p-5 border dark:border-gray-700 flex"
      >
        <div class="p-2 max-w-sm">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
            Total All Cashback Bonus
          </p>
        </div>

        <div class="block p-2 w-full">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
            Rp. {{ dataDeposit.allCashback }}
          </p>
        </div>
      </div>
      <!-- end card -->
      <div
        class="card bg-white dark:bg-gray-800 w-full rounded-md p-5 border dark:border-gray-700 flex"
      >
        <div class="p-2 max-w-sm">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
            Cashback Bonus
          </p>
        </div>

        <div class="block p-2 w-full">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
            Rp. {{ dataUser.deposit }}
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
        Track your deposit
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
                Date
              </th>
              <th
                scope="col"
                class="uppercase px-6 py-3"
              >
                Amount
              </th>
              <th
                scope="col"
                class="uppercase px-6 py-3"
              >
                Cashback
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50"
              v-for="(items, i) in dataDeposit.data"
              :key="items.id"
            >
              <td class="px-1 py-4">
                {{ i+1 }}
              </td>
              <td class="px-1 py-4">
                {{ items.createdAt }}
              </td>
              <td class="px-6 py-4">
                {{ items.amount }}
              </td>
              <td class="px-6 py-4">
                {{ items.cashback }}
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
        ammount: 0,
      };
    },
    components: {
      Icon,Modal
    },
    methods: {
      ...mapActions(useCounterStore,['getDataProfile', 'payment', 'topUpUser','getDataDeposit','moveCashback']),
      async topUpHandler(){
        await this.topUpUser(this.ammount)
      },
      async paymentPop(key) {
        try {
          const result = await new Promise((resolve, reject) => {
            window.snap.pay(key, {
              onSuccess: resolve,
              onError: reject
            });
          });

          console.log(result);
          await this.topUpHandler();
          // You can add further handling here
          // For example, showing a success message
          // Swal.fire({
          //   title: `Succes payment`,
          //   showClass: {
          //     popup: 'animate__animated animate__fadeInDown'
          //   },
          //   hideClass: {
          //     popup: 'animate__animated animate__fadeOutUp'
          //   }
          // });
        } catch (error) {
          console.error('Payment error:', error);
          // You can handle the error here
          // For example, showing an error message
          // Swal.fire({
          //   title: 'Payment Error',
          //   text: 'There was an error processing your payment.',
          //   icon: 'error',
          //   showConfirmButton: true
          // });
        }
      },
      async handlerpayment(){
          const data = await this.payment(this.ammount)
          console.log(data)
          this.paymentPop(data)
          // if(this.chooseId !== 0){
          //   this.buyProducts(this.chooseId, this.phoneNumber)
          // }
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
            } else if(value > this.dataUser.deposit){
              return "Your cashback is not enought"
            }
          }
        });
        await this.moveCashback(email)
        if (email) {
          Swal.fire("Success!", "", "success")

        }
      }
    },
    created(){
      this.getDataProfile()
      this.getDataDeposit()
    },
    computed: {
      ...mapState(useCounterStore, ['dataUser', 'dataDeposit'])
    },
    mounted() {}
  };
</script>
