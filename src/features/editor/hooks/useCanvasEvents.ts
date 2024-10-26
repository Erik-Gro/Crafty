import { fabric } from "fabric";
import { useEffect } from "react";

interface UseCanvasEventsProps {
  save: () => void;
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  clearSelectionCallback?: () => void;
}

export const useCanvasEvents = ({
  save,
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("object:added", () => save());
      canvas.on("object:removed", () => save());
      canvas.on("object:modified", () => {
        save();
      });

      canvas.on("selection:created", (e) => {
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:updated", (e) => {
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:cleared", () => {
        setSelectedObjects([]);
        clearSelectionCallback?.();
      });

      canvas.on("object:moving", (e) => {
        const obj = e.target;
        if (!obj || !canvas.clipPath) return;

        const clipRect = canvas.clipPath as fabric.Rect;
        const snapDistance = 20;

        const objLeft = obj.left ?? 0;
        const objTop = obj.top ?? 0;

        const currentWidth = (obj.width ?? 0) * (obj.scaleX ?? 1);
        const currentHeight = (obj.height ?? 0) * (obj.scaleY ?? 1);

        const clipLeft = clipRect.left ?? 0;
        const clipRight = (clipRect.left ?? 0) + (clipRect.width ?? 0); // Right edge
        const clipTop = clipRect.top ?? 0;
        const clipBottom = (clipRect.top ?? 0) + (clipRect.height ?? 0); // Bottom edge

        // Snap to left
        if (objLeft < clipLeft + snapDistance && objLeft > clipLeft) {
          obj.set({ left: clipLeft });
        }

        // Snap to right
        if (
          objLeft + currentWidth > clipRight - snapDistance &&
          objLeft + currentWidth < clipRight
        ) {
          obj.set({ left: clipRight - currentWidth });
        }

        // Snap to top
        if (objTop < clipTop + snapDistance && objTop > clipTop) {
          obj.set({ top: clipTop });
        }

        // Snap to bottom
        if (
          objTop + currentHeight > clipBottom - snapDistance &&
          objTop + currentHeight < clipBottom
        ) {
          obj.set({ top: clipBottom - currentHeight });
        }
      });
    }

    return () => {
      if (canvas) {
        canvas.off("object:added");
        canvas.off("object:removed");
        canvas.off("object:modified");
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
        canvas.off("object:moving");
      }
    };
  }, [save, canvas, clearSelectionCallback, setSelectedObjects]);
};
