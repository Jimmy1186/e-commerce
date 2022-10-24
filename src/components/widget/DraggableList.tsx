import React, { useMemo, useRef } from "react";
import { animated, config, useSprings } from "react-spring";
import useMeasure from "react-use-measure";
import {clamp} from "lodash-es" 
import { useDrag } from "@use-gesture/react";
import Image from "next/image";

export const swap = (arr:any, from:any, to:any) => {
    const _arr = arr.slice(0);
    const val = _arr[from];
    _arr.splice(from, 1);
    _arr.splice(to, 0, val);
    return _arr;
  };



  const fn =
  (order: number[], active = false, originalIndex = 0, curIndex = 0, x = 0) =>
  (index: number) =>
    active && index === originalIndex
      ? {
          x: curIndex * 100 + x,
          scale: 1.1,
          zIndex: 1,
          shadow: 15,
          immediate: (key: string) => key === 'zIndex',
          config: (key: string) => (key === 'x' ? config.stiff : config.default),
        }
      : {
          x: order.indexOf(index) * 100,
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: false,
        }



  
  const DraggableList = ({ items, removeItem }:any) => {
    const order = useRef(items.map((_:any, index:any) => index)) // Store indicies as a local ref, this represents the item order
  const [springs, api] = useSprings(items.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const bind = useDrag(({ args: [originalIndex], active, movement: [x] }) => {
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = clamp(Math.round((curIndex * 100 + x) / 100), 0, items.length - 1)
    const newOrder = swap(order.current, curIndex, curRow)
    api.start(fn(newOrder, active, originalIndex, curIndex, x)) // Feed springs new style data, they'll animate the view without causing a single render
    if (!active) order.current = newOrder
  })

  


  
    return (
        <div className="flex w-full">
        {springs.map(({ zIndex, shadow, x, scale }, i) => (
          <animated.div
            {...bind(i)}
            key={i}
            className="w-36 h-36 relative" 
            style={{
              zIndex,
              boxShadow: shadow.to(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
              x,
              scale,
            }}
           children={items[i]}
          />
       
        ))}
      </div>
    );
  };
  
  export default DraggableList;
  