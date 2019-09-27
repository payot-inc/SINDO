<template>
  <div id="contents">
    <div class="header">
      <router-link to="/phone" class="back">
        <i class="material-icons">keyboard_backspace</i>
      </router-link>
      <router-link to="/home" class="home">
        <i class="material-icons">home</i>
      </router-link>
    </div>
    <div class="sub product">
      <div class="inner">
        <div class="sub_title">
          <h2>상품선택</h2>
          <p>자판기에 있는 상품을 선택 해 주세요</p>
          <span></span>
        </div>
        <div class="list">
          <div class="machine">
            <ul>
              <li
                :class="{on: _.eq(selectedMachine, machine) }"
                v-for="(machine, index) in machines"
                :key="index"
                @click="selectedMachine = machine"
              >
                <strong>{{ index + 1 | numeral('00') }}</strong>
                <span>자판기</span>
              </li>
            </ul>
          </div>
          <div class="items">
            <div class="row">
              <a
                class="col-md-4"
                v-for="(product, index) in selectedMachine.products"
                :key="index"
                @click="product.max !== 0 ? appendProduct(selectedMachine, product) : null"
              >
                <dl :class="{ no: product.max === 0 }">
                  <dt>
                    <img :src="product.image" />
                    <span class="number">{{ product.max | numeral('0,0') }}</span>
                  </dt>
                  <dd>{{ product.price | numeral('0,0') }}원</dd>
                  <dd class="black" v-if="product.max === 0">품절</dd>
                </dl>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="basket">
        <div class="inner">
          <div class="basket_list">
            <ul>
              <li v-for="(select, index) in selectedProducts" :key="index">
                <div class="name">
                  <span>{{ select.machine.name }}</span>
                  {{ select.product.name }}
                </div>
                <div class="amount">
                  <span>
                    <a @click="select.count += select.count >= select.product.max ? 0 : 1">+</a>
                    <input type="text" :value="select.count" />
                    <a @click="select.count -= select.count > 1 ? 1 : 0">-</a>
                  </span>
                </div>
                <div class="price">{{ select.product.price * select.count | numeral('0,0') }} 원</div>
                <div class="close">
                  <a href="#" @click="removeBucketProduct(index)">
                    <i class="material-icons">close</i>
                  </a>
                </div>
              </li>

              <li class="no-data" v-if="selectedProducts.length === 0">
                <div>상품을 선택 해 주세요</div>
              </li>
            </ul>
            <div class="last">
              <span>최종결제금액</span>
              <strong>{{ totalAmount | numeral('0,0') }} 원</strong>
            </div>
          </div>
          <div class="basket_btns">
            <a href="#" class="cancle" @click="removeBucketProduct(-1)">모두취소</a>
            <a href="#" class="order" @click="submit">결제하기</a>
          </div>
        </div>
      </div>
    </div>
    <!-- product -->

    <!-- <div id="status-bar">
      <ul class="status-list">
        <li>인터넷</li>
        <li>터치</li>
      </ul>
      <div class="time">10:10</div>
    </div> -->
  </div>
</template>

<script>
import { times, findIndex, eq } from "lodash";
import numeral from "numeral";
export default {
  data() {
    return {
      selectedMachine: {},
      machines: times(10).map(index => {
        return {
          id: index + 1,
          name: `${numeral(index + 1).format("00")} 자판기`,
          products: times(8).map(idx => {
            return {
              id: idx + 1,
              name: [
                "사이다",
                "코카콜라",
                "포카리스웨트",
                "파워에이드",
                "비락식혜",
                "환타오렌지",
                "실론티",
                "생솔"
              ][idx],
              max: Math.floor(Math.random() * 10),
              // count: 0,
              image: `img/p${numeral(idx + 1).format("00")}.png`,
              price: 1000
            };
          })
        };
      }),
      selectedProducts: []
    };
  },
  mounted() {
    this.selectedMachine = this.machines[0];
  },
  computed: {
    totalAmount() {
      return this.selectedProducts.map(({ count, product }) => {
        return product.price * count;
      }).reduce((acc, value) => acc + value, 0);
    }
  },
  methods: {
    appendProduct(machine, product) {
      const findProductBy = findIndex(
        this.selectedProducts,
        ({ machine: m, product: p }) =>
          m.id === machine.id && p.id === product.id
      );

      if (findProductBy === -1) {
        this.selectedProducts.push({ machine, product, count: 1 });
      } else {
        const nowCount = this.selectedProducts[findProductBy].count;
        const maxCount = product.max;
        this.selectedProducts[findProductBy].count +=
          nowCount < maxCount ? 1 : 0;
      }
    },
    removeBucketProduct(index) {
      if (index === -1) {
        this.selectedProducts = [];
      } else {
        this.selectedProducts.splice(index, 1);
      }
    },

    submit() {
      if (this.selectedProducts.length === 0) {
        this.$bvModal.msgBoxOk('상품을 선택해 주세요', { centered: true, size: 'lg', okTitle: '확인' });
        return;
      }

      this.$router.push({ name: 'pay', params: { products: this.selectedProducts } });
    }
  }
};
</script>
