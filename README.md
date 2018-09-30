# debs

## To get the Node code running and set up the startup service
* First clone the repo & `cd` into the newly created directory
* Next, run `npm install` in the project directory to install dependencies
* To place the "startup service" in the proper location, run the command `sudo cp dronescript.service /etc/systemd/system`
* Enable the service with `sudo systemctl enable dronescript.service`
* You can now reboot the device with `sudo reboot` and test to make sure you can view the local docs at `http://localhost:3000/get`


## To Install Docker on Pi
* `curl -fsSL get.docker.com -o get-docker.sh && sh get-docker.sh`

