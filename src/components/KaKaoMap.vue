<template>
  <div class="space-y-4">
    <!-- 지도 영역 -->
    <div ref="mapRef" class="w-full h-[400px] rounded-lg border shadow"></div>

    <!-- 시 선택 -->
    <div>
      <label class="block font-semibold mb-1">시/도 선택</label>
      <select
        v-model="region.city"
        @change="onCityChange"
        class="w-full border rounded px-3 py-2"
      >
        <option value="">선택하세요</option>
        <option
          v-for="city in Object.keys(cityDistrictMap)"
          :key="city"
          :value="city"
        >
          {{ city }}
        </option>
      </select>
    </div>

    <!-- 구 선택 -->
    <div v-if="region.city">
      <label class="block font-semibold mb-1">구/군 선택</label>
      <select
        v-model="region.district"
        @change="moveToSelectedRegion"
        class="w-full border rounded px-3 py-2"
      >
        <option value="">선택하세요</option>
        <option
          v-for="district in cityDistrictMap[region.city]"
          :key="district"
          :value="district"
        >
          {{ district }}
        </option>
      </select>
    </div>

    <!-- 선택 결과 -->
    <div class="text-xl text-gray-800">
      <span class="font-semibold">선택 지역:</span>
      <span class="ml-2 text-blue-600"
        >{{ region.city || "-" }} {{ region.district || "" }}</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { koreaLocations } from "@/data.mjs";

const mapRef = ref(null);
const map = ref(null);
const marker = ref(null);

const region = reactive({ city: "", district: "" });

const cityDistrictMap = koreaLocations;

function onCityChange() {
  region.district = "";
}

function moveToSelectedRegion() {
  if (!region.city || !region.district) return;

  const geocoder = new window.kakao.maps.services.Geocoder();
  const fullAddress = `${region.city} ${region.district}`;

  geocoder.addressSearch(fullAddress, (result, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const coord = new window.kakao.maps.LatLng(result[0].y, result[0].x);
      map.value.setCenter(coord);
      map.value.setLevel(3); // 확대

      if (!marker.value) {
        marker.value = new window.kakao.maps.Marker({ position: coord });
        marker.value.setMap(map.value);
      } else {
        marker.value.setPosition(coord);
      }
    }
  });
}

function loadMap() {
  const container = mapRef.value;
  const options = {
    center: new window.kakao.maps.LatLng(37.5665, 126.978),
    level: 5,
  };

  map.value = new window.kakao.maps.Map(container, options);
}

function loadScript() {
  const script = document.createElement("script");
  script.src =
    "//dapi.kakao.com/v2/maps/sdk.js?appkey=6b2f7979935eb728d9e8eb43689b47f4&autoload=false&libraries=services";
  script.onload = () => window.kakao.maps.load(loadMap);
  document.head.appendChild(script);
}

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    loadMap();
  } else {
    loadScript();
  }
});

defineExpose({ region });
</script>
