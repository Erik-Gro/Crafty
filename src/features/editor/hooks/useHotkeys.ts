import { fabric } from "fabric";
import { useCallback } from "react";
import { useEvent } from "react-use";

interface UseHotkeysProps {
  canvas: fabric.Canvas | null;
  undo: () => void;
  redo: () => void;
  save: (skip?: boolean) => void;
  copy: () => void;
  paste: () => void;
  moveStep: number;
}

export const useHotkeys = ({
  canvas,
  undo,
  redo,
  save,
  copy,
  paste,
  moveStep,
}: UseHotkeysProps) => {
  console.log(moveStep);
  const moveObjects = useCallback(
    (dx: number, dy: number) => {
      console.log(dx, dy);
      const activeObjects = canvas?.getActiveObjects();
      if (!activeObjects) return;

      activeObjects.forEach((obj) => {
        if (obj) {
          obj.set({
            left: (obj.left ?? 0) + dx,
            top: (obj.top ?? 0) + dy,
          });
          obj.setCoords();
        }
      });

      canvas?.renderAll();
    },
    [canvas]
  );

  useEvent("keydown", (event) => {
    const isCtrlKey = event.ctrlKey || event.metaKey;
    const isBackspace = event.key === "Backspace";
    const isInput = ["INPUT", "TEXTAREA"].includes(
      (event.target as HTMLElement).tagName
    );

    if (isInput) return;

    if (isBackspace) {
      canvas?.remove(...canvas.getActiveObjects());
      canvas?.discardActiveObject();
    }

    if (isCtrlKey && event.key === "z") {
      event.preventDefault();
      undo();
    }

    if (isCtrlKey && event.key === "y") {
      event.preventDefault();
      redo();
    }

    if (isCtrlKey && event.key === "c") {
      event.preventDefault();
      copy();
    }

    if (isCtrlKey && event.key === "v") {
      event.preventDefault();
      paste();
    }

    if (isCtrlKey && event.key === "s") {
      event.preventDefault();
      save(true);
    }

    if (isCtrlKey && event.key === "a") {
      event.preventDefault();
      canvas?.discardActiveObject();

      const allObjects = canvas
        ?.getObjects()
        .filter((object) => object.selectable);

      canvas?.setActiveObject(
        new fabric.ActiveSelection(allObjects, { canvas })
      );
      canvas?.renderAll();
    }
    switch (event.key) {
      case "ArrowUp":
        event.preventDefault();
        moveObjects(0, -moveStep);
        break;
      case "ArrowDown":
        event.preventDefault();
        moveObjects(0, moveStep);
        break;
      case "ArrowLeft":
        event.preventDefault();
        moveObjects(-moveStep, 0);
        break;
      case "ArrowRight":
        event.preventDefault();
        moveObjects(moveStep, 0);
        break;
    }
  });
};
