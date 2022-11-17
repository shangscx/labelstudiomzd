import React from "react";
import { Checkbox, Modal, Table, Tabs } from "antd";
import { observer } from "mobx-react";

import { Hotkey } from "../../core/Hotkey";

import "./Settings.styl";
import { Block, Elem } from "../../utils/bem";
import { triggerResizeEvent } from "../../utils/utilities";

const HotkeysDescription = () => {
  const columns = [
    { title: "键", dataIndex: "combo", key: "combo" },
    { title: "描述", dataIndex: "descr", key: "descr" },
  ];

  const keyNamespaces = Hotkey.namespaces();

  const getData = (descr) => Object.keys(descr)
    .filter(k => descr[k])
    .map(k => ({
      key: k,
      combo: k.split(",").map(keyGroup => {
        return (
          <Elem name="key-group" key={keyGroup}>
            {keyGroup.trim().split("+").map((k) => <Elem tag="kbd" name="key" key={k}>{k}</Elem>)}
          </Elem>
        );
      }),
      descr: descr[k],
    }));

  return (
    <Block name="keys">
      <Tabs size="small">
        {Object.entries(keyNamespaces).map(([ns, data]) => {
          if (Object.keys(data.descriptions).length === 0) {
            return null;
          } else {
            return (
              <Tabs.TabPane key={ns} tab={data.description ?? ns}>
                <Table columns={columns} dataSource={getData(data.descriptions)} size="small" />
              </Tabs.TabPane>
            );
          }
        })}
      </Tabs>
    </Block>
  );
};

export default observer(({ store }) => {
  return (
    <Modal
      visible={store.showingSettings}
      title="设置"
      bodyStyle={{ paddingTop: "0" }}
      footer=""
      onCancel={store.toggleSettings}
    >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="通用配置" key="1">
          <Checkbox
            checked={store.settings.enableHotkeys}
            onChange={() => {
              store.settings.toggleHotkeys();
            }}
          >
            启用实体快捷键
          </Checkbox>
          <br />
          <Checkbox
            checked={store.settings.enableTooltips}
            onChange={() => {
              store.settings.toggleTooltips();
            }}
          >
            显示快捷键提示
          </Checkbox>
          <br />
          <Checkbox
            checked={store.settings.enableLabelTooltips}
            onChange={() => {
              store.settings.toggleLabelTooltips();
            }}
          >
            显示实体快键
          </Checkbox>
          <br />
          <Checkbox
            checked={store.settings.showLabels}
            onChange={() => {
              store.settings.toggleShowLabels();
            }}
          >
            在区域内显示实体名称
          </Checkbox>
          {/* <br/> */}
          {/* <Checkbox */}
          {/*   value="Show scores inside the regions" */}
          {/*   defaultChecked={store.settings.showScore} */}
          {/*   onChange={() => { */}
          {/*     store.settings.toggleShowScore(); */}
          {/*   }} */}
          {/* > */}
          {/*   Show scores inside the regions */}
          {/* </Checkbox> */}

          <br />
          <Checkbox
            checked={store.settings.continuousLabeling}
            onChange={() => {
              store.settings.toggleContinuousLabeling();
            }}
          >
            当创建区域之后，保持实体选择状态
          </Checkbox>

          <br />
          <Checkbox checked={store.settings.selectAfterCreate} onChange={store.settings.toggleSelectAfterCreate}>
            创建之后自动选择区域
          </Checkbox>

          <br />
          <Checkbox checked={store.settings.showLineNumbers} onChange={store.settings.toggleShowLineNumbers}>
            显示文本行号
          </Checkbox>

          <br />
          <Checkbox
            checked={store.settings.autoCreateSame}
            onChange={() => {
              store.settings.toggleAutoCreateSame();
            }}
          >
            创建实体之后，自动创建相同文本的实体
          </Checkbox>


          {/* <br /> */}
          {/* <Checkbox */}
          {/*   value="Enable auto-save" */}
          {/*   defaultChecked={store.settings.enableAutoSave} */}
          {/*   onChange={() => { */}
          {/*     store.settings.toggleAutoSave(); */}
          {/*   }} */}
          {/* > */}
          {/*   Enable auto-save */}

          {/* </Checkbox> */}
          {/* { store.settings.enableAutoSave && */}
          {/*   <div style={{ marginLeft: "1.7em" }}> */}
          {/*     Save every <InputNumber size="small" min={5} max={120} /> seconds */}
          {/*   </div> } */}
        </Tabs.TabPane>
        <Tabs.TabPane tab="快捷键" key="2">
          <HotkeysDescription />
        </Tabs.TabPane>
        <Tabs.TabPane tab="布局" key="3">
          <Checkbox
            checked={store.settings.bottomSidePanel}
            onChange={() => {
              store.settings.toggleBottomSP();
              setTimeout(triggerResizeEvent);
            }}
          >
            把侧边菜单放到下方
          </Checkbox>

          <br />
          <Checkbox checked={store.settings.displayLabelsByDefault} onChange={store.settings.toggleSidepanelModel}>
            在菜单中默认按实体分组
          </Checkbox>

          <br />
          <Checkbox
            value="Show Annotations panel"
            defaultChecked={store.settings.showAnnotationsPanel}
            onChange={() => {
              store.settings.toggleAnnotationsPanel();
            }}
          >
            显示打标结果菜单
          </Checkbox>
          <br />
          <Checkbox
            value="Show Predictions panel"
            defaultChecked={store.settings.showPredictionsPanel}
            onChange={() => {
              store.settings.togglePredictionsPanel();
            }}
          >
            显示预测结果菜单
          </Checkbox>

          {/* <br/> */}
          {/* <Checkbox */}
          {/*   value="Show image in fullsize" */}
          {/*   defaultChecked={store.settings.imageFullSize} */}
          {/*   onChange={() => { */}
          {/*     store.settings.toggleImageFS(); */}
          {/*   }} */}
          {/* > */}
          {/*   Show image in fullsize */}
          {/* </Checkbox> */}
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
});
