# Word Explorer - Android Build Guide

This guide will help you build the Word Explorer app as an Android APK for the Google Play Store using Capacitor.

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v18 or higher)
   ```bash
   node --version
   ```

2. **Android Studio** (latest version)
   - Download from: https://developer.android.com/studio
   - During installation, ensure you install:
     - Android SDK
     - Android SDK Platform-Tools
     - Android SDK Build-Tools

3. **Java Development Kit (JDK 17)**
   ```bash
   java --version
   ```

## Setup Steps

### Step 1: Install Dependencies

```bash
cd matchingsightwords
npm install
```

### Step 2: Initialize Capacitor (First Time Only)

If the android folder doesn't exist yet:

```bash
npx cap add android
```

### Step 3: Sync Web Assets to Android

After any changes to your web files:

```bash
npx cap sync android
```

### Step 4: Configure Android Resources

Copy the resource files to the Android project:

```bash
# Copy colors.xml
cp resources/android/colors.xml android/app/src/main/res/values/colors.xml

# Copy strings.xml (merge with existing if needed)
cp resources/android/strings.xml android/app/src/main/res/values/strings.xml
```

### Step 5: App Icons

Replace the default icons with your app icons:

1. Create icons in the following sizes:
   - `mipmap-mdpi`: 48x48 px
   - `mipmap-hdpi`: 72x72 px
   - `mipmap-xhdpi`: 96x96 px
   - `mipmap-xxhdpi`: 144x144 px
   - `mipmap-xxxhdpi`: 192x192 px

2. Place them in: `android/app/src/main/res/mipmap-*/`

You can use Android Studio's Image Asset Studio:
- Right-click `res` folder → New → Image Asset

### Step 6: Splash Screen

Create splash screen images:

1. Place your splash image in:
   `android/app/src/main/res/drawable/splash.png`

2. The splash screen uses the warm pink background (#FCEAE6) configured in capacitor.config.json

## Building the APK

### Debug Build (for testing)

```bash
# Using npm script
npm run android:debug

# Or directly
cd android
./gradlew assembleDebug
```

The debug APK will be at:
`android/app/build/outputs/apk/debug/app-debug.apk`

### Release Build (for Play Store)

#### Step 1: Generate a Signing Key

```bash
keytool -genkey -v -keystore word-explorer-release.keystore -alias word-explorer -keyalg RSA -keysize 2048 -validity 10000
```

**IMPORTANT:** Keep this keystore file safe! You'll need it for all future updates.

#### Step 2: Configure Signing in Gradle

Edit `android/app/build.gradle` and add inside the `android { }` block:

```gradle
signingConfigs {
    release {
        storeFile file('word-explorer-release.keystore')
        storePassword 'your_keystore_password'
        keyAlias 'word-explorer'
        keyPassword 'your_key_password'
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

#### Step 3: Build Release APK

```bash
cd android
./gradlew assembleRelease
```

The release APK will be at:
`android/app/build/outputs/apk/release/app-release.apk`

### Build AAB (Android App Bundle) for Play Store

Google Play Store prefers AAB format:

```bash
cd android
./gradlew bundleRelease
```

The AAB will be at:
`android/app/build/outputs/bundle/release/app-release.aab`

## Opening in Android Studio

To open the project in Android Studio for advanced configuration:

```bash
npx cap open android
```

## Testing on Device

### Using ADB (Android Debug Bridge)

1. Enable Developer Options on your Android device
2. Enable USB Debugging
3. Connect your device via USB
4. Install the APK:

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Using Emulator

1. Open Android Studio
2. Tools → Device Manager
3. Create a virtual device
4. Run the app on the emulator

## Google Play Store Submission

### Required Assets

1. **App Icon**: 512x512 px (PNG, 32-bit)
2. **Feature Graphic**: 1024x500 px
3. **Screenshots**: At least 2 screenshots
   - Phone: 16:9 aspect ratio (e.g., 1080x1920)
   - Tablet (optional): 16:9 or 3:2

### Store Listing Information

- **App Name**: Word Explorer
- **Short Description**: A fun sight word matching game for children
- **Full Description**:
  ```
  Word Explorer is an educational game designed to help children learn sight words through fun and engaging card-matching gameplay.

  Features:
  • 300+ sight words across Easy, Medium, and Hard difficulty levels
  • Beautiful, child-friendly interface with warm colors
  • Text-to-speech pronunciation of words
  • Progress tracking with stars and rewards
  • Dark mode support
  • Works offline - no internet required

  Perfect for:
  • Pre-K to 2nd grade students
  • Parents teaching reading at home
  • Teachers in classroom settings
  ```

- **Category**: Education
- **Content Rating**: Everyone

### Privacy Policy

You'll need a privacy policy URL. Since this app:
- Does NOT collect personal data
- Does NOT require account creation
- Works completely offline

You can use a simple privacy policy stating no data is collected.

## Troubleshooting

### Common Issues

1. **Gradle build fails**
   ```bash
   cd android
   ./gradlew clean
   ./gradlew assembleDebug
   ```

2. **SDK not found**
   - Set ANDROID_HOME environment variable
   - Or create `android/local.properties` with:
     ```
     sdk.dir=/path/to/Android/Sdk
     ```

3. **Java version mismatch**
   - Ensure JDK 17 is installed and JAVA_HOME is set

4. **Capacitor sync issues**
   ```bash
   npx cap sync android --force
   ```

## Version Updates

When updating the app version, edit `android/app/build.gradle`:

```gradle
defaultConfig {
    versionCode 2  // Increment for each release
    versionName "1.0.1"  // User-visible version
}
```

## Support

For issues with this build configuration, please open an issue on the GitHub repository.
