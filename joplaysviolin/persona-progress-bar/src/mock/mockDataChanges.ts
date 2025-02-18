import { OnSessionUpdateEvent, SessionData } from "../streamelements/SEDetail";
import { defaultMockWidgetData } from "./mockWidgetData";

export async function mockDataChanges1() {
  let currSession = defaultMockWidgetData.detail.session.data;

  await sleep(3000);
  currSession = {
    ...currSession,
    "subscriber-session": {
      count: 50,
    },
  };
  sendEvent(currSession);

  await sleep(3000);
  currSession = {
    ...currSession,
    "tip-session": {
      amount: 3500,
    },
  };
  sendEvent(currSession);

  await sleep(3000);
  currSession = {
    ...currSession,
    "subscriber-session": {
      count: 180,
    },
  };
  sendEvent(currSession);
/*
  await sleep(1000);
  currSession = {
    ...currSession,
    "tip-session": {
      amount: 20,
    },
  };
  sendEvent(currSession);
*/
}

function sendEvent(data: SessionData) {
  const root = document.getElementById("root");
  const customEvent = new CustomEvent("onSessionUpdate", {
    detail: {
      session: data,
    },
    bubbles: true,
  } as OnSessionUpdateEvent);
  root?.dispatchEvent(customEvent);
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
