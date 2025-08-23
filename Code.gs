function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // إعدادات واتساب كلود API (من Meta)
    var TOKEN = 'PASTE_YOUR_WHATSAPP_TOKEN';
    var PHONE_NUMBER_ID = 'PASTE_YOUR_PHONE_NUMBER_ID';

    // رسالة نصية هتوصل لرقمك
    var to = '201002137288'; // ← بدّل لرقمك الدولي
    var text =
      'طلب جديد — ' +
      '\nالاسم: ' + (data.name||'') +
      '\nالبريد: ' + (data.email||'') +
      '\nالهاتف: ' + (data.phone||'') +
      '\nالدولة: ' + (data.country||'') +
      '\nالتفاصيل: ' + (data.msg||'') +
      '\nكود الخصم: ' + (data.coupon||'—');

    var url = 'https://graph.facebook.com/v17.0/' + PHONE_NUMBER_ID + '/messages';
    var payload = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'text',
      text: { body: text }
    };

    var res = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      headers: { Authorization: 'Bearer ' + TOKEN },
      muteHttpExceptions: true
    });

    return ContentService.createTextOutput(JSON.stringify({ ok: true, res: res.getResponseCode() }))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
