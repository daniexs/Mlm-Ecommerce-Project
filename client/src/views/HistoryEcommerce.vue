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
              <th
                scope="col"
                class="uppercase px-1 py-3"
              >
                Action
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
                {{ items.phoneNumber }}
              </td>
              <td class="px-1 py-4">
                {{ items.Product.name }}
              </td>
              <td class="px-1 py-4">
                <button
                  type="button"
                  class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  v-on:click="downloadInvoice(items)"
                >
                  Download Invoice
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
  import easyinvoice from 'easyinvoice';

  export default {
    name: "Dashboard",
    data() {
      return {
        invoiceBase64: ''
      };
      // end chart data line
    },
    components: {
      Icon,
    },
    methods: {
      ...mapActions(useCounterStore,['getDataOrder', 'getDataProfile']),
      async createInvoice(value) {
        // See documentation for all data properties
        const data = this.getSampleData(value);
        const result = await easyinvoice.createInvoice(data);
        this.invoiceBase64 = result.pdf;
      },
      async downloadInvoice(value) {
          // See documentation for all data properties
          // await this.createInvoice(value)
          try {
            const data = this.getSampleData(value);
            console.log(data)
            const result = await easyinvoice.createInvoice(data);
            easyinvoice.download('myInvoice.pdf', result.pdf);
            
          } catch (error) {
            console.log(error)
          }
          //	you can download like this as well:
          //	easyinvoice.download();
          //	easyinvoice.download('myInvoice.pdf');
      },
      async renderInvoice() {
          // See documentation for all data properties
          document.getElementById('pdf').innerHTML = 'loading...';
          const data = this.getSampleData();
          const result = await easyinvoice.createInvoice(data);
          easyinvoice.render('pdf', result.pdf);
      },
      getSampleData(data) {
        data.createdAt = data.createdAt.split('T')
        data.createdAt = data.createdAt[0]
            return {
             		mode: "development",
                // "customize": {
                //     "template": "SGVsbG8gd29ybGQh" // Must be base64 encoded html. This example contains 'Hello World!' in base64
                // },
                images: {
                    logo: 'https://public.easyinvoice.cloud/img/logo_en_original.png',
                    /* background: 'https://public.easyinvoice.cloud/img/watermark-draft.jpg' */
                },
                sender: {
                    company: 'Wepedia',
                    address: 'Malang',
                },
                client: {
                    company: this.dataUser.name,
                    address: this.dataUser.address,
                    country: 'Indonesia'
                },
                information: {
                    number: '2021.0001',
                    date: data.createdAt,
                },
                products: [
                    {
                        quantity: 1,
                        description: data.Product?.name,
                        price: data.Product?.price
                    }
                ],
                'bottom-notice': 'Kindly pay your invoice within 15 days.',
                settings: {
                    currency: 'IDR' // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
                    // "locale": "nl-NL", // Defaults to en-US, used for number formatting (see docs)
                    // "margin-top": 25, // Default to 25
                    // "margin-right": 25, // Default to 25
                    // "margin-left": 25, // Default to 25
                    // "margin-bottom": 25, // Default to 25
                    // "format": "Letter", // Defaults to A4,
                    // "height": "1000px", // allowed units: mm, cm, in, px
                    // "width": "500px", // allowed units: mm, cm, in, px
                    // "orientation": "landscape", // portrait or landscape, defaults to portrait
                },
                // Used for translating the headers to your preferred language
                // Defaults to English. Below example is translated to Dutch
                "translate": {
                //     "invoice": "FACTUUR",
                //     "number": "Nummer",
                //     "date": "Datum",
                //     "due-date": "Verloopdatum",
                //     "subtotal": "Subtotaal",
                //     "products": "Producten",
                //     "quantity": "Aantal",
                //     "price": "Prijs",
                //     "product-total": "Totaal",
                //     "total": "Totaal"
                //		 "vat": "btw"
                },
            };
        }
    },
    computed: {
      ...mapState(useCounterStore,['dataOrder', 'dataUser'])
    },
    created(){
      this.getDataOrder()
      this.getDataProfile()
    },
    mounted() {},
  };
</script>
