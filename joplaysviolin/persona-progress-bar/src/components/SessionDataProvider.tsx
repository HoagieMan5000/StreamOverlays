import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { OnSessionUpdateEvent, SEDetail } from "../streamelements/SEDetail";

const deliveryDelayMs = 500;

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
  const [widgetDataToDeliver, setWidgetDataToDeliver] = useState<SEDetail | null>(null);
  const [initialWidgetData, setInitialWidgetData] = useState<SEDetail | null>(null);
  const initialWidgetDataRef = useRef<SEDetail | null>(null);
  const [widgetData, setWidgetData] = useState<SEDetail | null>(null);
  const [deliverTimeout, setDeliverTimeout] = useState<number | null>(null);

  useEffect(() => {
    initialWidgetDataRef.current = initialWidgetData;
  }, [initialWidgetData]);

  const getConfiguration = (obj: { detail: SEDetail }) => {
    const detail = obj.detail;
    const fieldData = detail.fieldData;

    setInitialWidgetData(detail);
    setWidgetData(detail);
    setWidgetDataToDeliver(detail);
  };

  const deliverWidgetData = useCallback(() => {
    setWidgetData((existing) => {
      if (existing) {
        setWidgetDataToDeliver(existing);
      }
      return null;
    });
  }, [setWidgetData]);

  useEffect(() => {
    if (!deliverTimeout) {
      if (widgetData) {
        let handle = setTimeout(() => {
          deliverWidgetData();
          setDeliverTimeout(null);
        }, deliveryDelayMs);
        setDeliverTimeout(handle);
      }
    }
  }, [widgetData, deliverTimeout]);

  const onSessionUpdate = useCallback((obj: OnSessionUpdateEvent) => {
    const newSession = obj.detail?.session;
    if (initialWidgetDataRef.current) {
      const newDetail = {
        ...initialWidgetDataRef.current,
        session: {
          ...initialWidgetDataRef.current?.session,
          data: {
            ...initialWidgetDataRef.current?.session.data,
            ...newSession,
          },
        },
      };

      setWidgetData(newDetail);
    }
  }, []);

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
    <SessionDataContext.Provider value={{ details: widgetDataToDeliver }}>
      {props.children}
    </SessionDataContext.Provider>
  );
};
