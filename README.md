# StereoController
A Node.js application to control some relays in a stereo with Apple Home Kit

# Installation

To install and run this application follow the steps below. When node index has been run nothing will display in console,<br> 
but the application is up and running is no errors has been displayed.

When the application is up and running you should be able to add the 4 different relays in Apple home kit app.
    <ul>
        <li>Clone this repo</li>
        <li>npm install -g</li>
        <li>node index</li>
    </ul>

# Installation as a service, Raspberry Pi with node version management, nvm
To run this application as a service in your raspberry pi you have to folow these steps.

Make sure that your Node.js version is the same if you type "node -v" or "sudo node -v"

If not you have to remove the node and npm folder from the /usr/local/bin and then run these two commands.

```sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/node" "/usr/local/bin/node"```
```sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npm" "/usr/local/bin/npm"```

Once you have made sure that the node version are the same, you have to get the path to your installed node version.

To do this run the command "which node" and you will get the path printed.

Next step is to edit the StereoController.service file, and change the search path of the "WorkingDirectory" to be appropriate to yours.

In the ExecStart variable input the path that you got when running the "which node" command en replace "/node" with "/node index.js"

Once this is done, save the file and open a terminal with the scope in the same folder as this file.

Then you can run this command and the application will be installed as a service.

```sudo cp StereoController.service /etc/systemd/system```

To enable the service to start at startup run the following command:

```sudo systemctl enable StereoController.service```

If you want to test run the serivce you can do that with this command:

```sudo systemctl start timestamp.service```

And to stop it, use this command:

```sudo systemctl stop timestamp.service```

And to see a log over services and to see that nothing has crashed, use this command.

```Journalctl -b -e```