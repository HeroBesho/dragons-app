// Adds the permissions the app needs and locks portrait mode
const fs = require('fs');
const f = 'android/app/src/main/AndroidManifest.xml';
let m = fs.readFileSync(f, 'utf8');
['CAMERA', 'VIBRATE', 'POST_NOTIFICATIONS'].forEach(p => {
  if (!m.includes('android.permission.' + p)) m = m.replace('</manifest>', '    <uses-permission android:name="android.permission.' + p + '" />\n</manifest>');
});
if (!m.includes('screenOrientation')) m = m.replace('<activity', '<activity android:screenOrientation="portrait"');
fs.writeFileSync(f, m);
console.log('Manifest patched');
