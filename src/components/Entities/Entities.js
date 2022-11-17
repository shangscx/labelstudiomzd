import React from "react";
import { Dropdown } from "antd";
import { observer } from "mobx-react";

import "./Entities.scss";
import { RegionTree } from "./RegionTree";
import { LabelList } from "./LabelList";
import { SortMenu, SortMenuIcon } from "./SortMenu";
import { Oneof } from "../../common/Oneof/Oneof";
import { Space } from "../../common/Space/Space";
import { Block, Elem } from "../../utils/bem";
import { RadioGroup } from "../../common/RadioGroup/RadioGroup";
import "./Entities.styl";
import { Button } from "../../common/Button/Button";
import { LsInvisible, LsTrash, LsVisible } from "../../assets/icons";
import { confirm } from "../../common/Modal/Modal";
import { Tooltip } from "../../common/Tooltip/Tooltip";

export default observer(({
  regionStore,
  annotation,
}) => {
  const { classifications, regions } = regionStore;
  const count = regions.length + (regionStore.view === "regions" ? classifications.length : 0);

  const toggleVisibility = e => {
    e.preventDefault();
    e.stopPropagation();
    regionStore.toggleVisibility();
  };

  const getSortName = (name) => {
    if (name === 'date') {
      return '日期';
    } else {
      return '分数';
    }
  };

  return (
    <Block name="entities">
      <Elem name="source">
        <Space spread>
          <RadioGroup
            size="small"
            value={regionStore.view}
            style={{ width: 240 }}
            onChange={e => {
              regionStore.setView(e.target.value);
            }}
          >
            <RadioGroup.Button value="regions">区域{count ? <Elem name="counter">&nbsp;{count}</Elem> : null}</RadioGroup.Button>
            <RadioGroup.Button value="labels">实体</RadioGroup.Button>
          </RadioGroup>

          <Tooltip title="删除所有区域">
            <Button
              look="danger"
              type="text"
              aria-label="Delete All Regions"
              icon={<LsTrash/>}
              style={{
                height: 36,
                width: 36,
                padding: 0,
              }}
              onClick={() => {
                confirm({
                  title: "删除所有打标区域",
                  body: "确认要删除所有打标区域?",
                  buttonLook: "destructive",
                  onOk: () => annotation.deleteAllRegions(),
                });
              }}/>
          </Tooltip>
        </Space>
      </Elem>

      {count ? (
        <Elem name="header">
          <Space spread align={regionStore.view === "regions" ? null : "end"}>
            {regionStore.view === "regions"  && (
              <Dropdown overlay={<SortMenu regionStore={regionStore}/>} placement="bottomLeft">
                <Elem name="sort" onClick={e => e.preventDefault()}>
                  <Elem name="sort-icon"><SortMenuIcon sortKey={regionStore.sort}/></Elem> {`排序 ${getSortName(regionStore.sort)}`}
                </Elem>
              </Dropdown>
            )}

            <Space size="small" align="end">
              {regions.length > 0 ? (
                <Elem
                  name="visibility"
                  tag={Button}
                  size="small"
                  type="link"
                  style={{ padding: 0 }}
                  onClick={toggleVisibility}
                  mod={{ hidden: regionStore.isAllHidden }}
                >{regionStore.isAllHidden ? <LsInvisible/> : <LsVisible/>}</Elem>
              ) : null}


            </Space>
          </Space>
        </Elem>
      )
        : null}

      <Oneof value={regionStore.view}>
        <Elem name="regions" case="regions">
          {count ? <RegionTree regionStore={regionStore}/> : <Elem name="empty">暂时未标注区域</Elem>}
        </Elem>
        <Elem name="labels" case="labels">
          {count ? <LabelList regionStore={regionStore}/> : <Elem name="empty">暂时未标注实体</Elem>}
        </Elem>
      </Oneof>
    </Block>
  );
});
