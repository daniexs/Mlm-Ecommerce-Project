import { defineStore } from 'pinia'
import axios from 'axios'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    baseURL: 'http://127.0.0.1:3000',
    dataProducts: [],
    dataProductsDetail: {},
    dataOrder: [],
    dataUser: {},
    dataMember: [],
    dataMemberException: [],
    dataReferral: [],
    dataHighReferral: [],
    dataDeposit: [],
    dataReward: [],
    isAuthenticated: localStorage.access_token ? true : false,
    dataChartDate: [],
    seriesArea: [
      {
        name: "Total",
        data: [],
      }
    ],
    optionsArea: {
      chart: {
        type: 'area',
        height: 300,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },

      title: {
        text: 'New Member Statictis',
        align: 'left'
      },
      labels: [],
      xaxis: {
        type: 'date',
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: 'left'
      }
    },
  }),
  actions: {
    async buyBalance(amount) {
      try {
        const { data } = await axios({
          url: this.baseURL + '/user/buy',
          method: 'patch',
          headers: { access_token: localStorage.getItem('access_token') },
          data: { amount }
        })
        // await this.getDataDeposit()
        await this.getDataProfile()
        return "ok"
      } catch (error) {
        return "bosok"
        console.log(error)
      }
    },
    async getDataChart() {
      try {
        const { data } = await axios({
          url: this.baseURL + '/member/chart',
          method: 'get',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        let resultDate = []
        let resultCount = []
        data.forEach(el => {
          resultDate.push(el.date)
          resultCount.push(el.count)
        });
        this.dataChartDate = resultDate
        this.seriesArea[0].data = resultCount
        this.optionsArea.labels = resultDate
      } catch (error) {
        console.log(error)
      }
    },
    async getDataReward() {
      try {
        const { data } = await axios({
          url: this.baseURL + '/reward',
          method: 'get',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        this.dataReward = data
      } catch (error) {
        console.log(error)
      }
    },
    async moveReward(amount) {
      try {
        const { data } = await axios({
          url: this.baseURL + '/user/reward',
          method: 'patch',
          headers: { access_token: localStorage.getItem('access_token') },
          data: { amount }
        })
        // await this.getDataDeposit()
        await this.getDataProfile()
      } catch (error) {
        console.log(error)
      }
    },
    async delMember(userId) {
      try {
        const { data } = await axios({
          url: this.baseURL + '/member/' + userId,
          method: 'delete',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        await this.getDataMemeberException()
        await this.getDataMember()
      } catch (error) {
        console.log(error)
      }
    },
    async createMember(userId) {
      try {
        const { data } = await axios({
          url: this.baseURL + '/member',
          method: 'post',
          headers: { access_token: localStorage.getItem('access_token') },
          data: { userId }
        })
        await this.getDataMemeberException()
        await this.getDataMember()
      } catch (error) {
        console.log(error)
      }
    },
    async getDataMemeberException() {
      try {
        const { data } = await axios({
          url: this.baseURL + '/member/except',
          method: 'get',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        this.dataMemberException = data
      } catch (error) {
        console.log(error)
      }
    },
    async moveReferral(amount) {
      try {
        const { data } = await axios({
          url: this.baseURL + '/user/referral',
          method: 'patch',
          headers: { access_token: localStorage.getItem('access_token') },
          data: { amount }
        })
        await this.getReferral()
        await this.getDataProfile()
      } catch (error) {
        console.log(error)
      }
    },
    async moveCashback(amount) {
      try {
        const { data } = await axios({
          url: this.baseURL + '/user/deposit',
          method: 'patch',
          headers: { access_token: localStorage.getItem('access_token') },
          data: { amount }
        })
        await this.getDataDeposit()
        await this.getDataProfile()
      } catch (error) {
        console.log(error)
      }
    },
    async getAllReferral() {
      try {
        const { data } = await axios({
          url: this.baseURL + '/referral/all',
          method: 'get',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        this.dataHighReferral = data
      } catch (error) {
        console.log(error)
      }
    },
    async getDataDeposit() {
      try {
        const { data } = await axios({
          url: this.baseURL + '/deposit',
          method: 'get',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        this.dataDeposit = data
      } catch (error) {
        console.log(error)
      }
    },
    async topUpUser(amount) {
      try {
        const { data } = await axios({
          url: this.baseURL + '/user',
          method: 'patch',
          headers: { access_token: localStorage.getItem('access_token') },
          data: { amount }
        })
        await this.getDataDeposit()
      } catch (error) {
        console.log(error)
      }
    },
    async getReferral() {
      try {
        const { data } = await axios({
          url: this.baseURL + '/referral',
          method: 'get',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        this.dataReferral = data
      } catch (error) {
        console.log(error)
      }
    },
    async buyProducts(productId, phoneNumber) {
      try {
        const { data } = await axios({
          url: this.baseURL + '/transaction',
          method: 'post',
          headers: { access_token: localStorage.getItem('access_token') },
          data: { productId, invoice: 'fgj', phoneNumber }
        })

      } catch (error) {
        console.log(error)
      }
    },
    async getDataMember() {
      try {
        const { data } = await axios({
          url: this.baseURL + '/member',
          method: 'get',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        this.dataMember = data
      } catch (error) {
        console.log(error)
      }
    },
    async getDataOrder() {
      try {
        const { data } = await axios({
          url: this.baseURL + '/transaction',
          method: 'get',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        this.dataOrder = data
      } catch (error) {
        console.log(error)
      }
    },
    async getDataProfile() {
      try {
        const { data } = await axios({
          url: this.baseURL + '/user',
          method: 'get',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        this.dataUser = data
      } catch (error) {
        console.log(error)
      }
    },
    async fetchProducts() {
      let url = this.baseURL + '/products'
      try {
        const { data } = await axios({
          url,
          method: 'get'
        })
        this.dataProducts = data
      } catch (error) {
        console.log(error)
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: error.response.data.message
        // })
      }
    },
    async payment(total) {
      try {
        const { data } = await axios({
          url: this.baseURL + '/order',
          method: 'post',
          data: {
            total
          },
          headers: { access_token: localStorage.getItem('access_token') }
        })
        return data.token
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },
    async login(email, password) {
      try {
        const { data } = await axios({
          url: this.baseURL + '/login',
          method: 'post',
          data: { email, password }
        })
        localStorage.setItem('access_token', data.access_token)
        console.log(data.access_token)
        this.isAuthenticated = true
        this.$router.push('/')
        // await this.
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },
    async register(value) {
      try {
        const { data } = await axios({
          url: this.baseURL + '/register',
          method: 'post',
          data: value
        })
        // this.$router.push('/login')
        console.log(data)
        Swal.fire({
          title: `${data.email} done create, you can log in`,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        this.$router.push('/login')
      } catch (error) {
        console.log(error.response)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.message
        })
      }
    },
  }
})
