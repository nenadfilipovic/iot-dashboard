import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://emqx', {
  username: 'app',
  password: 'app',
});

client.on('connect', function () {
  client.subscribe('#', function (err) {});
});

client.on('message', function (topic, message) {
  let message_str = message.toString(); //convert byte array to string
  message_str = message_str.replace(/\n$/, ''); //remove new line
  //payload syntax: clientID,topic,message
  console.log(message_str, topic);
});
