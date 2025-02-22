# Google Tasks to Todoist Sync

This Google Apps Script automatically syncs incomplete tasks from Google Tasks to Todoist and marks them as complete in Google Tasks after successful syncing.

## Features

- Automatically syncs incomplete Google Tasks to Todoist every 5 minutes
- Transfers task title, description, and due date
- Automatically marks synced tasks as complete in Google Tasks
- Runs completely in the background

## Setup Instructions

First, choose how you want to create and deploy the project:

### Option 1: Web UI Setup
1. **Create Project**
   - Go to [script.google.com](https://script.google.com)
   - Click "New Project"
   - Copy the contents of `Code.gs` into the editor

2. **Enable Google Tasks API**
   - Click on "Services" (+ icon)
   - Search for "Tasks API" and enable it
   - Click "Add"

### Option 2: CLI Setup (Recommended)
1. **Install and Configure clasp**
   ```bash
   npm install -g @google/clasp
   clasp login
   ```

2. **Create and Deploy Project**
   ```bash
   # Create new project
   clasp create --type standalone --title "Google Tasks Todoist Sync"
   
   # Push the code
   clasp push
   
   # Open in browser to complete setup
   clasp open
   ```

3. **Enable APIs**
   - Enable Google Apps Script API at https://script.google.com/home/usersettings
   - In the script editor, enable Tasks API under "Services"

### Required Configuration (Both Methods)

After setting up the project using either method above, you need to:

1. **Configure Todoist Token**
   - Get your token from Todoist (Settings → Integrations)
   - Find the `setMyToken` function in the script
   - Replace `"your-actual-token-here"` with your token
   - Run the `setMyToken` function
   - IMPORTANT: Remove your token from the code after it's stored
   
2. **Set Up Auto-Sync**
   - Run the `createTimeTrigger` function
   - Grant any requested permissions
   - The script will now sync every 5 minutes

## Security Features

### Todoist Token Storage
The Todoist API token is stored using Google Apps Script's Properties Service

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

## Development

### Useful clasp commands
- `clasp pull` - Pull latest code from Apps Script
- `clasp status` - Show current deployment status
- `clasp logs` - Show recent logs
- `clasp deployments` - List all deployments
- `clasp deploy` - Create a new deployment
- `clasp push --watch` - Auto-push changes during development 