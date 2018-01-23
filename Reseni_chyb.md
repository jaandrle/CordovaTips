## Potvrzeni licence
- Pri "cordova build" se obevi podobna chyba: "You have not accepted the license agreements of the following SDK components: [Android SDK Platform 26]."
- `android update sdk --no-ui --filter build-tools-26.0.0,android-26,extra-android-m2repository`
- alternativně příkazy `*/tools/bin/sdkmanager --licenses`, kde `*` je `%ANDROID_HOME%` (win) / `$ANDROID_HOME` (ostatní)
