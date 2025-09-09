## Testing a Plugin During Development

You can simulate plugin installation during development by copying its binaries and resources into the IDE’s plugin installation directory. The location of this directory depends on the environment:

* **Windows:** `%LocalAppData%\\Programs\\GeneXus Next\\plugins`
* **macOS:** `~/Library/Application Support/GeneXus Next/Plugins`
* **Linux:** `~/.config/GeneXus Next/plugins`
* **Web IDE:** `plugins` (relative to the container management scripts)

### Steps

1. **Create the plugin directory**
   Inside the plugin installation directory, create a folder named after the plugin ID, and add a `plugin.json` file:

   ```json
   {
     "id": "PluginSample", // Plugin ID
     "version": "0.0.1"   // Installed version (any value is valid)
   }
   ```

2. **Backend resources**
   Add a `backend` subdirectory containing all binaries and resources required by GeneXus BL (everything from `backend.zip`).

3. **Frontend resources**
   Add a `frontend` subdirectory containing the plugin bundle (everything from `frontend.zip`).

   Alternatively, instead of copying after every frontend change, create a `package.json` in the `frontend` directory with:

   ```json
   {
     "gxPlugin": {
       "baseUrl": "http://localhost:5200/", // Local dev server (watch mode)
       "bundle": "main.js" // Bundle name (without the 'dist' prefix)
     }
   }
   ```

### Restarting the IDE

After updating these directories, restart the IDE. If you’re using the Desktop application, the BL container restarts automatically, you just need to reload the IDE (restarting the app or reloading with CMD/Ctrl + R)
