import { useEffect, useState } from "react";
import { defaultMockWidgetData } from "../mock/mockWidgetData";
import { OnSessionUpdateEvent } from "../streamelements/SEDetail";
import { mockDataChanges1 } from "../mock/mockDataChanges";
import { AppConfig } from "../AppConfig";

export const DevMock = () => {
  const [onWidgetLoadSent, setOnWidgetLoadSent] = useState(false);

  if (!AppConfig.isDev) {
    return null;
  }

  useEffect(() => {
    setTimeout(() => {
      console.log("Dispatching mock onWidgetLoad");
      const root = document.getElementById("root");
      const customEvent = new CustomEvent("onWidgetLoad", {
        ...defaultMockWidgetData,
        bubbles: true,
      });
      root?.dispatchEvent(customEvent);
      setOnWidgetLoadSent(true);
    }, 200);
  }, []);

  useEffect(() => {
    if (onWidgetLoadSent) {
      console.log("USING MOCK DATA");
      mockDataChanges1();
    }
  }, [onWidgetLoadSent]);

  return null;
};
