<template>
  <div class="row-item">
    <div>{{ $t("videoPath") }}</div>
    <div>
      <n-input-group>
        <n-input
          style="width: 1.4rem"
          class="add-input-border"
          :placeholder="$t('localVideoPath')"
          v-model:value="state.fileText"
        />
        <n-button type="tertiary" @click="chooseFile" style="width: 0.6rem">{{
          $t("chooseFile")
        }}</n-button>
      </n-input-group>
    </div>
    <input
      type="file"
      accept="*.mp4"
      id="vedioFile"
      style="display: none"
      ref="vedioFile_dom"
    />
  </div>

  <div class="row-item">
    <span>{{ $t("width") }}</span>
    <div class="slider-box">
      <n-slider
        style="width: 1.2rem"
        v-model:value="state.horizontal"
        :step="1"
        :min="1"
        :max="60"
      />
      <n-input-number
        v-model:value="state.horizontal"
        class="slider-input-number"
        :update-value-on-input="false"
        :bordered="false"
        :show-button="false"
        :min="1"
        :max="60"
        placeholder=""
        size="small"
      />
    </div>
  </div>

  <div class="row-item">
    <span>{{ $t("height") }}</span>
    <div class="slider-box">
      <n-slider
        style="width: 1.2rem"
        v-model:value="state.vertical"
        :step="1"
        :min="1"
        :max="60"
      />
      <n-input-number
        v-model:value="state.vertical"
        class="slider-input-number"
        :update-value-on-input="false"
        :bordered="false"
        :show-button="false"
        :min="1"
        :max="60"
        placeholder=""
        size="small"
      />
    </div>
  </div>

  <div class="row-item">
    <span>{{ $t("distencePlace") }}</span>
    <div class="slider-box">
      <n-slider
        style="width: 1.2rem"
        v-model:value="state.distance"
        :step="1"
        :min="1"
        :max="500"
      />
      <n-input-number
        v-model:value="state.distance"
        class="slider-input-number"
        :update-value-on-input="false"
        :bordered="false"
        :show-button="false"
        :min="1"
        :max="500"
        placeholder=""
        size="small"
      />
    </div>
  </div>

  <div class="row-item">
    <span>{{ $t("MaxVisibleDistance") }}</span>
    <div class="slider-box">
      <n-slider
        style="width: 1.2rem"
        v-model:value="state.visibleDistanceMax"
        :step="1"
        :min="300"
        :max="2000"
      />
      <n-input-number
        v-model:value="state.visibleDistanceMax"
        class="slider-input-number"
        :update-value-on-input="false"
        :bordered="false"
        :show-button="false"
        :min="300"
        :max="2000"
        placeholder=""
        size="small"
      />
    </div>
  </div>

  <div class="row-item">
    <span>{{ $t("clipMode") }}</span>
    <n-radio-group
      v-model:value="state.clipMode"
      name="radiogroup"
      class="radio-group"
    >
      <n-radio
        v-for="item in state.modeOptions"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </n-radio>
    </n-radio-group>
  </div>

  <div class="row-item">
    <span>{{ $t("visibleVideoLine") }}</span>
    <div class="check-box">
      <n-checkbox v-model:checked="state.visibleLine"></n-checkbox>
    </div>
  </div>

  <div class="btn-row-item2">
    <n-button
      type="info"
      color="#3499E5"
      text-color="#fff"
      @click="startProjection"
      style="margin-right: 0.1rem"
      :title="$t('videoSet')"
      >{{ $t("videoSet") }}</n-button
    >
    <n-button
      type="info"
      color="#3499E5"
      text-color="#fff"
      @click="clipProjectImg"
      style="margin-right: 0.1rem"
      :title="$t('clip')"
      >{{ $t("clip") }}</n-button
    >
    <n-button
      class="btn-secondary"
      @click="clear"
      color="rgba(255, 255, 255, 0.65)"
      ghost
      :title="$t('clear')"
      >{{ $t("clear") }}</n-button
    >
  </div>

  <div id="videoContain" style="width: 0; height: 0">
    <video
      id="trailer-0"
      style="visibility: hidden"
      autoplay
      loop
      controls
      muted
      multiple
    >
      <source src="" type="video/mp4" />
    </video>
  </div>
</template>

<script lang="ts" setup>
// 引入依赖
import { watch, ref, reactive, onBeforeUnmount, onMounted } from "vue";
import tool from "@/tools/tool";
import DrawHandler from "@/lib/DrawHandler";

const drawHandler = new DrawHandler(viewer,{ openMouseTip:false });

type stateType = {
  horizontal: number;
  vertical: number;
  distance: number;
  clipMode: string;
  visibleLine: boolean;
  fileText: string;
  modeOptions: any;
  visibleDistanceMax: number;
};
// 设置默认值数据
let state = reactive<stateType>({
  horizontal: 20,
  vertical: 10,
  distance: 200,
  clipMode: "clip_behind_all_plane",
  visibleLine: true,
  fileText: "",
  modeOptions: [
    {
      label: $t("inner"),
      value: "clip_behind_all_plane",
    },
    {
      label: $t("outer"),
      value: "clip_behind_any_plane",
    },
  ],
  visibleDistanceMax: 500,
});

// 初始化变量
let vedioFile_dom = ref();
let modelIdProjectPairs = new Map(); // 模型id和视频投放对象对象的键值对
let reader = new FileReader();

let modelUrl = "./Resource/model/projector.s3m";
let currentSelectedSymbol: any = null;
let isActive = false;
let isClip = false;
let currntVideoDom;
let layers, scene, currentProject, s3mInstanceColc;

// 初始化
function init() {
  scene = viewer.scene;
  layers = viewer.scene.layers.layerQueue;
  s3mInstanceColc = new SuperMap3D.S3MInstanceCollection(scene._context);
  viewer.scene.primitives.add(s3mInstanceColc);
}

onMounted(() => {
  init();
  fileChange();
  currntVideoDom = document.getElementById("trailer-0");
});

onBeforeUnmount(() => {});

// 点击选择文件函数
function chooseFile() {
  vedioFile_dom.value.click();
}

// 文件夹改变文件触发
function fileChange() {
  vedioFile_dom.value.addEventListener("change", (evt) => {
    let file = evt.target.files[0];
    if (!file) return;
    state.fileText = vedioFile_dom.value.value;
    const aBlob = new Blob([file], { type: "video/mp4" });
    reader.readAsDataURL(aBlob);
    reader.onload = function (e: any) {
      let vedio = e.target.result;
      let index = document.querySelectorAll("#videoContain>video").length;
      creatVideo_dom(vedio, index).then((res) => {
        currntVideoDom = document.getElementById("trailer-" + index);
      });
    };
  });
}

// 创建Video-html元素
function creatVideo_dom(src, index) {
  return new Promise((resolve, reject) => {
    let videoContain: any = document.getElementById("videoContain");
    let video = document.createElement("video");
    let source = document.createElement("source");
    source.src = src;
    video.appendChild(source);
    video.id = "trailer-" + index;
    video.classList.add("videoBox");
    video.setAttribute("autoplay", "autoplay");
    video.setAttribute("loop", "loop");
    video.setAttribute("crossorigin", "crossorigin");
    video.setAttribute("controls", "controls");
    video.setAttribute("muted", "muted");
    videoContain.appendChild(video);
    setTimeout(() => {
      resolve(video);
    }, 500);
  });
}

// 视频投放
function startProjection() {
  if (state.fileText === "") {
    window["$message"].warning($t("localVideoPath"));
    return;
  }

  if (currentProject) {
    window["$message"].warning($t("deleteVideo"));
    return;
  }

  tool.setMouseCursor("measureCur");
  let viewPosition = viewer.scene.camera.position;
  currntVideoDom.play();
  currentProject = new SuperMap3D.ProjectionImage(scene);
  currentProject.setImage({ video: currntVideoDom });
  currentProject.distance = Number(state.distance);
  currentProject.horizontalFov = Number(state.horizontal);
  currentProject.verticalFov = Number(state.vertical);
  currentProject.viewPosition = window.iEarthTool.Cartesian3ToDegreeArray(viewPosition);
  currentProject.visibleDistanceMax = state.visibleDistanceMax;
  currentProject.build();
  isActive = true;
  viewer.eventManager.addEventListener("MOUSE_MOVE", move_set_target);
  viewer.eventManager.addEventListener("CLICK", click_set_target, true);
}

// 点击事件
function click_set_target(e) {
  if (isClip) return;
  if (isActive) {
    tool.setMouseCursor("normal");
    let Cartesian3 = SuperMap3D.Cartesian3.fromDegrees(
      currentProject.viewPosition[0],
      currentProject.viewPosition[1],
      currentProject.viewPosition[2]
    );
    let viewPosition = JSON.parse(JSON.stringify(Cartesian3));
    viewer.eventManager.removeEventListener("MOUSE_MOVE", move_set_target);
    addModel(viewPosition);
    isActive = false;
    return;
  }
}

// 鼠标移动事件
function move_set_target(e) {
  let distance = 0;
  let viewPosition = viewer.scene.camera.position;
  let targetPosition = scene.pickPosition(e.message.endPosition);
  if (targetPosition)
    distance = SuperMap3D.Cartesian3.distance(viewPosition, targetPosition);
  if (distance > 0 && distance < 1000)
    currentProject.setDistDirByPoint(window.iEarthTool.Cartesian3ToDegreeArray(targetPosition));
}

// 添加模型
function addModel(position: any, position2?: any) {
  let id = "projector-" + new Date().getTime();
  let direction = currentProject.direction;
  let pitch = currentProject.pitch;
  let radians = SuperMap3D.Math.toRadians(direction);
  let heading =
    radians >= SuperMap3D.Math.PI
      ? radians - SuperMap3D.Math.PI
      : radians + SuperMap3D.Math.PI;
  let pitch2 = -SuperMap3D.Math.toRadians(pitch);
  s3mInstanceColc.add(modelUrl, {
    id: id,
    position: position,
    hpr: {
      heading: heading,
      pitch: 0,
      roll: pitch2,
    },
    scale: new SuperMap3D.Cartesian3(2, 2, 2),
    // offset: new SuperMap3D.Cartesian3(0, 0, 0.1)
  });
  currentSelectedSymbol = s3mInstanceColc.getInstance(modelUrl, id);
  modelIdProjectPairs.set(id, currentProject);
}

// 裁剪
async function clipProjectImg() {
  isClip = true;
  const positions = await drawHandler.startPolygon();
  isClip = false;
  let positionList: any = [];
  for (let i = 0; i < positions.length; i++) {
    let position: any[] = window.iEarthTool.Cartesian3ToDegreeArray(positions[i]);
    positionList.push(position[0]);
    positionList.push(position[1]);
    positionList.push(position[2]);
  }

  updateClipImg(positionList);

}

function updateClipImg(position) {
  if (!currentProject) return;
  currentProject.addClipRegion({
    name: "clip-Projector" + new Date().getTime(),
    position: position,
  });
}

// 清除
function clear() {
  viewer.eventManager.removeEventListener("MOUSE_MOVE", move_set_target);
  drawHandler.destroy();

  if (currentSelectedSymbol) {
    modelIdProjectPairs.delete(currentSelectedSymbol.id);
    s3mInstanceColc.removeInstance(modelUrl, currentSelectedSymbol.id);
    currentSelectedSymbol = null;
  }
  if (currentProject) {
    currentProject.removeAllClipRegion();
    currentProject.destroy();
  }
  if (modelIdProjectPairs.size === 0)
    viewer.eventManager.removeEventListener("CLICK", click_set_target);

  currentProject = null;
  tool.setMouseCursor("normal");
}

// 监听
watch(
  () => state.fileText,
  (val) => {
    if (val.indexOf("http") === -1) return;
    let index = document.querySelectorAll("#videoContain>video").length;
    creatVideo_dom(val, index).then((res) => {
      currntVideoDom = document.getElementById("trailer-" + index);
    });
  }
);
watch(
  () => state.horizontal,
  (val) => {
    if (!currentProject) return;
    currentProject.horizontalFov = Number(val);
  }
);
watch(
  () => state.vertical,
  (val) => {
    if (!currentProject) return;
    currentProject.verticalFov = Number(val);
  }
);
watch(
  () => state.distance,
  (val) => {
    if (!currentProject) return;
    currentProject.distance = Number(val);
  }
);
watch(
  () => state.visibleDistanceMax,
  (val) => {
    if (!currentProject) return;
    currentProject.visibleDistanceMax = Number(val);
  }
);
watch(
  () => state.visibleLine,
  (val) => {
    if (!currentProject) return;
    s3mInstanceColc.visible = val; //隐藏所有模型
    modelIdProjectPairs.forEach((projector) => {
      //隐藏所有投放线
      projector.hintLineVisible = val;
    });
  }
);
watch(
  () => state.clipMode,
  (val) => {
    if (!currentProject) return;
    let clipMode =
      val === "clip_behind_any_plane"
        ? SuperMap3D.ModifyRegionMode.CLIP_INSIDE
        : SuperMap3D.ModifyRegionMode.CLIP_OUTSIDE;
    currentProject.setClipMode(clipMode);
  }
);
</script>
