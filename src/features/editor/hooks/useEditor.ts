import { fabric } from "fabric";
import { useCallback, useState, useMemo } from "react";
import { useAutoResize } from "./useAutoResize";
import { BuildEditorProps } from "../types/buildEditorProps";
import { Editor } from "../types/editor";
import {
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  FILL_COLOR,
  FONT_FAMILY,
  FONT_WEIGHT,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TRIANGLE_OPTIONS,
} from "../types/shapes";
import { useCanvasEvents } from "./useCanvasEvents";
import { isTextType } from "../utils/isTextType";

const buildEditor = ({
  save,
  undo,
  redo,
  canRedo,
  canUndo,
  autoZoom,
  copy,
  paste,
  canvas,
  fillColor,
  fontFamily,
  setFontFamily,
  setFillColor,
  strokeColor,
  setStrokeColor,
  strokeWidth,
  setStrokeWidth,
  selectedObjects,
  strokeDashArray,
  setStrokeDashArray,
}: BuildEditorProps): Editor => {
  const addToCanvas = (object: fabric.Object) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  const getWorkspace = () => {
    return canvas.getObjects().find((object) => object.name === "clip");
  };

  const center = (object: fabric.Object) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();

    if (!center) return;

    // @ts-ignore
    canvas._centerObject(object, center);
  };

  return {
    changeStrokeColor: (value: string) => {
      setStrokeColor(value);
      canvas.getActiveObjects().forEach((object) => {
        // Text types don't have stroke
        if (isTextType(object.type)) {
          object.set({ fill: value });
          return;
        }

        object.set({ stroke: value });
      });
      canvas.freeDrawingBrush.color = value;
      canvas.renderAll();
    },
    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: value });
      });
      canvas.freeDrawingBrush.width = value;
      canvas.renderAll();
    },
    changeStrokeDashArray: (value: number[]) => {
      setStrokeDashArray(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: value });
      });
      canvas.renderAll();
    },
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        // fill: fillColor,
        // stroke: strokeColor,
        // strokeWidth: strokeWidth,
        // strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },
    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 50,
        ry: 50,
        // fill: fillColor,
        // stroke: strokeColor,
        // strokeWidth: strokeWidth,
        // strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        // fill: fillColor,
        // stroke: strokeColor,
        // strokeWidth: strokeWidth,
        // strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },
    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        // fill: fillColor,
        // stroke: strokeColor,
        // strokeWidth: strokeWidth,
        // strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },
    addInverseTriangle: () => {
      const HEIGHT = TRIANGLE_OPTIONS.height;
      const WIDTH = TRIANGLE_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          { x: 0, y: 0 },
          { x: WIDTH, y: 0 },
          { x: WIDTH / 2, y: HEIGHT },
        ],
        {
          ...TRIANGLE_OPTIONS,
          // fill: fillColor,
          // stroke: strokeColor,
          // strokeWidth: strokeWidth,
          // strokeDashArray: strokeDashArray,
        }
      );

      addToCanvas(object);
    },
    addDiamond: () => {
      const HEIGHT = DIAMOND_OPTIONS.height;
      const WIDTH = DIAMOND_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        {
          ...DIAMOND_OPTIONS,
          // fill: fillColor,
          // stroke: strokeColor,
          // strokeWidth: strokeWidth,
          // strokeDashArray: strokeDashArray,
        }
      );
      addToCanvas(object);
    },
    canvas,
    // getActiveFontWeight: () => {
    //   const selectedObject = selectedObjects[0];

    //   if (!selectedObject) {
    //     return FONT_WEIGHT;
    //   }

    //   // @ts-ignore
    //   const value = selectedObject.get("fontWeight") || FONT_WEIGHT;

    //   return value;
    // },
    // getActiveFontFamily: () => {
    //   const selectedObject = selectedObjects[0];

    //   if (!selectedObject) {
    //     return fontFamily;
    //   }

    //   // @ts-ignore
    //   const value = selectedObject.get("fontFamily") || fontFamily;

    //   return value;
    // },
    // getActiveFillColor: () => {
    //   const selectedObject = selectedObjects[0];

    //   if (!selectedObject) {
    //     return fillColor;
    //   }

    //   const value = selectedObject.get("fill") || fillColor;

    //   // Currently, gradients & patterns are not supported
    //   return value as string;
    // },
    // getActiveStrokeColor: () => {
    //   const selectedObject = selectedObjects[0];

    //   if (!selectedObject) {
    //     return strokeColor;
    //   }

    //   const value = selectedObject.get("stroke") || strokeColor;

    //   return value;
    // },
    // getActiveStrokeWidth: () => {
    //   const selectedObject = selectedObjects[0];

    //   if (!selectedObject) {
    //     return strokeWidth;
    //   }

    //   const value = selectedObject.get("strokeWidth") || strokeWidth;

    //   return value;
    // },
    // getActiveStrokeDashArray: () => {
    //   const selectedObject = selectedObjects[0];

    //   if (!selectedObject) {
    //     return strokeDashArray;
    //   }

    //   const value = selectedObject.get("strokeDashArray") || strokeDashArray;

    //   return value;
    // },
    // selectedObjects,
  };
};

export const useEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fontFamily, setFontFamily] = useState(FONT_FAMILY);
  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] =
    useState<number[]>(STROKE_DASH_ARRAY);

  useAutoResize({ canvas, container });

  useCanvasEvents({
    canvas,
    setSelectedObjects,
    // clearSelectionCallback,
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        fillColor,
        strokeWidth,
        strokeColor,
        setFillColor,
        setStrokeColor,
        setStrokeWidth,
      });
    }

    return undefined;
  }, [canvas, fillColor, strokeWidth, strokeColor]);

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      fabric.Object.prototype.set({
        cornerColor: "#FFF",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      });

      const initialWorkspace = new fabric.Rect({
        // width: initialWidth.current,
        // height: initialHeight.current,
        width: 900,
        height: 1200,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,0.8)",
          blur: 5,
        }),
      });

      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);

      const rect = new fabric.Rect({ height: 100, width: 100, fill: "black" });
      initialCanvas.add(rect);
      initialCanvas.centerObject(rect);
    },
    []
  );

  return { init, editor };
};
