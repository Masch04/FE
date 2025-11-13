import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Default from './layout/wrapper/index.vue'
import Toaster from "@meforma/vue-toaster"
import Auth from './layout/wrapper/auth.vue'
import Client from './layout/wrapper/client.vue'

// AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

// Sử dụng router và Toaster
app.use(router)
app.use(Toaster)

// Đăng ký layout toàn cục
app.component("default-layout", Default)
app.component("auth-layout", Auth)
app.component("client-layout", Client)

// Kích hoạt AOS với cấu hình mượt mà
AOS.init({
  duration: 800,        // Thời gian animation (ms)
  easing: 'ease-out-quart', // Hiệu ứng mượt
  once: true,           // Chỉ chạy 1 lần khi scroll vào
  offset: 100,          // Kích hoạt sớm hơn 100px
  anchorPlacement: 'top-bottom'
})

// Mount app
app.mount("#app")