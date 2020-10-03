import mqtt from 'async-mqtt';

const mqttConnection = (
  mqttConfig: mqtt.IClientOptions,
): mqtt.AsyncMqttClient => {
  return mqtt.connect({
    ...mqttConfig,
    clientId: 'dashboard',
    reconnectPeriod: 10000,
    clean: false,
  });
};

export { mqttConnection };
