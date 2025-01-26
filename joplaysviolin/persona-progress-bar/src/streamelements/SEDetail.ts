export type SessionData = {
  "follower-latest": {
    name: string;
  };
  "follower-session": {
    count: number;
  };
  "follower-week": {
    count: number;
  };
  "follower-month": {
    count: number;
  };
  "follower-goal": {
    amount: number;
  };
  "follower-total": {
    count: number;
  };
  "subscriber-latest": {
    name: string;
    amount: number;
    tier: string;
    message: string;
  };
  "subscriber-new-latest": {
    name: string;
    amount: number;
    message: string;
  };
  "subscriber-resub-latest": {
    name: string;
    amount: number;
    message: string;
  };
  "subscriber-gifted-latest": {
    name: string;
    amount: number;
    message: string;
    tier: string;
    sender: string;
  };
  "subscriber-session": {
    count: number;
  };
  "subscriber-new-session": {
    count: number;
  };
  "subscriber-resub-session": {
    count: number;
  };
  "subscriber-gifted-session": {
    count: number;
  };
  "subscriber-week": {
    count: number;
  };
  "subscriber-month": {
    count: number;
  };
  "subscriber-goal": {
    amount: number;
  };
  "subscriber-total": {
    count: number;
  };
  "subscriber-points": {
    amount: number;
  };
  "subscriber-alltime-gifter": {
    name: string;
    amount: number;
  };
  "host-latest": {
    name: string;
    amount: number;
  };
  "raid-latest": {
    name: string;
    amount: number;
  };
  "cheer-session": {
    amount: number;
  };
  "cheer-week": {
    amount: number;
  };
  "cheer-month": {
    amount: number;
  };
  "cheer-total": {
    amount: number;
  };
  "cheer-count": {
    count: number;
  };
  "cheer-goal": {
    amount: number;
  };
  "cheer-latest": {
    name: string;
    amount: number;
    message: string;
  };
  "cheer-session-top-donation": {
    amount: number;
    name: string;
  };
  "cheer-weekly-top-donation": {
    amount: number;
    name: string;
  };
  "cheer-monthly-top-donation": {
    amount: number;
    name: string;
  };
  "cheer-alltime-top-donation": {
    name: string;
    amount: number;
  };
  "cheer-session-top-donator": {
    amount: number;
    name: string;
  };
  "cheer-weekly-top-donator": {
    amount: number;
    name: string;
  };
  "cheer-monthly-top-donator": {
    amount: number;
    name: string;
  };
  "cheer-alltime-top-donator": {
    name: string;
    amount: number;
  };
  "tip-latest": {
    name: string;
    amount: number;
  };
  "tip-session-top-donation": {
    amount: number;
    name: string;
  };
  "tip-weekly-top-donation": {
    amount: number;
    name: string;
  };
  "tip-monthly-top-donation": {
    amount: number;
    name: string;
  };
  "tip-alltime-top-donation": {
    amount: number;
    name: string;
  };
  "tip-session-top-donator": {
    amount: number;
    name: string;
  };
  "tip-weekly-top-donator": {
    amount: number;
    name: string;
  };
  "tip-monthly-top-donator": {
    amount: number;
    name: string;
  };
  "tip-alltime-top-donator": {
    amount: number;
    name: string;
  };
  "tip-session": {
    amount: number;
  };
  "tip-week": {
    amount: number;
  };
  "tip-month": {
    amount: number;
  };
  "tip-total": {
    amount: number;
  };
  "tip-count": {
    count: number;
  };
  "tip-goal": {
    amount: number;
  };
  "merch-goal-orders": {
    amount: number;
  };
  "merch-goal-items": {
    amount: number;
  };
  "merch-goal-total": {
    amount: number;
  };
  "merch-latest": {
    amount: number;
    items: any[];
    name: string;
  };
  "follower-recent": Array<{
    name: string;
    createdAt: string;
    type: string;
  }>;
  "subscriber-recent": Array<{
    name: string;
    tier: string;
    amount: number;
    createdAt: string;
    type: string;
  }>;
  "host-recent": Array<{
    name: string;
    amount: number;
    createdAt: string;
    type: string;
  }>;
  "raid-recent": Array<{
    name: string;
    amount: number;
    createdAt: string;
    type: string;
  }>;
  "cheer-recent": Array<{
    name: string;
    amount: number;
    createdAt: string;
    type: string;
  }>;
  "tip-recent": any[];
  "merch-recent": any[];
  "purchase-latest": {
    amount: number;
    avatar: string;
    items: any[];
    message: string;
    name: string;
  };
  "charityCampaignDonation-alltime-top-donation": {
    amount: number;
    name: string;
  };
  "charityCampaignDonation-alltime-top-donator": {
    amount: number;
    name: string;
  };
  "charityCampaignDonation-latest": {
    amount: number;
    name: string;
  };
  "charityCampaignDonation-monthly-top-donation": {
    amount: number;
    name: string;
  };
  "charityCampaignDonation-monthly-top-donator": {
    amount: number;
    name: string;
  };
  "charityCampaignDonation-recent": any[];
  "charityCampaignDonation-weekly-top-donation": {
    amount: number;
    name: string;
  };
  "charityCampaignDonation-weekly-top-donator": {
    amount: number;
    name: string;
  };
  "cheerPurchase-alltime-top-donation": {
    amount: number;
    name: string;
  };
  "cheerPurchase-alltime-top-donator": {
    amount: number;
    name: string;
  };
  "cheerPurchase-latest": {
    amount: number;
    name: string;
  };
  "cheerPurchase-monthly-top-donation": {
    amount: number;
    name: string;
  };
  "cheerPurchase-monthly-top-donator": {
    amount: number;
    name: string;
  };
  "cheerPurchase-recent": any[];
  "cheerPurchase-weekly-top-donation": {
    amount: number;
    name: string;
  };
  "cheerPurchase-weekly-top-donator": {
    amount: number;
    name: string;
  };
  "superchat-alltime-top-donation": {
    amount: number;
    name: string;
  };
  "superchat-alltime-top-donator": {
    amount: number;
    name: string;
  };
  "superchat-count": {
    count: number;
  };
  "superchat-goal": {
    amount: number;
  };
  "superchat-latest": {
    amount: number;
    name: string;
  };
  "superchat-month": {
    amount: number;
  };
  "superchat-monthly-top-donation": {
    amount: number;
    name: string;
  };
  "superchat-monthly-top-donator": {
    amount: number;
    name: string;
  };
  "superchat-recent": any[];
  "superchat-session": {
    amount: number;
  };
  "superchat-total": {
    amount: number;
  };
  "superchat-week": {
    amount: number;
  };
  "superchat-weekly-top-donation": {
    amount: number;
    name: string;
  };
  "superchat-weekly-top-donator": {
    amount: number;
    name: string;
  };
  "charityCampaignDonation-session-top-donation": {
    amount: number;
    name: string;
  };
  "charityCampaignDonation-session-top-donator": {
    amount: number;
    name: string;
  };
  "cheerPurchase-session-top-donation": {
    amount: number;
    name: string;
  };
  "cheerPurchase-session-top-donator": {
    amount: number;
    name: string;
  };
  "hypetrain-latest": {
    active: number;
    amount: number;
    level: number;
    levelChanged: number;
    name: string;
    type: string;
  };
  "hypetrain-latest-top-contributors": any[];
  "hypetrain-level-goal": {
    amount: number;
  };
  "hypetrain-level-progress": {
    amount: number;
    percent: number;
  };
  "hypetrain-total": {
    amount: number;
  };
  "superchat-session-top-donation": {
    amount: number;
    name: string;
  };
  "superchat-session-top-donator": {
    amount: number;
    name: string;
  };
};

type SettingsData = {
  autoReset: boolean;
  calendar: boolean;
  resetOnStart: boolean;
};

type RecentsData = {
  name: string;
  tier?: string;
  amount?: number;
  createdAt: string;
  type: string;
}[];

type CurrencyData = {
  code: string;
  symbol: string;
  name: string;
};

export type ChannelData = {
  username: string;
  apiToken: string;
  id: string;
  providerId: string;
  avatar: string;
};

export type OverlayFieldData = {
  image: string;
};

export type SEDetail = {
  session: {
    data: SessionData;
    settings: SettingsData;
  };
  recents: RecentsData;
  currency: CurrencyData;
  channel: ChannelData;
  fieldData: OverlayFieldData;
};

// They made this object *slightly* different from the SEDetail, just to drive us mad
export interface OnSessionUpdateEvent {
  detail: {
    session: SessionData;
  };
}
