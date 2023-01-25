<template>
  <div class="product-detail-container">
    <div class="row">
      <div class="col-md-7 col-sm-12">
        <div id="lightgallery" lg-uid="lg0">
          <div
            class="image-box"
            v-for="(image, i) in this.result.gallery"
            :key="i"
          >
            <img
              :src="image.image"
              data-src="https://admin.ahujasons.com/product/BR01272228/1500/BR01272228_1.jpg"
            />
          </div>
        </div>
      </div>
      <div class="col-md-5 col-sm-12 content-section pdp__maininfo">
        <h1 class="page-title">{{ result.name }}</h1>
        <p class="masterSku">SKU: {{ result.sku }}</p>
        <div class="price">
          <p>
            <span class="price font-medium pr-2">{{
              result.selling_price
            }}</span>
            <span class="old-price">{{ result.price }}</span>
          </p>
          <p class="mrp-message">inclusive of all taxes</p>
        </div>
        <div class="size-container">
          <p class="mrp-message">SELECT SIZE</p>
          <div data-v-11788126="" class="size-box">
            <label data-v-11788126="" class="size select-one-size selected" v-for="(sizeitem,i) in this.sizeChart" :key="i">
              <input
                data-v-11788126=""
                type="radio"
                name="size"
                value="[object Object]"
              /><span data-v-11788126="">{{ sizeitem }}</span></label>
          </div>
        </div>
        <div class="add-to-cart-container">
          <div class="add-to-cart-btns fixed">
            <button
              type="button"
              id="product-addtocart-button"
              title="Add to cart"
              class="add-to-cart btn"
            >
              <i class="fa fa-shopping-basket"></i>
              Add to cart
            </button>
            <button
              type="button"
              id="buy-now"
              title="Wishlist"
              class="buy-now btn"
            >
              <i class="fa fa-heart-o"></i> WISHLIST
            </button>
          </div>
          <p
            class="font-medium"
            style="color: #02bb02; font-size: 12px; padding-top: 10px"
          >
            {{ result.stock_status }}
          </p>
        </div>
        <div class="check-delivery">
          <label>Delivery pin </label>
          <div class="control">
            <div class="pin-change-wrap">
              <input
                type="text"
                maxlength="6"
                placeholder="Check pincode"
                value=""
                class="input-text"
              />
            </div>
          </div>
        </div>
        <div class="other-info">
          <h3 class="font-medium">KNOW YOUR MAKEUP</h3>
          <p class="description mt-2 mb-3">
            {{ result.description }}
          </p>
          <div id="show_hide_product_attr_type" v-show="this.visibility">
            <ul>
              <li v-for="(item, i) in this.result.visible_attributes" :key="i">
                <span class="label font-medium">{{ item.label }}</span>
                <span data-th="Quantity" class="data">{{ item.value }}</span>
              </li>
            </ul>
          </div>
          <a class="show_more_attr" @click="changevisible()"
            ><span> {{ moreDetail ? "More" : "Less" }}</span> Details
            <i class="fa fa-angle-down"></i
          ></a>
          <!-- <a href="#" class="show_more_attr" 
            >Less Details <i class="fa fa-angle-up"></i
          ></a> -->
        </div>
      </div>
    </div>
    <vueSlickcarousel v-bind="slickOptions" v-if="this.result!=undefined">
    <div v-for="(item, index) in this.result.similar_products" :key="index" >
      <img :src="item.image"/>
    </div>
  </vueSlickcarousel>
  </div>
</template>
<script>
import axios from "axios";
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import vueSlickcarousel from 'vue-slick-carousel'
export default {
  components: {
    vueSlickcarousel
    },
  data() {
    return {
      sizeChart:null,
      result: [],
      itemurl: null,
      visibility: false,
      moreDetail: true,
      slickOptions: {
        dots:false,
        arrow:true,
        infinite:true,
        speed:3000,
        autoplay:true,
        slidesToShow: 4,
        slidesToScroll: 1
      }
    };
  },

  methods: {
    changevisible() {
      if (!this.visibility) {
        this.visibility = true;
        this.moreDetail = false;
      } else {
        this.visibility = false;
        this.moreDetail = true;
      }
    },
  },
  async fetch() {
    try {
      if (this.$route.params.Product != undefined) {
        this.itemurl = this.$route.params.Product;
        const response = await axios.get(
          "https://pim.wforwoman.com/pim/pimresponse.php",
          {
            params: {
              service: "product",
              store: 1,
              url_key: this.itemurl,
            },
          }
        );
        this.result = response.data.result;
        let regex =/(\d+)/g;
this.sizeChart=this.result.size.match(regex);
        console.log(this.$route.params.Product);
        console.log(this.result);
      }
    } catch (err) {
      console.error(err);
    }
  },
};
</script>
<style scoped>
.container-fluid {
  width: 100%;
  padding-right: 60px;
  padding-left: 60px;
  margin-right: auto;
  margin-left: auto;
}
.product-detail-container {
  padding: 2.7rem 20px;
  padding-top: 0 !important;
  min-height: 50vh;
}
.list-pages .row,
.product-detailmain .row {
  margin-right: 0;
  margin-left: 0;
}
.row {
  display: flex;
  flex-wrap: wrap;
}
.col-md-7 {
  flex: 0 0 58.333333%;
  max-width: 58.333333%;
}
.product-detail-container .image-box {
  overflow: hidden;
  width: calc(50% - 10px);
  margin: 5px;
  float: left;
}
.product-detail-container .image-box:hover img {
  transform: scale(1.09);
  transition: 0.5s all ease-in-out;
  cursor: zoom-in;
}
.product-detail-container .image-box img {
  width: 100%;
}
.content-section {
  width: 37%;
  padding: 0 25px;
}
.product-detail-container .page-title {
  margin-top: 0;
  margin-bottom: 5px;
  line-height: 1;
  font-family: jost-regular;
  font-weight: 300;
  padding: 10px 20px 15px 0;
  font-size: 22px;
}
.masterSku {
  font-size: 13px;
  padding: 10px 0;
}
.product-detail-container .price p {
  font-size: 35px;
  margin: 0;
}
p {
  margin-top: 0;
  margin-bottom: 1rem;
}
.price {
  padding-top: 4px;
}
.product-detail-container .price .old-price {
  color: #504f4f;
  text-decoration: line-through;
  -webkit-text-decoration-color: red;
  text-decoration-color: red;
  padding-right: 5px;
  font-size: 18px;
  font-family: jost-regular;
}
.product-detail-container .price .mrp-message {
  color: #000;
  font-size: 14px;
  display: block;
  margin: 0 10px 0 0;
  font-family: "Jost-medium";
}
.size-container{
  margin-top: 15px;
}
.size-box{
  margin-top: 15px;
}

 label {
    text-transform: uppercase;
    color: #000;
    font-size: 14px;
}
.size-box .size input {
    height: 0;
    width: 0;
    display: none;
}
input[type=checkbox], input[type=radio] {
    box-sizing: border-box;
    padding: 0;
}
.size-box .size {
    background: #fff;
    padding: 4px 12px;
    color: #000;
    min-width: 10px;
    display: inline-block;
    outline: none;
    border: 1px solid #000;
    text-align: center;
    font-size: 14px;
    margin-right: 3px;
    cursor: pointer;
}
.size-box .size:hover {
    border-color: #501337;
    color: #fff;
    background: #501337;
}
.product-detail-container .add-to-cart-container {
  clear: both;
  margin-top: 20px;
}
.add-to-cart-container .add-to-cart-btns .btn {
  background: #501337;
  font-family: "Jost-medium";
}
.add-to-cart-container .add-to-cart-btns .add-to-cart {
  width: 52%;
  max-width: 250px;
}
.add-to-cart-container .add-to-cart-btns .btn {
  padding: 10px;
  position: relative;
  color: #fff;
  margin-right: 10px;
  text-transform: uppercase;
  border-radius: 10px;
  font-size: 15px;
}
.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.add-to-cart-container .add-to-cart-btns .btn:hover {
  opacity: 0.9;
}
#product-addtocart-button .fa.fa-shopping-basket {
  font-size: 0;
  background-image: url(../static/Img/shopping-bag.svg);
  background-repeat: no-repeat;
  height: 21px;
  width: 22px;
  background-size: 17px;
  position: relative;
  display: inline-block;
  vertical-align: inherit;
  margin-top: -8px;
}
#product-addtocart-button .fa.fa-shopping-basket,
.size-chart-label a:after {
  background-repeat: no-repeat;
  background-position: 50%;
  filter: brightness(0) invert(1);
}
.add-to-cart-container .add-to-cart-btns #buy-now {
  background: #fff !important;
  font-family: Jost-medium;
  color: #000;
  border: 1px solid #c2c2c2;
}
.font-medium {
  font-family: Jost-medium;
}
.add-to-cart-container .add-to-cart-btns .buy-now {
  width: 40%;
  max-width: 160px;
}
.check-delivery {
  margin-top: 25px;
  border-top: 1px solid #eae8e8;
  padding-top: 22px;
}
.check-delivery label {
  font-size: 16px;
  text-transform: uppercase;
  font-family: "Jost-medium";
  color: #444;
}
.pin-change-wrap {
  width: 80%;
}
.pin-change-wrap {
  position: relative;
}
.check-delivery input.input-text {
  width: calc(100% - 72px);
  height: 40px;
  font-size: 14px;
  border: 1px solid #000;
  color: #333;
  border-radius: 0;
  outline: none;
  background: #fff;
  text-transform: uppercase;
  font-family: "Jost-medium";
  letter-spacing: 0.5px;
  padding: 0 15px;
}
.check-delivery input.input-text {
  font-size: 13px;
  border: 1px solid hsla(0, 0%, 60%, 0.6);
  padding: 0 9px;
  border-radius: 5px;
  width: 250px;
}
.supplierInfo {
  margin-top: 20px;
}
.supplierSection {
  position: relative;
  display: inline-block;
}
.supplierSection .supplierMain {
  cursor: pointer;
}
.supplierMain {
  width: -moz-fit-content;
  width: fit-content;
  padding: 0;
  color: #000;
  font-size: 14px;
  border-radius: 5px;
  float: left;
  margin-right: 20px;
}
.product-detail-container .filter-info,
.product-detail-container .other-info {
  margin-top: 15px;
  float: left;
  width: 100%;
  margin-bottom: 0;
}
.product-detail-container .filter-info h3,
.product-detail-container .other-info h3 {
  text-align: left;
  padding-right: 0;
  position: relative;
  color: #444;
  font-size: 15px;
  line-height: 1;
  margin-bottom: 0;
  font-family: Jost-medium;
  font-weight: 400;
  text-transform: uppercase;
}
.product-detail-container .description {
  font-size: 14px;
  letter-spacing: 0.25px;
  font-weight: 400;
  color: #757575;
  float: left;
  width: 100%;
  overflow: hidden;
}
#show_hide_product_attr_type {
  transition: all 0.5s;
  transform: scale(1);
  overflow: hidden;
  float: left;
  width: 100%;
}
.product-detail-container .filter-info ul,
.product-detail-container .other-info ul {
  padding-left: 0;
  margin-bottom: 0;
  margin-top: 15px;
  list-style: none;
}
.product-detail-container .filter-info ul li,
.product-detail-container .other-info ul li {
  list-style: none;
  vertical-align: top;
  margin-bottom: 15px;
  line-height: 15px;
  float: left;
  width: 40%;
  margin-right: 10%;
  position: relative;
  border-bottom: 0;
  padding: 0 0 5px;
}
.product-detail-container .filter-info ul li .label,
.product-detail-container .other-info ul li .label {
  float: left;
  width: 100%;
  text-align: left;
  padding-right: 0;
  position: relative;
  color: #444;
  font-size: 15px;
  line-height: 1;
  margin-bottom: 5px;
  font-family: "Jost-medium";
}
.product-detail-container .filter-info ul li .data,
.product-detail-container .other-info ul li .data {
  width: 65%;
  text-align: left;
  font-size: 14px;
}
.other-info a.show_more_attr {
  margin-top: -10px;
  margin-bottom: 0;
  font-size: 15px;
  display: block;
  color: #ee1010;
  clear: both;
  font-family: jost-regular;
  font-weight: 300;
  cursor: pointer;
}
.slick-slider .slick-next, .slick-slider .slick-prev {
    background-color: transparent;
    position: absolute;
    border: none;
    font-size: 0;
    background-image: url(../static/Img/smilir-slide-icon.svg);
    background-repeat: no-repeat;
    background-size: 40px;
    cursor: pointer;
    width: 50px;
    height: 50px;
}
</style>