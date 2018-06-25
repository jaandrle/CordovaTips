## [Android] Potvrzeni licence
- Pri "cordova build" se obevi podobna chyba: "You have not accepted the license agreements of the following SDK components: [Android SDK Platform 26]."
- `android update sdk --no-ui --filter build-tools-26.0.0,android-26,extra-android-m2repository`
- alternativně příkazy `*/tools/bin/sdkmanager --licenses`, kde `*` je `%ANDROID_HOME%` (win) / `$ANDROID_HOME` (ostatní)

## [Android] Buildění - repozitáře + vynucení verze SDK pro pluginy
- Zdroje:
  - [more than one library with package name 'com.google.android.gms.license](https://github.com/ionic-team/ionic/issues/14205)
  - [Android: After new Release of Google Play services as on 20/03/2018, Not able to build apk.](https://github.com/arnesson/cordova-plugin-firebase/issues/610)
  - [Error:Failed to resolve: android.arch.core:common:1.1.0](https://stackoverflow.com/questions/49839322/errorfailed-to-resolve-android-arch-corecommon1-1-0)
- **`maven { url 'https://jitpack.io' }`:**
  ```c++
    // Allow plugins to declare Maven dependencies via build-extras.gradle.
    allprojects {
        repositories {
            mavenCentral();
            maven { url "https://maven.google.com" }
            jcenter()
            maven { url 'https://jitpack.io' }
        }
    }
- **...`useVersion('26.0.0')`:**
  ```c++
    configurations.all {
      resolutionStrategy.eachDependency { DependencyResolveDetails details ->
        // Pin the support library version so that all libraries use the same one
          if (details.getRequested().getGroup() == 'com.android.support') {
            details.useVersion('26.0.0')
          }
        }
    }
