<template>
  <div style="width: 100%; height: 100%">
    <div id="contents">
      <div class="header">
        <router-link to="/bucket" class="back">
          <i class="material-icons">keyboard_backspace</i>
        </router-link>
        <router-link to="/" class="home">
          <i class="material-icons">home</i>
        </router-link>
      </div>
      <div class="sub order">
        <div class="sub_title">
          <h2>주문하기</h2>
          <p>선택하신 상품을 확인 후 결제를 진행 해 주세요</p>
          <span></span>
        </div>
        <div class="inner">
          <div class="order_list">
            <ul>
              <li v-for="(p, index) in $route.params.products" :key="index">
                <span class="eq">{{ p.machine.name }}</span>
                <span class="name">{{ p.product.name }}</span>
                <span class="amount">{{ p.count | numeral('0,0') }} 개</span>
                <span class="price">{{ p.count * p.product.price | numeral('0,0') }}원</span>
              </li>
            </ul>
          </div>
          <div class="last_price">
            <dl>
              <dt>최종결제금액</dt>
              <dd>
                <b>{{ total | numeral('0,0') }}</b> 원
              </dd>
            </dl>
          </div>
          <div class="credit">
            <p>
              <b>결제방법</b>을 선택해주세요
            </p>
            <div class="row">
              <div class="col-lg-6" @click="pay('card')">
                <dl data-toggle="modal" data-target="#card_modal" class="modal-on">
                  <dt>
                    <span>
                      <img src="@/assets/img/card_img.jpg" />
                    </span>
                  </dt>
                  <dd>카드결제</dd>
                </dl>
              </div>
              <div class="col-lg-6" @click="pay('cash')">
                <dl data-toggle="modal" data-target="#coin_modal" class="modal-on">
                  <dt>
                    <span>
                      <img src="@/assets/img/coin.png" />
                    </span>
                  </dt>
                  <dd>현금결제</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <!-- inner -->
      </div>
      <!-- order -->

      <div id="status-bar">
        <ul class="status-list">
          <li>인터넷</li>
          <li>터치</li>
        </ul>
        <div class="time">10:10</div>
      </div>
    </div>

    <b-modal
      ref="cardModal"
      size="lg"
      :centered="true"
      :hide-header="true"
      :hide-footer="true"
      dialog-class="credit_modal"
      :body-class="['credit_modal']"
    >
      <div class="inner">
        <h3>카드결제</h3>
        <div class="img">
          <img src="@/assets/img/card_img.jpg" />
        </div>
        <p>카드리더기에 카드를 투입 해 주세요</p>
        <div class="info">
          <dl>
            <dt>결제금액</dt>
            <dd>
              <b>{{ total | numeral('0,0') }}</b> 원
            </dd>
          </dl>
        </div>
      </div>
    </b-modal>

    <b-modal
      ref="cashModal"
      size="lg"
      :centered="true"
      :hide-header="true"
      :hide-footer="true"
      dialog-class="credit_modal"
      :body-class="['credit_modal']"
    >
      <div class="inner">
        <h3>현금결제</h3>
        <div class="img">
          <img src="@/assets/img/coin.gif" />
        </div>
        <p>결제금액만큼 현금을 투입해주세요</p>
        <div class="info">
          <dl>
            <dt>결제금액</dt>
            <dd>
              <b>{{ total | numeral('0,0') }}</b> 원
            </dd>
          </dl>
          <dl>
            <dt>투입된 금액</dt>
            <dd>
              <b>0</b> 원
            </dd>
          </dl>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export default {
  computed: {
    total() {
      return this.$route.params.products
        .map(item => {
          return item.count * item.product.price;
        })
        .reduce((acc, value) => acc + value, 0);
    }
  },
  methods: {
    async pay(type) {
      this.$bvModal.msgBoxOk('자판기가 연결되어있지않아 결제를 진행할 수 없습니다', {
        size: 'lg',
        centered: true,
        okTitle: '확인'
      });
      // const amount = this.total;
      // type === 'card' ? this.$refs.cardModal.show() : this.$refs.cashModal.show();

      // await of(null).pipe(delay(1000 * 5)).toPromise();

      // this.$router.push({ name: 'finish', params: { products: this.$route.params.products, payType: type } });
    }
  }
};
</script>
