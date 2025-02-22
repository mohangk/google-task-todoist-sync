# Google Tasks to Todoist Sync

This Google Apps Script automatically syncs incomplete tasks from Google Tasks to Todoist and marks them as complete in Google Tasks after successful syncing.

## Features

- Automatically syncs incomplete Google Tasks to Todoist every 5 minutes
- Transfers task title, description, and due date
- Automatically marks synced tasks as complete in Google Tasks
- Runs completely in the background

## Setup Instructions

1. **Create a New Google Apps Script Project**
   - Go to [script.google.com](https://script.google.com)
   - Click "New Project"
   - Copy the contents of `Code.gs` into the editor

2. **Enable Google Tasks API**
   - In your Apps Script project, click on "Services" (+ icon)
   - Search for "Tasks API" and enable it
   - Click "Add"

3. **Get Todoist API Token**
   - Log in to your Todoist account
   - Go to Settings → Integrations
   - Copy your API token

4. **Configure the Script**
   - Get your Todoist API token:
     1. Log in to your Todoist account
     2. Go to Settings → Integrations
     3. Copy your API token
   
   - Set your token using the Apps Script UI:
     1. Open the script in your browser (`clasp open`)
     2. Find the `setMyToken` function at the top of the script
     3. Replace `"your-actual-token-here"` with your actual Todoist token
     4. Select `setMyToken` from the function dropdown at the top
     5. Click the "Run" button (play icon)
     6. After successful execution:
        - IMPORTANT: Change the token back to `"your-actual-token-here"` or delete it from the code
        - You can also delete the entire `setMyToken` function if you wish
        - Your token is now securely stored and you don't need the function anymore
   
   - Optionally, specify a `GOOGLE_TASK_LIST_ID` if you want to sync from a specific task list
   - Your token is now securely stored in the Script Properties and won't be visible in the code

5. **Set Up the Automatic Trigger**
   - After saving your changes, you must manually run the `createTimeTrigger` function ONCE:
     1. In the script editor, select `createTimeTrigger` from the function dropdown at the top
     2. Click the "Run" button (play icon)
     3. Grant any permissions requested
   - This one-time setup will create an automatic trigger that runs the sync every 5 minutes
   - You don't need to run this function again unless you want to reset the trigger
   - You can verify the trigger is set up by clicking on "Triggers" in the left sidebar of the script editor

## Notes

- The script will automatically run every 5 minutes
- Only incomplete tasks will be synced
- After successful sync to Todoist, the original Google Task will be marked as complete
- Check the Apps Script logs for any errors or sync status

## Troubleshooting

If you encounter any issues:
1. Check that the Todoist API token is correctly set
2. Verify that the Google Tasks API is enabled
3. Look at the Apps Script logs for error messages
4. Ensure you have tasks in your Google Tasks list
5. Check that the time-based trigger is set up by going to "Triggers" in the Apps Script editor

## Security Features

### Todoist Token Storage
The Todoist API token is stored using Google Apps Script's Properties Service


## Deployment Options

### Option 1: Web UI Deployment
Follow the setup instructions above using the Google Apps Script web interface by copying the code from `Code.gs` into the editor.

### Option 2: CLI Deployment (Recommended)
You can deploy and manage this script using `clasp` (Command Line Apps Script Projects):

1. **Install clasp globally**
   ```bash
   npm install -g @google/clasp
   ```

2. **Login to Google**
   ```bash
   clasp login
   ```

3. **Create a new Apps Script project**
   ```bash
   clasp create --type standalone --title "Google Tasks Todoist Sync"
   ```
   This will create a `.clasp.json` file with your script ID. This file is specific to your deployment and is git-ignored.
   
   Note: Each developer should create their own Apps Script project. Do not share or commit your `.clasp.json` file.

4. **Enable the Google Apps Script API**
   - Visit https://script.google.com/home/usersettings
   - Enable "Google Apps Script API"

5. **Push the code to Apps Script**
   ```bash
   clasp push
   ```

6. **Open the project in browser (optional)**
   ```bash
   clasp open
   ```

7. **Watch for changes (during development)**
   ```bash
   clasp push --watch
   ```

After deployment, you still need to:
1. Enable the Tasks API in the Apps Script project
2. Add your Todoist API token using the `setMyToken` function described above
3. Run `createTimeTrigger` once to set up the automatic sync

### Useful clasp commands
- `clasp pull` - Pull latest code from Apps Script
- `clasp status` - Show current deployment status
- `clasp logs` - Show recent logs
- `clasp deployments` - List all deployments
- `clasp deploy` - Create a new deployment 