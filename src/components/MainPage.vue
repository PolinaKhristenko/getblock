<template>
  <main>
    <section>
      <div class="max-w-[1000px] mx-auto ">
        <h1 class="text-h1 text-black font-light mb-4">Crypto Exchange</h1>
        <h6 class="text-xl text-black">Exchange fast and easy</h6>

        <div class="flex">
          <div class="dropdown__wrapper" v-bind:class="{ active: fromIsActive }">
              <input type="text" @input="changeFrom($event)" @click="toggleTo()" 
              :placeholder="'Search'" :value="`${minimalVal}`"
              class="border border-[#E3EBEF] border-solid"/>
              <div class="dropdown__options">
                <ul class="dropdown__list">
                  <li @click="setFrom(crypto.ticker)"
                    v-for="crypto in cryptos" v-bind:key="crypto"
                    class="py-3 pl-5 items-center hover:bg-light-blue flex grow"> 
                    <a class="flex"><img :src="`${crypto.image}`" alt='Crypto image' class="w-5 h-5"/><p class="mx-3 uppercase">{{crypto.ticker}}</p><p>{{crypto.name}}</p></a>
                  </li>
                </ul>
              </div>
          </div>

          <a href="/" class="mx-7">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.99 17H20V19H7.99V22L4 18L7.99 14V17Z" fill="#11B3FE"/>
              <path d="M16.01 8H4V10H16.01V13L20 9L16.01 5V8Z" fill="#11B3FE"/>
            </svg>
          </a>
          
          <div class="dropdown__wrapper" v-bind:class="{ active: toIsActive }">
              <input type="text" :placeholder="'Search'" 
              @click="toggleFrom()" :value="`${estimatedVal}`"
              class="border border-[#E3EBEF] border-solid"/>
              <div class="dropdown__options">
                <ul class="dropdown__list">
                  <li @click="setTo(crypto.ticker)"
                    v-for="crypto in cryptos" v-bind:key="crypto"
                    class="py-3 pl-5 items-center hover:bg-light-blue">
                    <a class="flex"><img :src="`${crypto.image}`" alt='Crypto image' class="w-5 h-5"/><p class="mx-3 uppercase">{{crypto.ticker}}</p><p>{{crypto.name}}</p></a>
                  </li>
                </ul>
              </div>
          </div>
        </div>

        <div class="">
          <p class="text-base text-black">Your Ethereum address</p>
          <div class="flex"> 
            <input type="text" class="border border-[#E3EBEF] border-solid" />
            <button class="flex text-white font-bold bg-blue submit__btn uppercase hover:bg-[#0095E0]" type="submit">Exchange</button>
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
      errors: [],
      chosenMin: {
        img: '',
        ticker: ''
      },
      chosenEstim: {
        img: '',
        ticker: ''
      },
      minimalVal: "",
      fromCrypto: null,
      estimatedVal: "",
      toCrypto: null,
      fromIsActive: false,
      toIsActive: false,
    }
  },
  name: 'MainPage',
  props: {
  },
  methods: {
    toggleTo() {
      this.fromIsActive = !this.fromIsActive;
    },
    toggleFrom() {
      this.toIsActive = !this.toIsActive;
    },
    setFrom (fromVal) {
      this.fromCrypto = fromVal
      console.log(this.fromCrypto)
    },
    async getMinimal() {
      if (this.fromCrypto && this.toCrypto) {
          const from = this.fromCrypto;
          const to = this.toCrypto;
        try {
          const urlMin = `https://api.changenow.io/v1/min-amount/${from}_${to}?api_key=${this.apiKey}`;
          const responseMin = await axios.get(urlMin);
            console.log(responseMin)

            this.minimalVal = responseMin.data.minAmount;

            this.getEstimated ();
        } catch (err) {
          console.log(err);
        }
      } 
    },
    setTo (toVal) {
      this.toCrypto = toVal;
      console.log(this.toCrypto)
      this.getMinimal()
    },
    async getEstimated () {
      if (this.fromCrypto && this.toCrypto && this.minimalVal) {
          const from = this.fromCrypto;
          const to = this.toCrypto;
        try {
          const urlEstim = `https://api.changenow.io/v1/exchange-amount/${this.minimalVal}/${from}_${to}/?api_key=${this.apiKey}`;

          const responseEstim = await axios.get(urlEstim);
            console.log(responseEstim)

          this.estimatedVal = responseEstim.data.estimatedAmount;
        } catch (err) {
          console.log(err);
        }
      } 
    },
    changeFrom(e) {
      this.minimalVal = e.target.value;
      this.getEstimated();
    },
  },
    mounted() {
      axios.get('https://api.changenow.io/v1/currencies?active=true&fixedRate=true')
      .then(response => (this.cryptos = response.data));
  }
}
</script>

<style scoped>
  .dropdown__wrapper, 
  .dropdown__wrapper input{
    max-width: 440px;
    width: 100%;
  }

  .dropdown__options {
    opacity: 0;
    transform: scaleY(0);
    position: relative;
  }

  .dropdown__wrapper.active .dropdown__options{
    transform: scaleY(1);
    opacity: 1;
  }

  .dropdown__list {
    width: 100%;
    top: 0;
    left: 0;
    border: 1px solid #C1D9E6;
    gap: 1px;
    height: 144px;
    overflow-y: scroll;
  }


  .submit__btn {
    padding: 15px 59px;
    border-radius: 5px;
  }

</style>
