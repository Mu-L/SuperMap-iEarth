<template>
    <!-- 长方体 -->
    <div class="row-item">
        <span>长度</span>
        <div class="slider-box" style="width: 1.96rem;height: 32px;">
            <n-slider style="width: 1.5rem" v-model:value="state.boxLength" :step="1" :min="10" :max="100" />
            <span>{{ state.boxLength }}</span>
        </div>
    </div>

    <div class="row-item">
        <span>宽度</span>
        <div class="slider-box" style="width: 1.96rem;height: 32px;">
            <n-slider style="width: 1.5rem" v-model:value="state.boxWidth" :step="1" :min="10" :max="200" />
            <span>{{ state.boxWidth }}</span>
        </div>
    </div>

    <div class="row-item">
        <span>高度</span>
        <div class="slider-box" style="width: 1.96rem;height: 32px;">
            <n-slider style="width: 1.5rem" v-model:value="state.boxHeight" :step="10" :min="10" :max="100" />
            <span>{{ state.boxHeight }}</span>
        </div>
    </div>

    <div class="row-item">
        <span>颜色</span>
        <div class="color-pick-box row-content" style="width: 1.96rem;height: 32px;">
            <n-color-picker v-model:value="state.geometryMaterial" :render-label="() => {
                return '';
            }
                " size="small"></n-color-picker>
        </div>
    </div>
    <div class="row-item">
        <span>绘制模式</span>
        <n-select style="width: 1.96rem;height: 32px;" v-model:value="state.displayMode" size="small"
            :options="state.optionsMode" />
    </div>

    <div class="btn-row-item">
        <n-button type="info" color="#3499E5" text-color="#fff" @click="add" style="margin-right: 0.1rem">绘制</n-button>
        <n-button class="btn-secondary" @click="clear">清除</n-button>
    </div>
</template>
    
<script lang="ts" setup>
import { reactive, onBeforeUnmount, watch } from "vue";

type stateType = {
    boxLength: number, // 长度
    boxWidth: number, // 宽度
    boxHeight: number, // 高度
    geometryMaterial: string, // 颜色
    displayMode: string,// 显示模式
    optionsMode:any,// 显示模式选项
}
// 初始化数据
let state = reactive<stateType>({
    // 长方体
    boxLength: 20,
    boxWidth: 20,
    boxHeight: 20,
    geometryMaterial: 'rgba(255,255,255, 1)',
    displayMode: "Fill",
    optionsMode: [
        {
            label: () => '填充模式',
            value: "Fill",
        },
        {
            label: () => '线框模式',
            value: "Outline",
        }
    ],

});

let boxEntity;
let entities = viewer.entities;

var handlerPoint_box = new SuperMap3D.DrawHandler(viewer, SuperMap3D.DrawMode.Point);
//注册绘制长方体事件
handlerPoint_box.drawEvt.addEventListener(function (res) {
    var point = res.object;
    var position = point.position;
    var color = SuperMap3D.Color.fromRandom({ alpha: 1.0 });
    boxEntity = entities.add({
        position: position,
        box: {
            dimensions: new SuperMap3D.Cartesian3(20.0, 20.0, 20.0),
            material: color,
            fill: true,
            outline: false,
            outlineColor: SuperMap3D.Color.BLACK,
            outlineWidth: 1
        }
    });
});

// 场景中拾取获得选中entity
var targetEntity: any = null;
var handler = new SuperMap3D.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function (e) {
    var pickedObject = viewer.scene.pick(e.position);
    if (SuperMap3D.defined(pickedObject) && (pickedObject.id instanceof SuperMap3D.Entity)) {
        targetEntity = pickedObject.id;
    } else {
        targetEntity = null;
    }
}, SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);

// 关闭
function deactiveAll() {
    handlerPoint_box.deactivate();
}

// 添加entity
function add() {
    deactiveAll();
    handlerPoint_box.activate();
}
// 清除
function clear() {
    deactiveAll();
    viewer.entities.removeAll();
}

watch(
    () => state.geometryMaterial,
    (val) => {
        if (targetEntity) {
            targetEntity.box['material'] = SuperMap3D.Color.fromCssColorString(val);
        }
    }
);
watch(
    () => state.displayMode,
    (val) => {
        if (targetEntity) {
            if (val === 'Fill') {
                targetEntity.box.fill = true;
                targetEntity.box.outline = false;
            } else {
                targetEntity.box.fill = false;
                targetEntity.box.outline = true;
            }
        }
    }
);


onBeforeUnmount(() => {
    clear();
});


</script>
    
    
<style lang="scss" scoped>
:deep(.n-slider-handle){
  background-color: #414141 !important;
  border: 1.5px solid #3499E5 !important;
}
</style>
    
    
    
    
    
    