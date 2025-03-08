import { createContext, useEffect, useRef, useState } from "react";
import { OnSessionUpdateEvent, SEDetail } from "../streamelements/SEDetail";

export interface WidgetDataContextType {
  details: SEDetail | null;
}

export const SessionDataContext = createContext<WidgetDataContextType>({
  details: null,
});

interface SessionDataProviderProps {
  children: React.ReactNode;
}

export const SessionDataProvider = (props: SessionDataProviderProps) => {
  const [widgetData, setWidgetData] = useState<SEDetail | null>(null);
  const widgetDataRef = useRef<SEDetail | null>(null);

  useEffect(() => {
    widgetDataRef.current = widgetData;
  }, [widgetData]);

  const getConfiguration = (obj: { detail: SEDetail }) => {
    const detail = obj.detail;
    const fieldData = detail.fieldData;

    setWidgetData(detail);
  };

  const onSessionUpdate = (obj: OnSessionUpdateEvent) => {
    const widgetData = widgetDataRef.current;
    if (widgetData) {
      const newSession = obj.detail?.session;
      const newDetail = {
        ...widgetData!,
        session: {
          ...widgetData!.session,
          data: {
            ...widgetData!.session.data,
            ...newSession,
          },
        },
      };

      console.log("onSessionUpdate", { newDetail });
      setWidgetData((prev: SEDetail | null) => ({
        ...prev!,
        session: {
          ...prev!.session,
          data: {
            ...prev?.session.data,
            ...newSession,
          },
        },
      }));
    }
  };

  const onEventReceived = (obj: any) => {
    console.log("onEventReceived", obj);
  };

  useEffect(() => {
    window.addEventListener("onWidgetLoad", getConfiguration as any);
    window.addEventListener("onSessionUpdate", onSessionUpdate as any);
    window.addEventListener("onEventReceived", onEventReceived as any);

    return () => {
      window.removeEventListener("onWidgetLoad", getConfiguration as any);
      window.removeEventListener("onSessionUpdate", onSessionUpdate as any);
      window.removeEventListener("onEventReceived", onEventReceived as any);
    };
  }, []);

  return (
    <SessionDataContext.Provider value={{ details: widgetData }}>
      {props.children}
    </SessionDataContext.Provider>
  );
};
