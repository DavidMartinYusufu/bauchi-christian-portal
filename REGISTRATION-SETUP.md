# Membership registration — backend connection

The website form is now configured to send URL-encoded submissions to the supplied Google Apps Script Web App URL.

## IMPORTANT: update the Apps Script code before testing
The earlier server code used a hand-written LGA allowlist that did not match the 20 LGAs and wards in this website. The replacement code is included at `apps-script/Code.gs` and validates the selected ward against the selected LGA.

1. Open the Google Sheet and choose **Extensions → Apps Script**.
2. Replace the existing project code with the contents of `apps-script/Code.gs`.
3. Save the project.
4. Choose **Deploy → Manage deployments**.
5. Edit the existing Web App deployment (pencil icon), select **New version**, and deploy. Keep **Execute as: Me** and **Who has access: Anyone**.
6. The deployment URL should remain the same. If Google gives you a different URL, update `GOOGLE_APPS_SCRIPT_URL` in `js/registration.js` to that new URL.

## Test before publishing
Submit one clearly labelled test application using information you are comfortable using for a test. Confirm a new row appears in the private `Applications` sheet, with Application status `Pending`. Then remove the test row if appropriate.

## Browser response limitation
The site uses a cross-origin `no-cors` request so the browser can send the form to Apps Script. Browsers do not expose the server's JSON response in this mode. Therefore the website says the request was sent, not that the sheet has definitively confirmed it. Verify that the test row appears in Google Sheets before treating the form as live.

Keep the spreadsheet private and share it only with authorised administrators. Bank details remain optional. Never collect PINs, passwords, card details or OTPs.
