/**
 * GA4 Visitor Count Proxy — Google Apps Script
 * ─────────────────────────────────────────────
 * SETUP STEPS:
 * 1. Go to https://script.google.com → New Project
 * 2. Paste this entire file
 * 3. Replace YOUR_GA4_PROPERTY_ID with your numeric Property ID
 *    (GA4 → Admin → Property Settings → Property ID — looks like 123456789)
 * 4. Click Deploy → New Deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Click Deploy → copy the Web App URL
 * 6. Add to your .env.uat:  GA4_PROXY_URL=https://script.google.com/macros/s/YOUR_ID/exec
 */

const GA4_PROPERTY_ID = "YOUR_GA4_PROPERTY_ID"; // e.g. "462718903"

function doGet() {
  try {
    const token = ScriptApp.getOAuthToken();

    const response = UrlFetchApp.fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport`,
      {
        method: "post",
        contentType: "application/json",
        headers: { Authorization: `Bearer ${token}` },
        payload: JSON.stringify({
          dateRanges: [{ startDate: "2020-01-01", endDate: "today" }],
          metrics: [{ name: "sessions" }],
        }),
        muteHttpExceptions: true,
      }
    );

    const data = JSON.parse(response.getContentText());
    const count = parseInt(data?.rows?.[0]?.metricValues?.[0]?.value ?? "0");

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, count }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, count: 0, error: e.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
