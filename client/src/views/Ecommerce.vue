<script>
import {useCounterStore} from "../store/counter"
import { mapState, mapActions } from "pinia"
export default {
  data(){
    return {
      phoneNumber: '',
      chooseCredit: 0,
      chooseId:0,
      choosePayment: ''
    }
  },
  methods: {
    ...mapActions(useCounterStore,['fetchProducts', 'payment', 'buyProducts', 'buyBalance', 'getDataProfile']),
    submitHandler(){
      console.log(this.phoneNumber)
    },
    async paymentPop(key) {
      try {
        const result = await new Promise((resolve, reject) => {
          window.snap.pay(key, {
            onSuccess: resolve,
            onError: reject
          });
        });
        
        this.buyProducts(this.chooseId, this.phoneNumber)
        // You can add further handling here
        // For example, showing a success message
        Swal.fire({
          title: "Success buy it!",
          text: `Transaction Rp ${this.chooseCredit} success`,
         icon: "success"
        });
      } catch (error) {
        Swal.fire({
          title: 'Payment Error',
          text: 'There was an error processing your payment.',
          icon: 'error',
          showConfirmButton: true
        });
      }
    },
    async handlerpayment(){
      if(this.phoneNumber === ''){
        Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please input your phone number",
        });
      }else if(this.chooseId === 0){
        Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please choose your product",
        });
      }else if (this.choosePayment === 2) {
        const data = await this.payment(this.chooseCredit)
        await this.paymentPop(data)
      }else if(this.choosePayment === 1){
        Swal.fire({
          title: `Product - Pulsa Rp ${this.chooseCredit}`,
          text: `Your balance Rp. ${this.dataUser.balance}`,
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#1aa33f",
          cancelButtonColor: "#a1a6a2",
          confirmButtonText: "Yes, buy it!"
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const aa = await this.buyBalance(this.chooseCredit)
              if(aa === "bosok"){
                throw {message: "Your balance is not enough"}
              }
              this.buyProducts(this.chooseId, this.phoneNumber)
              Swal.fire({
                title: "Success buy it!",
                text: "Transaction order success",
                icon: "success"
              });
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
              });
            }
          }
        });
      } else {
        Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please choose your payment",
        });
      }
    },
    chooseHandler(total, id){
      this.chooseCredit = total
      this.chooseId = id
    },
    chooseHandler1(total){
      this.choosePayment = total
    }
  },
  computed: {
    ...mapState(useCounterStore,['dataProducts', 'dataUser' ])
  },
  created() {
    this.fetchProducts()
    this.getDataProfile()
  }
}
</script>

<template>
  <div class="drawer-offset">
    <div>
        <div id="ajaxArea">
            <main role="main">
                <div class="product-banner-offset empty">
                    <img class="img-fluid product-game-banner" src="../../public/images/game-banner.jpg" alt="cover image">
                </div>
                <div class="product-outter-container">
                    <div class="container-1440 product-shift-top">
                        <div class="px-lg-3">
                            <div class="row" style="display: flex;justify-content: center;">
                                <div class="col-lg-7 px-0 px-sm-3">
                                    <div class="payment-step-container step-input-email mt-lg-0">
                                        <div class="step-title text-primary">
                                            <div class="step-circle">1</div>
                                            Phone Number (Required)
                                        </div>
                                        <div 
                                            accept-charset="UTF-8" id="form-games"
                                            class="form-inline input-group-multiple mt-4">
                                            <div class="input-group input-email-id">
                                                <div class="input-group-prepend">
                                                    <div class="icon">
                                                        <span class="icon"></span>
                                                    </div>
                                                </div>
                                                <input inputmode="numeric" class="form-control" placeholder="Phone Number" v-model="phoneNumber" type="number">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="payment-step-container step-denomination">
                                        <div class="step-title text-primary">
                                            <div class="step-circle">2</div>
                                            Choose Amount
                                        </div>
                      
                                        <div id="game-denoms" class="payment-denom-container">
                                          <div v-for="(item, index) in dataProducts" :key="index">
                                            <button :style='{backgroundColor:chooseCredit === item.price ? "#ff962d": ""}' class="payment-denom-button" v-on:click="chooseHandler(item.price, item.id)" data-id="1926">
                                                {{ item.name }} Harga Rp. {{ item.price }}                                           </button>
                                          </div>
                                        </div>
                                    </div>
                                    <div class="payment-step-container step-payment-channel step-3">
                                        <div class="step-3" style="pointer-events: none;">
                                            <div class="step-title text-primary" id="game_select_payment_title">
                                                <div class="step-circle">3</div>
                                                Choose Payment
                                            </div>
                                        </div>
                                        <div style="text-align: center;">
                                          <button
                                              type="button"
                                              class="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                                              :style='{backgroundColor:choosePayment === 1 ? "#ff962d": ""}' v-on:click="chooseHandler1(1)"
                                              style="width: 40%;"
                                            >
                                              MyWallet
                                            </button>
                                            <button
                                              type="button"
                                              class="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                                              style="width: 40%;height: 1%;"
                                              :style='{backgroundColor:choosePayment === 2 ? "#ff962d": ""}' v-on:click="chooseHandler1(2)"
                                              >
                                              Other....
                                            </button>
                                        </div>
                                        <div class="product-feedback-container text-center">
                                          <button v-on:click="handlerpayment()"
                                          style="width: 60%;"
                                          class="btn btn-primary primary-bs-1 mt-3 px-3 rounded-pill">
                                            Place Order
                                          </button>
                                        </div>
                                    </div>
                                    <div class="payment-game-description">
                                        <div class="text-center">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </main>
        </div>
    </div>
  </div>
</template>

<style>
  @import '../assets/css/app.v5.css';
</style>
