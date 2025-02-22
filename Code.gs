// Configuration
const GOOGLE_TASK_LIST_ID = ''; // Optional: Specify a particular task list ID, or leave empty for default list

/**
 * Sets the Todoist API token securely in the script properties.
 * Run this function once to set up your token.
 * @param {string} token - Your Todoist API token
 */
function setTodoistToken(token) {
  if (!token) {
    throw new Error('Token cannot be empty');
  }
  PropertiesService.getScriptProperties().setProperty('TODOIST_API_TOKEN', token);
  Logger.log('Todoist API token has been securely stored');
}

/**
 * Gets the Todoist API token from script properties.
 * @returns {string} The Todoist API token
 */
function getTodoistToken() {
  const token = PropertiesService.getScriptProperties().getProperty('TODOIST_API_TOKEN');
  if (!token) {
    throw new Error('Todoist API token not found. Please run setTodoistToken() first.');
  }
  return token;
}

/**
 * Sets up a time-driven trigger to run the sync every 5 minutes.
 * Run this function once manually to set up the trigger.
 */
function createTimeTrigger() {
  // Delete any existing triggers to avoid duplicates
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // Create a new trigger that runs every 5 minutes
  ScriptApp.newTrigger('syncTasksToTodoist')
    .timeBased()
    .everyMinutes(5)
    .create();
    
  Logger.log('Trigger successfully created. The sync will run every 5 minutes.');
}

/**
 * Main function to sync tasks from Google Tasks to Todoist
 */
function syncTasksToTodoist() {
  try {
    const tasks = getIncompleteTasks();
    for (const task of tasks) {
      const todoistTask = createTodoistTask(task);
      if (todoistTask) {
        markGoogleTaskComplete(task);
        Logger.log(`Successfully synced task: ${task.title}`);
      }
    }
    Logger.log('Sync completed successfully');
  } catch (error) {
    Logger.log(`Error during sync: ${error.toString()}`);
  }
}

/**
 * Get all incomplete tasks from Google Tasks
 */
function getIncompleteTasks() {
  const taskLists = Tasks.Tasklists.list();
  const targetListId = GOOGLE_TASK_LIST_ID || taskLists.items[0].id;
  
  const tasks = Tasks.Tasks.list(targetListId, {
    showCompleted: false,
    showHidden: false
  });
  
  return tasks.items || [];
}

/**
 * Create a task in Todoist
 */
function createTodoistTask(googleTask) {
  const todoistEndpoint = 'https://api.todoist.com/rest/v2/tasks';
  
  const payload = {
    content: googleTask.title,
    description: googleTask.notes || '',
    due_date: googleTask.due ? new Date(googleTask.due).toISOString().split('T')[0] : null
  };
  
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getTodoistToken()}`,
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(payload)
  };
  
  try {
    const response = UrlFetchApp.fetch(todoistEndpoint, options);
    return JSON.parse(response.getContentText());
  } catch (error) {
    Logger.log(`Error creating Todoist task: ${error.toString()}`);
    return null;
  }
}

/**
 * Mark a Google Task as complete
 */
function markGoogleTaskComplete(task) {
  const taskLists = Tasks.Tasklists.list();
  const targetListId = GOOGLE_TASK_LIST_ID || taskLists.items[0].id;
  
  Tasks.Tasks.patch({
    status: 'completed'
  }, targetListId, task.id);
} 