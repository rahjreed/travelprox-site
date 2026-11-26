// Display catalog only. Server-side entitlements must never trust client input.
export const plans = Object.freeze({
 launch: Object.freeze({monthlyCents:700,trialDays:7,funnels:0,customDomain:false,whiteLabel:false}),
 economy: Object.freeze({monthlyCents:1900,trialDays:7,funnels:2,customDomain:false,whiteLabel:false}),
 business: Object.freeze({monthlyCents:3900,trialDays:7,funnels:5,customDomain:true,whiteLabel:true}),
 first: Object.freeze({monthlyCents:5900,trialDays:7,funnels:10,customDomain:true,whiteLabel:true})
});
export const teamPartner=Object.freeze({name:'Private Jet',monthlyCents:39900,seats:50,sponsoredPlan:'economy',businessUpgradeCents:2000,firstUpgradeCents:4000});
export const standalonePrompterson=Object.freeze({lifetimeCents:3000});
