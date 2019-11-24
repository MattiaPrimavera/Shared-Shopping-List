# Generate icon and splash screen for different devices (iOS & android & web)
npx pwa-asset-generator --icon-only src/assets/icons/launch.html src/assets/icons --index src/index.html --manifest src/manifest.webmanifest -q 80
npx pwa-asset-generator --splash-only src/assets/images/splash.html src/assets/icons --index src/index.html --manifest src/manifest.webmanifest -q 80