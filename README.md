debs

* First clone the repo & `cd` into the newly created directory
* Next, run `npm install` in the project directory to install dependencies
* To place the "startup service" in the proper location, run the command `sudo cp droneservice.service /etc/systemd/system`
* Enable the service with `sudo systemctl enable timestamp.service`
* You can now reboot the device with `sudo reboot` and test to make sure you can view the local docs at `http://localhost:3000/get`
