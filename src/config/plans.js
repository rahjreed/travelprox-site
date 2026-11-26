// Display catalog only. Server-side entitlements must never trust client input.
export const plans = Object.freeze({
  explorer: Object.freeze({ monthlyCents: 700, trialDays: 7, funnels: 0, customDomain: false }),
  launch: Object.freeze({ monthlyCents: 1900, trialDays: 7, funnels: 2, customDomain: false }),
  growth: Object.freeze({ monthlyCents: 3900, trialDays: 7, funnels: 5, customDomain: true })
});
export const teamPartner = Object.freeze({ monthlyCents: 39900, seats: 50, sponsoredPlan: 'launch', growthUpgradeCents: 2000 });
export const standalonePrompterson = Object.freeze({ lifetimeCents: 3000 });
