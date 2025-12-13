# Manual Installation Guide

This guide explains how to manually install this custom Air Quality Card in your Home Assistant instance without using HACS.

## Prerequisites

- Access to your Home Assistant configuration directory (via SSH, Samba, File Editor add-on, etc.)
- The built `air-quality-card.js` file from the `dist/` folder

## Installation Steps

### 1. Locate your Home Assistant config directory

Your HA config directory is typically at:
- **Home Assistant OS / Supervised**: `/config/`
- **Docker**: Wherever you mounted the config volume
- **Core**: `~/.homeassistant/`

### 2. Create the www directory (if it doesn't exist)

```bash
mkdir -p /config/www/community/air-quality-card
```

### 3. Copy the card file

Copy `dist/air-quality-card.js` to:
```
/config/www/community/air-quality-card/air-quality-card.js
```

**Via SCP (from your dev machine):**
```bash
scp dist/air-quality-card.js root@homeassistant.local:/config/www/community/air-quality-card/
```

**Via Samba share:**
Copy the file to `\\homeassistant.local\config\www\community\air-quality-card\`

### 4. Copy the rating images

Copy the contents of the `img/` folder to your HA instance:
```bash
mkdir -p /config/www/airquality
cp img/*.png /config/www/airquality/
```

### 5. Add the resource to Lovelace

Go to **Settings > Dashboards > Resources** (enable Advanced Mode in your profile if you don't see it), then add:

- **URL**: `/local/community/air-quality-card/air-quality-card.js`
- **Type**: JavaScript Module

Or add manually to your `configuration.yaml`:
```yaml
lovelace:
  resources:
    - url: /local/community/air-quality-card/air-quality-card.js
      type: module
```

### 6. Restart Home Assistant

Restart HA or reload resources for changes to take effect.

### 7. Clear browser cache

Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R) to load the new card version.

## Updating the Card

To update, simply replace the `air-quality-card.js` file and clear your browser cache.

```bash
# Build new version
npm run build

# Copy to HA
scp dist/air-quality-card.js root@homeassistant.local:/config/www/community/air-quality-card/
```

## Replacing an Existing HACS Installation

If you previously installed via HACS and want to use your custom version:

1. **Option A - Override HACS version:**
   - Copy your built file to `/config/www/community/air-quality-card/air-quality-card.js`
   - This overwrites the HACS-managed file (HACS updates will overwrite your changes)

2. **Option B - Install alongside (recommended):**
   - Uninstall the HACS version first
   - Follow the installation steps above
   - Update your dashboard resource URL to point to your custom location

## Troubleshooting

**Card not showing up:**
- Check browser console for errors (F12)
- Verify the file exists at the correct path
- Ensure the resource URL matches the file location
- Clear browser cache

**"Custom element doesn't exist" error:**
- Resource not loaded - check the URL path
- Try restarting Home Assistant
- Check that the file isn't corrupted (should be ~28KB)
