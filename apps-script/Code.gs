/**
 * Membership registration endpoint for the Bauchi State Chapter website.
 * Replace the existing Apps Script project code with this file, save, then
 * update the existing Web App deployment to a new version.
 */
const SPREADSHEET_ID = '1uMKwRX6P5u_4Q2-tijMzKGv5Ne1jVjGsxeypLBS1BSc';
const SHEET_NAME = 'Applications';

// This list is copied from the website's js/lga-data.js so ward validation
// matches the actual options shown to applicants.
const LGA_WARDS = {
  "Alkaleri": [
    "Alkaleri",
    "Birin/Gigara/Yankari",
    "Dan Kungibar",
    "Futuk",
    "Gar",
    "Gwana/Mansur",
    "Gwaram",
    "Maimadi",
    "Pali",
    "Yalo",
    "Yuli/Lim"
  ],
  "Bauchi": [
    "Birshi/Miri",
    "Dandango/Yamrat",
    "Dan'iya Hardo",
    "Dawaki",
    "Galambi/Gwaskwaram",
    "Kangyare/Turwun",
    "Kundum/Durum",
    "Majidadi A",
    "Majidadi B",
    "Makama/Sarki Baki",
    "Mun/Munsal",
    "Zungur/Liman Katagum"
  ],
  "Bogoro": [
    "BOI A",
    "BOI B",
    "BOI C",
    "Bogoro A",
    "Bogoro B",
    "Bogoro C",
    "Bogoro D",
    "Lusa A",
    "Lusa B",
    "Lusa C"
  ],
  "Dass": [
    "Bagel/Bajar",
    "Baraza",
    "Bundot",
    "Bununu Central",
    "Bununu South",
    "Dott",
    "Durr",
    "Polchi",
    "Wandi",
    "Zumbul/Lukshi"
  ],
  "Kirfi": [
    "Badara",
    "Bara",
    "Beni A",
    "Beni B",
    "Dewu Central",
    "Dewu East",
    "Kirfi",
    "Shango",
    "Tubule",
    "Wanka"
  ],
  "Tafawa Balewa": [
    "Ball",
    "Bula",
    "Bununu",
    "Dajin",
    "Dull",
    "Kardam A",
    "Kardam B",
    "Lere South",
    "Lere North",
    "Tapshin",
    "Wai"
  ],
  "Toro": [
    "Jama'a/Zaranda",
    "Lame",
    "Mara/Palama",
    "Rahama",
    "Rauta/Geji",
    "Ribina",
    "Tama",
    "Tilden Fulani",
    "Toro/Tulai",
    "Wonu",
    "Zalau/Rishi"
  ],
  "Dambam": [
    "Dagauda",
    "Dambam",
    "Gargawa",
    "Garuza",
    "Gurbana",
    "Jalam Central",
    "Jalam East",
    "Yame",
    "Yanda",
    "Zaura"
  ],
  "Darazo": [
    "Darazo",
    "Gabarin",
    "Gabciyari",
    "Konkiyal",
    "Lago",
    "Lanzai",
    "Papa",
    "Sade",
    "Tauya",
    "Wahu",
    "Yautare"
  ],
  "Ganjuwa": [
    "Gungura",
    "Kafin Madaki",
    "Kariya",
    "Kubi East",
    "Kubi West",
    "Miya East",
    "Miya West",
    "Nasarawa South",
    "Nasarawa North",
    "Yali"
  ],
  "Misau": [
    "Ajilin/Gugulin",
    "Beti",
    "Gwaram",
    "Hardawa",
    "Jarkasa",
    "Kukadi/Gundari",
    "Sarma/Akuyam",
    "Sirko",
    "Tofu",
    "Zadawa"
  ],
  "Ningi": [
    "Balma",
    "Bashe",
    "Burra/Kyata",
    "Dingis",
    "Jangu",
    "Kudu/Yamma",
    "Kurmi",
    "Nasaru",
    "Ningi",
    "Sama",
    "Tiffi/Guda"
  ],
  "Warji": [
    "Baima South/East",
    "Baima North/West",
    "Dagu East",
    "Dagu West",
    "Gabanga",
    "Katanga",
    "Kilbori",
    "Rangan",
    "Tiyin",
    "Tudun Wada West"
  ],
  "Gamawa": [
    "Alagarno/Jadori",
    "Gadiya",
    "Gamawa",
    "Gololo",
    "Kafin Romi",
    "Kubdiya",
    "Raga",
    "Tarmasuwa",
    "Tumbi",
    "Udubo",
    "Zindi"
  ],
  "Giade": [
    "Chinkani",
    "Doguwa South",
    "Doguwa Central",
    "Giade",
    "Isawa",
    "Sabon Sara",
    "Uzum A",
    "Uzum B",
    "Zabi",
    "Zirrami"
  ],
  "Itas/Gadau": [
    "Abdallawa/Magarya",
    "Bambal",
    "Bilkicheri",
    "Buzawa",
    "Gadau",
    "Gwarai",
    "Itas",
    "Kashuri",
    "Mashema",
    "Zubuki"
  ],
  "Jama'are": [
    "Dogon Jeji A",
    "Dogon Jeji B",
    "Dogon Jeji C",
    "Galdimari",
    "Hanafari",
    "Jama'are A",
    "Jama'are B",
    "Jama'are C",
    "Jama'are D",
    "Jurara"
  ],
  "Katagum": [
    "Bulkachuwa/Dagaro",
    "Buskuri",
    "Chinade",
    "Gambaki/Bidir",
    "Madachi/Gangai",
    "Madangala",
    "Madara",
    "Nasarawa Bakin Kasuwa",
    "Ragwam/Magonshi",
    "Tsakuwa Kofar Gabas/Kofar Kuka",
    "Yayu"
  ],
  "Shira": [
    "Andubun",
    "Beli/Gagidaba",
    "Bukul/Bangire",
    "Disina",
    "Faggo",
    "Kilbori",
    "Sambuwal",
    "Shira",
    "Tsafi",
    "Tumfafi",
    "Zubo"
  ],
  "Zaki": [
    "Alangawari/Kafin/Larabawa",
    "Bursali",
    "Gumai",
    "Katagum",
    "Mainako",
    "Maiwa",
    "Makawa",
    "Murmur South",
    "Murmur North",
    "Sakwa",
    "Tashena/Gadai"
  ]
};

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const data = (e && e.parameter) ? e.parameter : {};
    const required = ['fullName', 'phone', 'state', 'lga', 'ward', 'pollingUnit', 'consent'];
    for (const field of required) {
      if (!String(data[field] || '').trim()) throw new Error('Missing required field: ' + field);
    }
    if (data.state !== 'Bauchi') throw new Error('Applications are limited to Bauchi State.');
    if (!Object.prototype.hasOwnProperty.call(LGA_WARDS, data.lga)) throw new Error('Invalid LGA selected.');
    if (!LGA_WARDS[data.lga].includes(data.ward)) throw new Error('The selected ward does not belong to the selected LGA.');
    if (data.consent !== 'Yes') throw new Error('Consent is required.');
    if (String(data.fullName).length > 120 || String(data.phone).length > 20 || String(data.pollingUnit).length > 120) {
      throw new Error('One or more fields exceed the allowed length.');
    }
    if (data.accountNumber && !/^\d{10}$/.test(data.accountNumber)) throw new Error('Account number must contain 10 digits.');

    const bank = [data.accountNumber || '', data.accountName || '', data.bankName || ''];
    const anyBank = bank.some(v => String(v).trim() !== '');
    if (anyBank && bank.some(v => !String(v).trim())) throw new Error('Complete all bank fields or leave them blank.');

    lock.waitLock(10000);
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Applications sheet was not found.');

    // Prevent spreadsheet formula injection from submitted text.
    const safe = value => {
      const s = String(value || '').trim();
      return /^[=+\-@]/.test(s) ? "'" + s : s;
    };

    sheet.appendRow([
      new Date(), safe(data.fullName), safe(data.phone), 'Bauchi',
      safe(data.lga), safe(data.ward), safe(data.pollingUnit),
      safe(data.accountNumber), safe(data.accountName), safe(data.bankName),
      'Pending', anyBank ? 'Pending review' : 'Not applicable', ''
    ]);
    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse({ success: false, message: String(error.message || error) });
  } finally {
    try { if (lock.hasLock()) lock.releaseLock(); } catch (_) {}
  }
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
