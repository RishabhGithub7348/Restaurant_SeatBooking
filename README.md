# Restaurant_SeatBooking
 
To start Vite with npm run dev in the client folder and npm start in the server folder, follow these steps:

## Client-side (Vite):

Make sure you have Node.js and npm (Node Package Manager) installed on your machine. You can download them from the official Node.js website: https://nodejs.org/

Open your terminal or command prompt and navigate to the root directory of your client-side project.

Navigate to the client folder within your project directory:

```bash
cd client
``` 

Install the project dependencies by running the following command:

```bash
npm install
```
Once the installation is complete, start Vite development server by running the following command:

```bash
npm run dev
```

This command will build your client-side project and launch a local development server.

In your terminal, you should see output indicating that Vite is compiling your project and providing a local development URL (usually [http://localhost:5173/](http://localhost:5173/)). Open this URL in your web browser, and you should see your Vite application running.

Now you can make changes to your client-side project's source files. Vite will automatically detect the changes, recompile your project, and update the browser in real-time.

Server-side:

Open a new terminal or command prompt window without closing the Vite development server.

Navigate to the server folder within your project directory:

```bash
cd server
```

Install the server dependencies by running the following command:

```bash
npm install
```

Once the installation is complete, start the server by running the following command:

```bash
npm start
```

This command will launch the server and make it ready to handle requests from the client-side application.

Note: The server should be configured to listen on a specific port (e.g., port 3001). Make sure that the server's port does not conflict with the Vite development server's port (usually 3001). If there is a conflict, you may need to configure one of the servers to use a different port.

With both the Vite development server and the server running simultaneously, you can interact with your application in the browser while making API requests to the server for data or other server-side operations.





