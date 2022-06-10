<template>
  <main>
    <section>
      <div class="max-w-[1000px] mx-auto ">
        <h1 class="text-h1 text-black font-light mb-4">Crypto Exchange</h1>
        <h6 class="text-xl text-black">Exchange fast and easy</h6>

        <p v-if="error" class="text-[#c12d2d]">{{error}}</p> <!--Error-->

        <div class="flex items-center mt-16 mb-8"> 

          <div class="dropdown__wrapper relative" v-bind:class="{ active: fromIsActive }"> <!--FROM currency-->

              <input type="text" @input="changeFrom($event)"
              :placeholder="'Search'" :value="`${minimalVal}`"
              class="border border-[#E3EBEF] border-solid py-3.5 pl-4 
              rounded-[5px] pr-3"/> <!--Value input-->

              <div class="absolute top-2 right-2 w-10 h-10 flex " @click="toggleFrom()">
                <img v-if="chosenMin.img" :src="chosenMin.img" alt='Crypto image' class="w-5 h-5"/>
                <p v-if="chosenMin.ticker" class="uppercase">{{chosenMin.ticker}}</p>
                <img src="../assets/img/arrow-down.svg" class="w-4 h-4" alt="Options arrow"/>
              </div> <!--Chosen currency-->

              <div class="dropdown__options"> <!--Dropdown-->
                <ul class="dropdown__list absolute">
                  <input type="search" v-model="fromSearch" 
                  class="py-3.5 pl-4 pr-3 rounded-[5px]"
                  :placeholder="'Search'" /> <!--Search input-->

                  <li @click="setFrom(crypto.ticker, crypto.image)"
                    v-for="crypto in fromSearchHandler" v-bind:key="crypto"
                    class="items-center hover:bg-light-blue bg-white"> 
                    <a class="flex py-3 pl-5">
                      <img v-if="crypto.image" :src="crypto.image" alt='Crypto image' class="w-5 h-5"/>
                      <p class="mx-3 uppercase">{{crypto.ticker}}</p><p>{{crypto.name}}</p>
                    </a>
                  </li> <!--Crypto info-->
                </ul>
              </div>
          </div>

          <a class="mx-7 flex"> <!--Exchange sign-->
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.99 17H20V19H7.99V22L4 18L7.99 14V17Z" fill="#11B3FE"/>
              <path d="M16.01 8H4V10H16.01V13L20 9L16.01 5V8Z" fill="#11B3FE"/>
            </svg>
          </a>
          
          <div class="dropdown__wrapper relative" v-bind:class="{ active: toIsActive }">  <!--TO currency-->

              <input type="text" :placeholder="'Search'" 
              :value="`${estimatedVal}`"
              class="border border-[#E3EBEF] border-solid py-3.5 pl-4 
              rounded-[5px] pr-3"/> <!--Value input-->

              <div class="absolute top-2 right-2 w-10 h-10 flex " @click="toggleTo()">
                <img v-if="chosenEstim.img" :src="chosenEstim.img" alt='Crypto image' class="w-5 h-5"/>
                <p v-if="chosenEstim.ticker" class="uppercase">{{chosenEstim.ticker}}</p>
                <img src="../assets/img/arrow-down.svg" class="w-4 h-4" alt="Options arrow"/>
              </div> <!--Chosen currency-->

              <div class="dropdown__options"> <!--Dropdown-->
                <ul class="dropdown__list absolute">

                  <input type="search" v-model="toSearch" 
                  class="py-3.5 pl-4 pr-3 rounded-[5px]"
                  :placeholder="'Search'" /> <!--Search input-->

                  <li @click="setTo(crypto.ticker, crypto.image)" 
                    v-for="crypto in toSearchHandler" v-bind:key="crypto"
                    class="items-center hover:bg-light-blue bg-white">
                    <a class="flex py-3 pl-5"><img :src="`${crypto.image}`" alt='Crypto image' class="w-5 h-5"/><p class="mx-3 uppercase">{{crypto.ticker}}</p><p>{{crypto.name}}</p></a>
                  </li> <!--Crypto info-->
                </ul>
              </div>
          </div>
        </div>

        <div class="">
          <p class="text-base text-black mb-2">Your Ethereum address</p>
          <div class="flex"> 
            <input type="text" class="border border-[#E3EBEF] border-solid flex grow" />
            <button class="flex text-white font-bold bg-blue submit__btn uppercase hover:bg-[#0095E0] ml-8" type="submit">Exchange</button>
          </div>
        </div>
      </div>
    </section>
    <section></section>
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

          this.minimalVal = responseMin.data.minAmount;

          this.getEstimated();
        } catch (err) {
          console.log(err);
        }
      } 
    },  // Sets minimum amount and calls getEstimated function
    async getEstimated() {
      if (this.fromCrypto && this.toCrypto && (this.minimalVal || this.newFromVal)) {
          const from = this.fromCrypto;
          const to = this.toCrypto;
        try {
          const urlEstim = `https://api.changenow.io/v1/exchange-amount/${this.minimalVal}/${from}_${to}/?api_key=${this.apiKey}`;

          const responseEstim = await axios.get(urlEstim);

          this.estimatedVal = responseEstim.data.estimatedAmount;
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
        console.log(this.estimatedVal)
      } else {
        this.error = '';
        e.target.value = this.newFromVal;
        this.getEstimated();
      }
    }, // Changes fromVal depending on input values
  },
  computed: {
    fromSearchHandler() {
      return this.cryptos.filter(element => {
        return element.name.toLowerCase().includes(this.fromSearch.toLowerCase());
      })
    }, 
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
  .dropdown__wrapper, 
  .dropdown__wrapper input{
    max-width: 440px;
    width: 100%;
  }

  .dropdown__options {
    display: none;
    transform: scaleY(0);
    position: relative;
  }

  .dropdown__wrapper.active .dropdown__options{
    transform: scaleY(1);
    display: flex;
  }

  .dropdown__list {
    width: 100%;
    top: -54px;
    left: 0;
    border: 1px solid #C1D9E6;
    height: 144px;
    overflow-y: scroll;
  }


  .submit__btn {
    padding: 15px 59px;
    border-radius: 5px;
  }

  
</style>
