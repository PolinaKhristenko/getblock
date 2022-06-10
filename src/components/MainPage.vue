<template>
  <main>
    <section>
      <div class="max-w-[1000px] mx-auto">
        <h1 class="md:text-h1 text-[40px] text-black font-light mb-4">Crypto Exchange</h1>
        <h6 class="text-xl text-black">Exchange fast and easy</h6>

        <div class="flex items-center mt-16 flex-col sm:flex-row"> 

          <div class="dropdown__wrapper max-w-md w-full relative" v-bind:class="{ active: fromIsActive }"> <!--FROM currency-->

              <input type="text" @input="changeFrom($event)"
              :placeholder="'Search'" :value="`${minimalVal}`"
              class="border border-[#E3EBEF] border-solid py-3.5 pl-4 
              rounded-[5px] pr-3 max-w-md w-full"/> <!--Value input-->

              <div class="absolute top-2 h-10 flex cursor-pointer
              border-l border-gray border-solid items-center pl-9 right-6" 
              @click="toggleFrom()">
                <img v-if="chosenMin.img" :src="chosenMin.img" alt='Crypto image' class="w-5 h-5 mr-3.5"/>
                <p v-if="chosenMin.ticker" class="uppercase mr-7 text-black">{{chosenMin.ticker}}</p>
                <img src="../assets/img/arrow-down.svg" class="w-4 h-4" alt="Options arrow"/>
              </div> <!--Chosen currency-->

              <div class="dropdown__options relative z-10"> <!--Dropdown-->
                <ul class="dropdown__list w-full absolute top-[-54px] left-0 border 
                border-[#C1D9E5] border-solid h-36 overflow-y-scroll rounded-[5px]">

                  <input type="search" v-model="fromSearch" 
                  class="py-3.5 pl-4 pr-3 rounded-[5px] max-w-md w-full 
                  border-b border-[#E3EBEF] border-solid"
                  :placeholder="'Search'" /> <!--Search input-->

                  <li @click="setFrom(crypto.ticker, crypto.image)"
                    v-for="crypto in fromSearchHandler" v-bind:key="crypto"
                    class="items-center hover:bg-light-blue bg-white"> 
                    <a class="flex py-3 pl-5">
                      <img v-if="crypto.image" :src="crypto.image" alt='Crypto image' class="w-5 h-5"/>
                      <p class="mx-3 uppercase text-black">{{crypto.ticker}}</p>
                      <p class="text-[#80A2B6]">{{crypto.name}}</p>
                    </a>
                  </li> <!--Crypto info-->
                </ul>
              </div>
          </div>


          <a class="mx-7 flex rotate-90 sm:rotate-0 my-4 sm:my-0"> <!--Exchange sign-->
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.99 17H20V19H7.99V22L4 18L7.99 14V17Z" fill="#11B3FE"/>
              <path d="M16.01 8H4V10H16.01V13L20 9L16.01 5V8Z" fill="#11B3FE"/>
            </svg>
          </a>
          

          <div class="dropdown__wrapper max-w-md w-full relative" v-bind:class="{ active: toIsActive }">  <!--TO currency-->

              <input type="text" :placeholder="'Search'" 
              :value="`${estimatedVal}`"
              class="border border-[#E3EBEF] border-solid py-3.5 pl-4 
              rounded-[5px] pr-3 max-w-md w-full"/> <!--Value input-->

              <div class="absolute top-2 h-10 flex cursor-pointer
              border-l border-gray border-solid items-center pl-9 right-6" 
              @click="toggleTo()">
                <img v-if="chosenEstim.img" :src="chosenEstim.img" alt='Crypto image' class="w-5 h-5 mr-3.5"/>
                <p v-if="chosenEstim.ticker" class="uppercase mr-7 text-black">{{chosenEstim.ticker}}</p>
                <img src="../assets/img/arrow-down.svg" class="w-4 h-4" alt="Options arrow"/>
              </div> <!--Chosen currency-->

              <div class="dropdown__options"> <!--Dropdown-->
                <ul class="dropdown__list w-full absolute top-[-54px] left-0 border border-[#C1D9E5] 
                border-solid h-36 overflow-y-scroll rounded-[5px]">

                  <input type="search" v-model="toSearch" 
                  class="py-3.5 pl-4 pr-3 rounded-[5px] max-w-md w-full
                  border-b border-[#E3EBEF] border-solid"
                  :placeholder="'Search'" /> <!--Search input-->

                  <li @click="setTo(crypto.ticker, crypto.image)" 
                    v-for="crypto in toSearchHandler" v-bind:key="crypto"
                    class="items-center hover:bg-light-blue bg-white">
                    <a class="flex py-3 pl-5">
                      <img v-if="crypto.image" :src="crypto.image" alt='Crypto image' class="w-5 h-5"/>
                      <p class="mx-3 uppercase text-black">{{crypto.ticker}}</p>
                      <p class="text-[#80A2B6]">{{crypto.name}}</p>
                    </a>
                  </li> <!--Crypto info-->
                </ul>
              </div>
          </div>
        </div>

        <div class="">
          <p class="text-[#c12d2d] mb-8 h-3">{{error}}</p> <!--Minimal amoint error-->
          <p class="text-base text-black mb-2">Your Ethereum address</p>
          <div class="flex flex-col sm:flex-row sm:gap-8"> 
            <input type="search" class="border rounded-[5px] border-[#E3EBEF] border-solid flex grow py-3.5 mb-4 sm:mb-0" />
            <button class="flex text-white font-bold bg-blue py-4 px-[59px]
            uppercase hover:bg-[#0095E0] rounded-[5px] justify-center" type="submit">Exchange</button>
          </div>
          <p class="text-[#c12d2d] h-3">{{errorPair}}</p> <!--Disabled pair error -->
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      apiKey: 'c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd',
      cryptos: [],
      error: '',
      errorPair: '',
      fromSearch: '',
      toSearch: '',
      chosenMin: {
        img: '',
        ticker: '',
      },
      chosenEstim: {
        img: '',
        ticker: '',
      },
      fromCrypto: "",
      minimalVal: "",
      newFromVal: "",
      toCrypto: "",
      estimatedVal: "",
      fromIsActive: false,
      toIsActive: false,
    };
  },
  name: 'MainPage',
  props: {
  },
  methods: {
    toggleFrom() {
      this.fromIsActive = !this.fromIsActive;
    }, // Toggles active class for the dropdown
    toggleTo() {
      this.toIsActive = !this.toIsActive;
    }, // Toggles active class for the dropdown
    setFrom (fromVal, fromImg) {
      this.fromCrypto = fromVal;
      this.chosenMin.ticker = fromVal;
      this.chosenMin.img = fromImg;
      this.toggleFrom();
      this.getMinimal();
    }, // Sets fromVal
    setTo (toVal, toImg) {
      this.toCrypto = toVal;
      this.chosenEstim.ticker = toVal;
      this.chosenEstim.img = toImg;
      this.toggleTo();
      this.getMinimal();
    },  // Sets fromVal and calls first value calculation 
    async getMinimal() {
      if (this.fromCrypto && this.toCrypto) {
          const from = this.fromCrypto;
          const to = this.toCrypto;
        try {
          const urlMin = `https://api.changenow.io/v1/min-amount/${from}_${to}?api_key=${this.apiKey}`;
          const responseMin = await axios.get(urlMin);

          if (responseMin) {
            this.minimalVal = responseMin.data.minAmount;
            this.getEstimated();
          } else {
            this.errorPair = 'This pair is disabled now'
          }

        } catch (err) {
          console.log(err);
        }
      } 
    }, // Sets minimum amount and calls getEstimated function
    async getEstimated() {
      if (this.fromCrypto && this.toCrypto && (this.minimalVal || this.newFromVal)) {
          const from = this.fromCrypto;
          const to = this.toCrypto;
        try {
          const urlEstim = `https://api.changenow.io/v1/exchange-amount/${this.minimalVal}/${from}_${to}/?api_key=${this.apiKey}`;

          const responseEstim = await axios.get(urlEstim);

          if (responseEstim) {
            this.estimatedVal = responseEstim.data.estimatedAmount;
          } else {
            this.errorPair = 'This pair is disabled now'
          }

        } catch (err) {
          console.log(err);
        }
      } 
    }, // Sets estimated amount 
    changeFrom(e) {
      this.newFromVal = e.target.value;
      if (this.newFromVal < this.minimalVal) {
        this.error = `This amount should be more than ${this.minimalVal}`;
        this.estimatedVal = `-`;
      } else {
        this.error = '';
        e.target.value = this.newFromVal;
        this.getEstimated();
      }
    }, // Changes fromVal depending on input value
  },
  computed: {
    fromSearchHandler() {
      return this.cryptos.filter(element => {
        return element.name.toLowerCase().includes(this.fromSearch.toLowerCase());
      })
    }, // Search 
    toSearchHandler() {
      return this.cryptos.filter(element => {
        return element.name.toLowerCase().includes(this.toSearch.toLowerCase());
      })
    }, // Search 
  },
  mounted() {
    axios.get('https://api.changenow.io/v1/currencies?active=true&fixedRate=true')
    .then(response => (this.cryptos = response.data));
  }, // Gets all cryptos
}
</script>

<style scoped>
  .dropdown__options {
    display: none;
    transform: scaleY(0);
    position: relative;
  }

  .dropdown__wrapper.active .dropdown__options {
    transform: scaleY(1);
    display: flex;
  }
</style>
