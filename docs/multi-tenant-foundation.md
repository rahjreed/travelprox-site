# Travel Pro X foundation
Status: scaffold only; not deployed or security tested.
## Product decisions
Explorer $7, Launch $19, Growth $39 monthly; seven-day individual trials. Team Partner $399/month for 50 sponsored Launch seats. Sponsored Growth upgrade $20/month. No automatic team trial. No travel-company verification. Complimentary sponsorship granted by authorized platform admin. Stripe under Callista Digital subject to legal/account verification.
Travel Pro X is the installable authenticated PWA. Copy existing Mr. Prompterson code into TPX later; preserve standalone product, planned $30 lifetime license. No shared engine. No paid AI API. No Time to Share remains separate.
## Data boundaries
users/{uid}: private user profile. workspaces/{id}: private business metadata. workspaces/{id}/members/{uid}: server-managed active membership and role. workspaces/{id}/entitlements/current: server-derived access state. Future leads, drafts, quizzes and published public projections require separately tested rules. Team sponsorship does not confer access to private leads. Billing, invitation redemption, seat limits and membership changes require trusted backend transactions. Admin actions require authorization and audit logs.
## Current audit
Legacy Marketing Hub uses shared access code, not secure authentication. Keep public design; replace legacy gate before storing private data. No private data may be placed in static assets.
## Next steps
Create isolated Firebase development project, enable email/password authentication and Firestore, configure authorized domains and public web SDK config. Add SDK with lockfile, implement auth UI and verified-email flow, trusted workspace creation, emulator tests including cross-tenant denial and privilege escalation. Do not deploy rules to existing production project without review. Current rules intentionally deny all client writes and lead access. No production billing or Firebase deployment yet.
