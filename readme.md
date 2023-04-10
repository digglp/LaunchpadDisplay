# NodeJS Launchpad Mini Digital Clock
Launchpad clock turns the Launchpad Mini into a digital clock.

This NodeJS console application allows you to turn your Launchpad Mini device into a digital clock. The time is displayed on the 8x8 grid.

![Screenshot](LaunchpadClock.jpg)


## Requirements

To use this application, you will need:

-   A Launchpad Mini device
-   NodeJS installed on your computer
-

## Installation

1.  Clone or download the repository to your local machine.
2.  In the project directory, run `npm install` to install the required packages.

## Installing on a Raspberry Pi

1. install `sudo apt-get install libasound2-dev`
## Usage

1.  Connect your Launchpad Mini device to your computer.
2.  In the project directory, run `npx ts-node src/application/console.ts -i` to get a list of the midi port names. (e.g. Launchpad Mini)
3.  Copy to midi port name to the config.json file
4.  run the application with `npx ts-node src/application/console.ts -c config.json`
5.  The application will display the current time on your Launchpad Mini device.



## temp


1. in kaluma shell setup wifi and password

> storage.setItem('WIFI_SSID', 'xxxxxxx');
> storage.setItem('WIFI_PASSWORD', 'xxxxxxxx');


2. Bundle and send code to pico-w
npm run install


