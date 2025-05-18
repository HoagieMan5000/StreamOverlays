import { OnSessionUpdateEvent, SessionData } from "../streamelements/SEDetail";
import { defaultMockWidgetData } from "./mockWidgetData";

export async function mockDataChanges1() {
  let currSession = defaultMockWidgetData.detail.session.data;

  await sleep(1000);
  currSession = {
    ...currSession,
    "subscriber-goal": {
      amount: 50,
    },
  };
  sendEvent(currSession);

  await sleep(750);
  currSession = {
    ...currSession,
    "subscriber-goal": {
      amount: 75,
    },
  };
  sendEvent(currSession);

  await sleep(750);
  currSession = {
    ...currSession,
    "subscriber-goal": {
      amount: 90,
    },
  };
  sendEvent(currSession);

  await sleep(500);
  currSession = {
    ...currSession,
    "subscriber-goal": {
      amount: 180,
    },
  };
  sendEvent(currSession);

  await sleep(500);
  currSession = {
    ...currSession,
    "subscriber-goal": {
      amount: 100,
    },
  };
  sendEvent(currSession);

  await sleep(5000);
  currSession = {
    ...currSession,
    "tip-goal": {
      amount: 3000,
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
