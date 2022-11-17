import { observer } from "mobx-react";
import { LsRedo, LsRemove, LsUndo } from "../../assets/icons";
import { Button } from "../../common/Button/Button";
import { Tooltip } from "../../common/Tooltip/Tooltip";
import { Block, Elem } from "../../utils/bem";
import "./HistoryActions.styl";

export const EditingHistory = observer(({ history }) => {
  return (
    <Block name="history">
      <Tooltip title="撤销">
        <Elem
          tag={Button}
          name="action"
          type="text"
          aria-label="撤销"
          disabled={!history?.canUndo}
          onClick={() => history?.canUndo && history.undo()}
          icon={<LsUndo />}
        />
      </Tooltip>
      <Tooltip title="重做">
        <Elem
          tag={Button}
          name="action"
          type="text"
          aria-label="重做"
          disabled={!history?.canRedo}
          onClick={() => history?.canRedo && history.redo()}
          icon={<LsRedo />}
        />
      </Tooltip>
      <Tooltip title="重置">
        <Elem
          tag={Button}
          name="action"
          look="danger"
          type="text"
          aria-label="重置"
          disabled={!history?.canUndo}
          onClick={() => history?.reset()}
          icon={<LsRemove />}
        />
      </Tooltip>
    </Block>
  );
});
