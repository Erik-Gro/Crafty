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
      canvas.on("object:modified", (e) => {
        const obj = e.target;

        // Check if obj is defined
        if (!obj) return;

        // Use optional chaining and default values for width and scale
        const currentWidth = (obj.width ?? 0) * (obj.scaleX ?? 1);
        const currentHeight = (obj.height ?? 0) * (obj.scaleY ?? 1);

        console.log(
          `Current Width: ${currentWidth}, Current Height: ${currentHeight}`
        );

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
          return;
        }

        // Snap to right
        if (
          objLeft + currentWidth > clipRight - snapDistance &&
          objLeft + currentWidth < clipRight
        ) {
          obj.set({ left: clipRight - currentWidth });
          return;
        }

        // Snap to top
        if (objTop < clipTop + snapDistance && objTop > clipTop) {
          obj.set({ top: clipTop });
          return;
        }

        // Snap to bottom
        if (
          objTop + currentHeight > clipBottom - snapDistance &&
          objTop + currentHeight < clipBottom
        ) {
          obj.set({ top: clipBottom - currentHeight });
          return;
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
        canvas.off("object:moving"); // Clean up the object:moving event
      }
    };
  }, [save, canvas, clearSelectionCallback, setSelectedObjects]);
};

// canvas.on("object:moving", function (event) {
//   const obj = event.target as fabric.Object | undefined;

//   // Check if obj is defined and has the necessary properties
//   if (!obj || typeof obj.left === 'undefined' || typeof obj.top === 'undefined') {
//     return; // Exit if obj is not valid
//   }

//   const threshold = 20; // Snapping threshold in pixels

//   // Find the clipping rectangle (clipPath)
//   const clipPath = canvas.clipPath as fabric.Rect | undefined;

//   // Ensure clipPath is valid
//   if (!clipPath) return;

//   const workspaceLeft = clipPath.left || 0;
//   const workspaceTop = clipPath.top || 0;
//   const workspaceWidth = clipPath.width || 0;
//   const workspaceHeight = clipPath.height || 0;

//   // Snap to edges of the clipping area
//   if (obj.left < workspaceLeft + threshold) {
//     obj.left = workspaceLeft; // Snap to left edge
//   } else if (obj.left > workspaceLeft + workspaceWidth - (obj.width || 0) - threshold) {
//     obj.left = workspaceLeft + workspaceWidth - (obj.width || 0); // Snap to right edge
//   }

//   if (obj.top < workspaceTop + threshold) {
//     obj.top = workspaceTop; // Snap to top edge
//   } else if (obj.top > workspaceTop + workspaceHeight - (obj.height || 0) - threshold) {
//     obj.top = workspaceTop + workspaceHeight - (obj.height || 0); // Snap to bottom edge
//   }

//   // Update the object's position
//   obj.setCoords();
// });
