![IOT-Dashboard](<https://github.com/nenadfilipovic/iot-dashboard/blob/master/IOT%20Dashboard%20(Stack).svg>)

# IOT Dashboard

Complete system that enables you to receive, store and monitor your sensor data.

## Getting Started

Clone this repository:

```
git clone https://github.com/nenadfilipovic/iot-dashboard
```

### Prerequisites

To use this app you need to have docker and docker-compose installed on local computer.

If you want to continue to develop this app in containers, VS-Code plugins are also required, like this [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack), of course you also need to have wsl2 installed.

### Installing

Installing is simple as running `docker-compose up` inside root folder where docker-compose.yml file is located.

If you want to run it from VS-Code you can install [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) extension that enables you to run docker files from editor without using docker cli.

App opens two ports for communication, 80 for accessing dashboard and 1883 for publishing mqtt messages. Mqtt messages should be in JSON format, any request that is not valid JSON will be rejected.

EMQX broker inside app expects you to provide username and password for authentication, here you should use same credentials you used to register account.
For access validation EMQX uses acl config lists, app is designed in such way that broker only accepts topics in form of `username/device channel`. MQTT clients will probably use term deviceId so you should provide device channel in place of deviceId.

For testing MQTT path use [MQTTX](https://mqttx.app/) app by creators of EMQX broker.

## Running the tests

-

### Break down into end to end tests

-

### And coding style tests

-

## Deployment

This app is intended to be run on local network but it can be easily deployed to any host supporting containers.

Open browser, go to localhost and you will be presented with login screen.

Will maybe add in future configuration for kubernetes and github actions to automatically deploy images on commit.

## Built With

- [NodeJS](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [PM2](https://pm2.keymetrics.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [EMQX](https://www.emqx.io/)
- [TypeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)
- [JWT](https://jwt.io/)
- [InfluxDB](https://www.influxdata.com/)
- [Nginx](https://www.nginx.com/)
- [React](https://reactjs.org/)
- [Material-UI](https://material-ui.com/)
- [Redux](https://redux.js.org/)

## Authors

- **Nenad Filipovic** - _Initial work_ - [nenadfilipovic](https://github.com/nenadfilipovic)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Flaticon](https://www.flaticon.com/)
- [Worldvectorlogo](https://worldvectorlogo.com/)
