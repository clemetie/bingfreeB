import "./assets/main.css";
import "./assets/styles/main.scss";
import "aos/dist/aos.css";

import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import AOS from "aos";
import "aos/dist/aos.css";

// font-awesome과 관련된 import를 정의
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faUserSecret);

const app = createApp(App);

app.directive("title", {
  mounted(el, binding) {
    document.title = binding.value;
  },
});

// 위에 createApp을 통해 생성한 Vue Application 인스턴스의 component API 활용
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount("#app");
// aos  관련
// AOS 초기화
AOS.init();
