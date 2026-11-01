# Dragons (Android app)

Offline app. Builds an installable APK for free with GitHub Actions. No app store needed.

## Build the APK with GitHub (no PC tools needed)
1. Create a free GitHub repository (private is fine).
2. Upload everything in this folder, including the hidden `.github` folder.
   If your browser hides it: in the repo choose Add file > Create new file, name it
   `.github/workflows/build-apk.yml` and paste the contents of that file.
3. Open the repo's Actions tab, choose "Build APK", press Run workflow.
4. After about 6 to 10 minutes open the repo's Releases page and download `app-debug.apk`.
5. Open the APK on your phone and allow "Install unknown apps" when asked.

## Build with Android Studio instead
    npm install
    node scripts/fetch-media.js
    npx cap add android
    node scripts/patch-android.js
    npx cap sync android
    npx cap open android      (then Build > Build APK)

## What is inside
- Full Dragons app, works offline.
- About 800 exercises with photos and instructions (public domain, free-exercise-db), downloaded at build time.
- Water reminders as real phone notifications (scheduled for 7:00 to 23:00).
- Not included yet: on-device AI, and food photos.
