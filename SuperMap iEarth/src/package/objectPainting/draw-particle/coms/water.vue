<template>
  <!-- <n-checkbox
    v-model:checked="state.showEditCheck"
    style="margin-left: 1.2rem; margin-bottom: 0.1rem"
  >
    {{ $t("displayEdit") }}
  </n-checkbox> -->

  <!-- <div class="row-item" v-show="state.showEditCheck"> -->
  <div class="row-item">
    <span>{{ $t("parameterSet") }}</span>
    <div style="width: 1.96rem">
      <n-switch v-model:value="state.setParam" size="small" />
    </div>
  </div>

  <!-- 参数设置 -->
  <div v-show="state.setParam">
    <div class="row-item">
      <span>{{ $t("emitType") }}</span>
      <n-select style="width: 1.96rem; height: 32px" v-model:value="state.selectedType" :options="state.optionMode" />
    </div>

    <div class="row-item">
      <span>{{ $t("particleNumber") }}</span>
      <div class="slider-box">
        <n-slider v-model:value="state.emitRate" style="width: 70%" :min="1" :max="2500" :step="10" />
        <n-input-number v-model:value="state.emitRate" class="slider-input-number" :update-value-on-input="false"
          :bordered="false" :show-button="false" :min="1" :max="2500" placeholder="" size="small" />
      </div>
    </div>

    <div class="row-item">
      <span>{{ $t("particleSize") }}</span>
      <div class="slider-box">
        <n-slider v-model:value="state.particleSize" style="width: 70%" :min="1" :max="60" :step="1" />
        <n-input-number v-model:value="state.particleSize" class="slider-input-number" :update-value-on-input="false"
          :bordered="false" :show-button="false" :min="1" :max="60" placeholder="" size="small" />
      </div>
    </div>

    <div class="row-item">
      <span>{{ $t("lifeCycle") }}</span>
      <div class="slider-box">
        <n-input-number v-model:value="state.lifeRange[0]" class="slider-input-number" :update-value-on-input="false"
          :bordered="false" :show-button="false" :min="0.1" :max="30" placeholder="" size="small" />
        <n-slider style="width: 1.5rem" v-model:value="state.lifeRange" range :step="1" :min="0.1" :max="30" />
        <n-input-number v-model:value="state.lifeRange[1]" class="slider-input-number" :update-value-on-input="false"
          :bordered="false" :show-button="false" :min="0.1" :max="30" placeholder="" size="small" />
      </div>
    </div>

    <div class="row-item">
      <span>{{ $t("speedRange") }}</span>
      <div class="slider-box">
        <n-input-number v-model:value="state.speedRange[0]" class="slider-input-number" :update-value-on-input="false"
          :bordered="false" :show-button="false" :min="1" :max="30" placeholder="" size="small" />
        <n-slider style="width: 1.5rem" v-model:value="state.speedRange" range :step="1" :min="1" :max="30" />
        <n-input-number v-model:value="state.speedRange[1]" class="slider-input-number" :update-value-on-input="false"
          :bordered="false" :show-button="false" :min="1" :max="30" placeholder="" size="small" />
      </div>
    </div>

    <div class="row-item">
      <span>{{ $t("scaleRange") }}</span>
      <div class="slider-box">
        <n-input-number v-model:value="state.scaleRange[0]" class="slider-input-number" :update-value-on-input="false"
          :bordered="false" :show-button="false" :min="1" :max="10" placeholder="" size="small" />
        <n-slider style="width: 1.5rem" v-model:value="state.scaleRange" range :step="1" :min="1" :max="10" />
        <n-input-number v-model:value="state.scaleRange[1]" class="slider-input-number" :update-value-on-input="false"
          :bordered="false" :show-button="false" :min="1" :max="10" placeholder="" size="small" />
      </div>
    </div>

    <div class="row-item">
      <span>{{ $t("gravity") }}</span>
      <div class="slider-box">
        <n-slider style="width: 1.5rem" v-model:value="state.gravity" :step="1" :min="-20" :max="20" />
        <n-input-number v-model:value="state.gravity" class="slider-input-number" :update-value-on-input="false"
          :bordered="false" :show-button="false" :min="-20" :max="20" placeholder="" size="small" />
      </div>
    </div>
  </div>

  <div class="btn-row-item">
    <n-button type="info" color="#3499E5" text-color="#fff" @click="add" style="margin-right: 0.1rem">{{ $t("add") }}
    </n-button>
    <n-button class="btn-secondary" @click="clear">{{ $t("clear") }}</n-button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, onBeforeUnmount, watch } from "vue";
import DrawHandler from "@/lib/DrawHandler";

const scene = viewer.scene;

// 初始化变量
let state = reactive({
  selectedType: "Cone",
  selectedId: 0,
  showEditCheck: true,
  setParam: false,
  emitRate: 1500,
  particleSize: 1,
  lifeRange: [5, 15],
  speedRange: [2, 8],
  scaleRange: [1, 4],
  gravity: -8.0,
  optionMode: [
    {
      label: () => $t("coneEmit"),
      value: "Cone",
    },
    {
      label: () => $t("sphereEmit"),
      value: "Sphere",
    },
    {
      label: () => $t("boxEmit"),
      value: "Box",
    },
  ],
});

let waterUrl: string = "./Resource/particle/fountain.json";
let particle_water;
let modelMatrix = new SuperMap3D.Matrix4();
const drawHandler = new DrawHandler(viewer, { openMouseTip: false });

function init() {
  if (window.iEarthBindData['Particle'] && window.iEarthBindData['Particle']["water"]) {
    particle_water = window.iEarthBindData['Particle']["water"];
  }
  if (window.iEarthBindData['ParticleOptions']["water"]) {
    let option = window.iEarthBindData['ParticleOptions']["water"]["particleAttr"];
    if (option) switchCase(option);
  }
}

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  clear(false);
});

// 加载粒子文件
function loadParticleFile(url, option?: any) {
  SuperMap3D.ParticleHelper.fromJsonUrl(url, scene).then(function (
    particleSystem
  ) {
    particle_water = particleSystem;
    particle_water.modelMatrix = modelMatrix;
    // scene.primitives.add(particle_water); // 注释避免报错
    // particle_water.start(); // json - preventAutoStart:true

    // 设置参数
    if (option) {
      for (let key in option) {
        switch (key) {
          case "emitRate":
            particle_water["emitRate"] = Number(option[key]);
            break;
          case "minLifeTime":
            particle_water["minLifeTime"] = Number(option[key]);
            break;
          case "maxLifeTime":
            particle_water["maxLifeTime"] = Number(option[key]);
            break;
          case "minEmitPower":
            particle_water["minEmitPower"] = Number(option[key]);
            break;
          case "maxEmitPower":
            particle_water["maxEmitPower"] = Number(option[key]);
            break;
          case "minSize":
            particle_water["minSize"] = Number(option[key]);
            break;
          case "maxSize":
            particle_water["maxSize"] = Number(option[key]);
            break;
          case "minScaleX":
            particle_water["minScaleX"] = Number(option[key]);
            break;
          case "minScaleY":
            particle_water["minScaleY"] = Number(option[key]);
            break;
          case "maxScaleX":
            particle_water["maxScaleX"] = Number(option[key]);
            break;
          case "maxScaleY":
            particle_water["maxScaleY"] = Number(option[key]);
            break;
          case "gravity":
            particle_water.gravity = new SuperMap3D.Cartesian3(
              0,
              0,
              Number(option[key])
            );
            break;
          default:
            break;
        }
      }
    }
  });
}

// 添加粒子
async function add() {
  clear();
  drawHandler.clear();
  const position = await drawHandler.startPoint();
  if (!position || !(position instanceof SuperMap3D.Cartesian3)) return;
  const centerPosition = position;
  SuperMap3D.Transforms.eastNorthUpToFixedFrame(
    centerPosition,
    undefined,
    modelMatrix
  );
  loadParticleFile(waterUrl);
  window.iEarthBindData['ParticleOptions']["water"] = {
    particleUrl: waterUrl,
    particlePosition: centerPosition,
    particleAttr: {},
  };
}

// 设置初始参数
function switchCase(option: any) {
  for (let key in option) {
    switch (key) {
      case "selectedType":
        state.selectedType = option[key];
        break;
      case "emitRate":
        state.emitRate = Number(option[key]);
        break;
      case "minScaleX":
        state.particleSize = Number(option[key]);
        break;
      case "minScaleY":
        state.particleSize = Number(option[key]);
        break;
      case "maxScaleX":
        state.particleSize = Number(option[key]);
        break;
      case "maxScaleY":
        state.particleSize = Number(option[key]);
        break;
      case "minLifeTime":
        state.lifeRange[0] = Number(option[key]);
        break;
      case "maxLifeTime":
        state.lifeRange[1] = Number(option[key]);
        break;
      case "minEmitPower":
        state.speedRange[0] = Number(option[key]);
        break;
      case "maxEmitPower":
        state.speedRange[1] = Number(option[key]);
        break;
      case "minSize":
        state.scaleRange[0] = Number(option[key]);
        break;
      case "maxSize":
        state.scaleRange[1] = Number(option[key]);
        break;
      case "gravity":
        state.gravity = Number(option[key]);
        break;
      default:
        break;
    }
  }
}

// 清除
function clear(flag = true) {
  if (!SuperMap3D.defaultValue(particle_water)) return;
  scene.primitives.remove(particle_water);
  if (flag) window.iEarthBindData['ParticleOptions']["water"] = null;
  // particle_water.clearAll();
  // clickHandle.distory();
  // scene.primitives.removeAll();
}

// 监听
watch(
  () => state.selectedType,
  (val) => {
    if (!particle_water) return;
    switch (val) {
      case "Cone":
        particle_water.createConeEmitter(1.0, 1.05);
        break;
      case "Sphere":
        particle_water.createSphereEmitter(1.0);
        break;
      case "Box":
        var direction1 = new SuperMap3D.Cartesian3(-1, 1, 1);
        var direction2 = new SuperMap3D.Cartesian3(1, 1, -1);
        var minBox = new SuperMap3D.Cartesian3(-10, 0, -10);
        var maxBox = new SuperMap3D.Cartesian3(10, 0, 10);
        particle_water.createBoxEmitter(direction1, direction2, minBox, maxBox);
        break;
    }
    window.iEarthBindData['ParticleOptions']["water"]["particleAttr"]["emitType"] = val;
  }
);
watch(
  () => state.emitRate,
  (val) => {
    if (!particle_water) return;
    particle_water["emitRate"] = Number(val);
    window.iEarthBindData['ParticleOptions']["water"]["particleAttr"]["emitRate"] =
      Number(val);
  }
);
watch(
  () => state.particleSize,
  (val) => {
    if (!particle_water) return;
    particle_water.minScaleX = Number(val);
    particle_water.minScaleY = Number(val);
    particle_water.maxScaleX = Number(val);
    particle_water.maxScaleY = Number(val);
    window.iEarthBindData['ParticleOptions']["water"]["particleAttr"]["minScaleX"] =
      Number(val);
    window.iEarthBindData['ParticleOptions']["water"]["particleAttr"]["minScaleY"] =
      Number(val);
    window.iEarthBindData['ParticleOptions']["water"]["particleAttr"]["maxScaleX"] =
      Number(val);
    window.iEarthBindData['ParticleOptions']["water"]["particleAttr"]["maxScaleY"] =
      Number(val);
  }
);
watch(
  () => state.lifeRange,
  (val) => {
    if (!particle_water) return;
    if (val.length > 1) {
      particle_water["minLifeTime"] = Number(val[0]);
      particle_water["maxLifeTime"] = Number(val[1]);
      window.iEarthBindData['ParticleOptions']["water"]["particleAttr"]["minLifeTime"] =
        Number(val[0]);
      window.iEarthBindData['ParticleOptions']["water"]["particleAttr"]["maxLifeTime"] =
        Number(val[1]);
    }
  }
);
watch(
  () => state.speedRange,
  (val) => {
    if (!particle_water) return;
    if (val.length > 1) {
      particle_water["minEmitPower"] = Number(val[0]);
      particle_water["maxEmitPower"] = Number(val[1]);
      window.iEarthBindData['ParticleOptions']["water"]["particleAttr"]["minEmitPower"] =
        Number(val[0]);
      window.iEarthBindData['ParticleOptions']["water"]["particleAttr"]["maxEmitPower"] =
        Number(val[1]);
    }
  }
);
watch(
  () => state.scaleRange,
  (val) => {
    if (!particle_water) return;
    if (val.length > 1) {
      particle_water["minSize"] = Number(val[0]);
      particle_water["maxSize"] = Number(val[1]);
      window.iEarthBindData['ParticleOptions']["water"]["particleAttr"]["minSize"] = Number(
        val[0]
      );
      window.iEarthBindData['ParticleOptions']["water"]["particleAttr"]["maxSize"] = Number(
        val[1]
      );
    }
  }
);
watch(
  () => state.gravity,
  (val) => {
    if (!particle_water) return;
    particle_water.gravity = new SuperMap3D.Cartesian3(0, 0, Number(val));
    window.iEarthBindData['ParticleOptions']["water"]["particleAttr"]["gravity"] =
      Number(val);
  }
);
</script>

<style lang="scss" scoped>
.slider-input-number {
  margin: 0px -0.1rem 0px 0px;
}
</style>
