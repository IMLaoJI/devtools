import React from "react";

import { createFloatingCodeComment } from "ui/actions/comments";
import { ContextMenu as ContextMenuType } from "ui/actions/contextMenus";
import { useGetRecordingId } from "ui/hooks/recordings";
import { useAppDispatch } from "ui/setup/hooks";
import { trackEvent } from "ui/utils/telemetry";
import useAuth0 from "ui/utils/useAuth0";

import { Dropdown, DropdownItem } from "../Library/LibraryDropdown";
import { ContextMenu } from "./index";

export default function GutterContextMenu({
  close,
  contextMenu,
}: {
  close: () => void;
  contextMenu: ContextMenuType;
}) {
  const recordingId = useGetRecordingId();
  const { isAuthenticated } = useAuth0();
  const dispatch = useAppDispatch();

  const addComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(
      createFloatingCodeComment(recordingId, {
        location: contextMenu.contextMenuItem.location,
      })
    );
    close();
  };

  // Un-authenticated users can't comment on Replays.
  if (!isAuthenticated) {
    return null;
  }

  return (
    <ContextMenu close={close} x={contextMenu.x} y={contextMenu.y}>
      <Dropdown>
        <DropdownItem onClick={addComment}>Add comment</DropdownItem>
      </Dropdown>
    </ContextMenu>
  );
}
