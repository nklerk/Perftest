# Perftest

This script is build to tests ir performance of any IP connected ir Sending device..
This stript uses the device API to send a ir command and listens to a key press to register the received ir command.

I've used the Flirc V2 dongle to receive the ir requests. the dongle was set to use the MCE profile.

## Process:

Interval of ## Seconds {

    Register Time 1
    Send API request
    Receive ir (Keypress)
    Register Time 2
    Calculate time between Time1 and Time2

}


## How to use:

- Install NodeJS.
- Download the code from "https://github.com/nklerk/Perftest/archive/master.zip"
- Extract the files from Perftest-master.zip.
- Using console go inside the extracted files. and install dependancies using the cli command "npm install".
- Edit the index.js file with a text editor and chnage the host, io and pronto hex.
- Run the code within a console and use the cli command "node index.js".
