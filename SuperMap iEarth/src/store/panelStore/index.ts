import { defineStore } from 'pinia'

export const usePanelStore = defineStore({
    id: 'usePanelStore',
    state: (): any => ({
        addDataPanel: "layer-service-box", // 添加数据弹窗
        analyse3dPanel: "analyse3d-ts-box", // 三维分析弹窗
        panelList: {
            leftToolBarList: [
                {
                    id: 1,
                    iconName: "icontuceng",
                    title: "t_layerList",
                    isSelected: false,
                    panelName: "LayerList"
                },
                {
                    id: 2,
                    iconName: "icontianjia",
                    title: "t_addData",
                    isSelected: false,
                    panelName: "AddLayerData"
                },
            ],
            rightToolBarList: [
                {
                    id: 3,
                    iconName: "iconsanweifenxi",
                    title: "analyseSeries",
                    isSelected: false,
                    panelName: "Analyse3D"
                },
                {
                    id: 4,
                    iconName: "iconliangsuan",
                    title: "measure",
                    isSelected: false,
                    panelName: "Measure"
                },
                {
                    id: 5,
                    iconName: "iconkapianshi",
                    title: "sceneProperties",
                    isSelected: false,
                    panelName: "SceneSet"
                },
                {
                    id: 6,
                    iconName: "iconduixianghuizhi",
                    title: "objectPainting",
                    isSelected: false,
                    panelName: "ObjectPainting"
                },
                {
                    id: 7,
                    iconName: "iconhuizhi",
                    title: "layerOpration",
                    isSelected: false,
                    panelName: "layerOpration"
                },
                {
                    id: 8,
                    iconName: "iconhuizhi",
                    title: "layerAttribute",
                    isSelected: false,
                    panelName: "layerAttr"
                },
                {
                    id: 9,
                    iconName: "iconhuizhi",
                    title: "layerStyle",
                    isSelected: false,
                    panelName: "layerStyle"
                },
                {
                    id: 10,
                    iconName: "iconhuizhi",
                    title: "layerQuery",
                    isSelected: false,
                    panelName: "layerQuery"
                },
                {
                    id: 11,
                    iconName: "iconhuizhi",
                    title: "mapQuery",
                    isSelected: false,
                    panelName: "mapQuery"
                },
                {
                    id: 12,
                    iconName: "iconhuizhi",
                    title: "qxSingle",
                    isSelected: false,
                    panelName: "qxSingle"
                },
                {
                    id: 13,
                    iconName: "iconhuizhi",
                    title: "qxCover",
                    isSelected: false,
                    panelName: "qxCover"
                },
            ]
        },
        rightTooPanel: false,
        leftTooPanel: false,
        showSceneModal: false,
        showSavePanel: false, // 保存面板是否显示
        isEditMode: false, // iportal中用来控制保存面板的与showSavePanel搭配使用，以便适应不同环境
        // isViewer:false, // Cesium.Viewer这个东西初始化完成的标志
        myDataPanleShow: false,// 我的数据面板
        queryData: [],// 通过我的数据查询到的要素记录
        isFold:false, // 面板是否处于折叠状态
    }),
    getters: {
    },
    actions: {
        // 设置左侧导航栏
        setLeftToolBarList(iconItem: any) {
            this.leftTooPanel = true;
            this.panelList.leftToolBarList.map((item) => {
                if (item.id == iconItem.id) {
                    item.isSelected = true;
                } else {
                    item.isSelected = false;
                }
            })
        },
        // 设置右侧导航栏
        setRightToolBarList(iconItem: any) {
            // 每次切换，先将所有面板关闭
            this.panelList.rightToolBarList.map((item: any) => {
                item.isSelected = false;
            })

            // 确保所有面板能全部刷新
            setTimeout(() => {
                this.isFold = false; // 取消面板的折叠状态
                this.rightTooPanel = true;
                this.panelList.rightToolBarList.map((item: any) => {
                    if (item.id == iconItem.id) {
                        item.isSelected = true;
                    } else {
                        item.isSelected = false;
                    }
                })
            }, 10)
        },
        // 关闭弹窗面板
        closeRightToolPanel(leftOrRght: any) {
            if (leftOrRght == 1) {
                this.leftTooPanel = false;
                this.panelList.leftToolBarList.map((item) => {
                    item.isSelected = false;
                })
            } else {
                this.rightTooPanel = false;
                this.panelList.rightToolBarList.map((item) => {
                    item.isSelected = false;
                })
            }
        },
        // 设置保存场景弹窗
        setSceneModal(isShow: Boolean) {
            this.showSceneModal = isShow;
        }
    }
})