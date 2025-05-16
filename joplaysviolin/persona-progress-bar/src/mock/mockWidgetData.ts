import { SEDetail, SessionData } from "../streamelements/SEDetail";

export const defaultMockSession: SessionData = {
  "follower-latest": {
    name: "mrfollower",
  },
  "follower-session": {
    count: 6,
  },
  "follower-week": {
    count: 6,
  },
  "follower-month": {
    count: 6,
  },
  "follower-goal": {
    amount: 183,
  },
  "follower-total": {
    count: 151,
  },
  "subscriber-latest": {
    name: "mssubscriber",
    amount: 30,
    tier: "1000",
    message: "Hi there!",
  },
  "subscriber-new-latest": {
    name: "mrslatestsubscriber",
    amount: 1,
    message:
      "Anonymous gifted a Tier 1 sub to mrslatestsubscriber! This is their first Gift Sub in the channel!",
  },
  "subscriber-resub-latest": {
    name: "mssubscriber",
    amount: 30,
    message: "Hi there!",
  },
  "subscriber-gifted-latest": {
    name: "mrslatestsubscriber",
    amount: 1,
    message:
      "Anonymous gifted a Tier 1 sub to mrslatestsubscriber! This is their first Gift Sub in the channel!",
    tier: "1000",
    sender: "InsertSubGifter",
  },
  "subscriber-session": {
    count: 28,
  },
  "subscriber-new-session": {
    count: 0,
  },
  "subscriber-resub-session": {
    count: 0,
  },
  "subscriber-gifted-session": {
    count: 0,
  },
  "subscriber-week": {
    count: 0,
  },
  "subscriber-month": {
    count: 0,
  },
  "subscriber-goal": {
    amount: 300,
  },
  "subscriber-total": {
    count: 0,
  },
  "subscriber-points": {
    amount: 0,
  },
  "subscriber-alltime-gifter": {
    name: "",
    amount: 0,
  },
  "host-latest": {
    name: "latesthoster",
    amount: 4,
  },
  "raid-latest": {
    name: "latestraider",
    amount: 9,
  },
  "cheer-session": {
    amount: 0,
  },
  "cheer-week": {
    amount: 0,
  },
  "cheer-month": {
    amount: 0,
  },
  "cheer-total": {
    amount: 151,
  },
  "cheer-count": {
    count: 151,
  },
  "cheer-goal": {
    amount: 151,
  },
  "cheer-latest": {
    name: "latestcheerer",
    amount: 5,
    message: "cheer5",
  },
  "cheer-session-top-donation": {
    amount: 0,
    name: "",
  },
  "cheer-weekly-top-donation": {
    amount: 0,
    name: "",
  },
  "cheer-monthly-top-donation": {
    amount: 0,
    name: "",
  },
  "cheer-alltime-top-donation": {
    name: "alltimecheerer",
    amount: 69,
  },
  "cheer-session-top-donator": {
    amount: 0,
    name: "",
  },
  "cheer-weekly-top-donator": {
    amount: 0,
    name: "",
  },
  "cheer-monthly-top-donator": {
    amount: 0,
    name: "",
  },
  "cheer-alltime-top-donator": {
    name: "alltimedonator",
    amount: 82,
  },
  "tip-latest": {
    name: "",
    amount: 0,
  },
  "tip-session-top-donation": {
    amount: 0,
    name: "",
  },
  "tip-weekly-top-donation": {
    amount: 0,
    name: "",
  },
  "tip-monthly-top-donation": {
    amount: 0,
    name: "",
  },
  "tip-alltime-top-donation": {
    amount: 0,
    name: "",
  },
  "tip-session-top-donator": {
    amount: 0,
    name: "",
  },
  "tip-weekly-top-donator": {
    amount: 0,
    name: "",
  },
  "tip-monthly-top-donator": {
    amount: 0,
    name: "",
  },
  "tip-alltime-top-donator": {
    amount: 0,
    name: "",
  },
  "tip-session": {
    amount: 69,
  },
  "tip-week": {
    amount: 0,
  },
  "tip-month": {
    amount: 0,
  },
  "tip-total": {
    amount: 0,
  },
  "tip-count": {
    count: 3,
  },
  "tip-goal": {
    amount: 2000,
  },
  "merch-goal-orders": {
    amount: 0,
  },
  "merch-goal-items": {
    amount: 0,
  },
  "merch-goal-total": {
    amount: 0,
  },
  "merch-latest": {
    amount: 0,
    items: [],
    name: "",
  },
  "follower-recent": [
    {
      name: "username12345",
      createdAt: "2023-12-24T21:05:02.690Z",
      type: "follower",
    },
  ],
  "subscriber-recent": [
    {
      name: "username4567",
      tier: "1000",
      amount: 30,
      createdAt: "2024-07-20T02:56:41.240Z",
      type: "subscriber",
    },
  ],
  "host-recent": [
    {
      name: "recenthosteruser",
      amount: 4,
      createdAt: "2021-06-08T01:32:09.387Z",
      type: "host",
    },
  ],
  "raid-recent": [
    {
      name: "recentraidername",
      amount: 9,
      createdAt: "2024-07-20T05:27:41.189Z",
      type: "raid",
    },
  ],
  "cheer-recent": [
    {
      name: "recentcheeruser",
      amount: 5,
      createdAt: "2024-07-13T19:32:36.915Z",
      type: "cheer",
    },
  ],
  "tip-recent": [],
  "merch-recent": [],
  "purchase-latest": {
    amount: 0,
    avatar: "",
    items: [],
    message: "",
    name: "",
  },
  "charityCampaignDonation-alltime-top-donation": {
    amount: 0,
    name: "",
  },
  "charityCampaignDonation-alltime-top-donator": {
    amount: 0,
    name: "",
  },
  "charityCampaignDonation-latest": {
    amount: 0,
    name: "",
  },
  "charityCampaignDonation-monthly-top-donation": {
    amount: 0,
    name: "",
  },
  "charityCampaignDonation-monthly-top-donator": {
    amount: 0,
    name: "",
  },
  "charityCampaignDonation-recent": [],
  "charityCampaignDonation-weekly-top-donation": {
    amount: 0,
    name: "",
  },
  "charityCampaignDonation-weekly-top-donator": {
    amount: 0,
    name: "",
  },
  "cheerPurchase-alltime-top-donation": {
    amount: 0,
    name: "",
  },
  "cheerPurchase-alltime-top-donator": {
    amount: 0,
    name: "",
  },
  "cheerPurchase-latest": {
    amount: 0,
    name: "",
  },
  "cheerPurchase-monthly-top-donation": {
    amount: 0,
    name: "",
  },
  "cheerPurchase-monthly-top-donator": {
    amount: 0,
    name: "",
  },
  "cheerPurchase-recent": [],
  "cheerPurchase-weekly-top-donation": {
    amount: 0,
    name: "",
  },
  "cheerPurchase-weekly-top-donator": {
    amount: 0,
    name: "",
  },
  "superchat-alltime-top-donation": {
    amount: 0,
    name: "",
  },
  "superchat-alltime-top-donator": {
    amount: 0,
    name: "",
  },
  "superchat-count": {
    count: 0,
  },
  "superchat-goal": {
    amount: 0,
  },
  "superchat-latest": {
    amount: 0,
    name: "",
  },
  "superchat-month": {
    amount: 0,
  },
  "superchat-monthly-top-donation": {
    amount: 0,
    name: "",
  },
  "superchat-monthly-top-donator": {
    amount: 0,
    name: "",
  },
  "superchat-recent": [],
  "superchat-session": {
    amount: 0,
  },
  "superchat-total": {
    amount: 0,
  },
  "superchat-week": {
    amount: 0,
  },
  "superchat-weekly-top-donation": {
    amount: 0,
    name: "",
  },
  "superchat-weekly-top-donator": {
    amount: 0,
    name: "",
  },
  "charityCampaignDonation-session-top-donation": {
    amount: 0,
    name: "",
  },
  "charityCampaignDonation-session-top-donator": {
    amount: 0,
    name: "",
  },
  "cheerPurchase-session-top-donation": {
    amount: 0,
    name: "",
  },
  "cheerPurchase-session-top-donator": {
    amount: 0,
    name: "",
  },
  "hypetrain-latest": {
    active: 0,
    amount: 0,
    level: 0,
    levelChanged: 0,
    name: "",
    type: "",
  },
  "hypetrain-latest-top-contributors": [],
  "hypetrain-level-goal": {
    amount: 0,
  },
  "hypetrain-level-progress": {
    amount: 0,
    percent: 0,
  },
  "hypetrain-total": {
    amount: 0,
  },
  "superchat-session-top-donation": {
    amount: 0,
    name: "",
  },
  "superchat-session-top-donator": {
    amount: 0,
    name: "",
  },
};
/*
    settings: {
      autoReset: true,
      calendar: false,
      resetOnStart: false,
    },
  

  */

export const defaultMockWidgetData: { detail: SEDetail } = {
  detail: {
    session: {
      data: defaultMockSession,
      settings: {
        autoReset: true,
        calendar: false,
        resetOnStart: false,
      },
    },
    recents: [
      {
        name: "subuser",
        tier: "1000",
        amount: 1,
        createdAt: "2022-02-14T22:39:17.194Z",
        type: "subscriber",
      },
      {
        name: "followeruser",
        createdAt: "2023-12-24T21:05:02.690Z",
        type: "follower",
      },
      {
        name: "cheeruser",
        amount: 5,
        createdAt: "2024-07-13T19:32:36.915Z",
        type: "cheer",
      },
      {
        name: "raiduser",
        amount: 9,
        createdAt: "2024-07-20T05:27:41.189Z",
        type: "raid",
      },
    ],
    currency: {
      code: "USD",
      symbol: "$",
      name: "U.S. Dollar",
    },
    channel: {
      username: "streamerusername",
      apiToken: "REDACTED",
      id: "REDACTED",
      providerId: "REDACTED",
      avatar:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/31dd35da-d7e2-4ef9-ba75-b0a2830be1c8-profile_image-300x300.png",
    },
    fieldData: {
      image:
        "https://cdn.streamelements.com/uploads/8678ff66-258c-4e5e-8c16-2ef0e5c355ec.png",
      subGoal: 300,
      tipGoal: 400,
      showCents: true,
    },
  },
};
