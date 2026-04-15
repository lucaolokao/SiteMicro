const imgs = {
  arduino: 'https://ae01.alicdn.com/kf/S6a6fa2c0c5e7483ea80bfce9d4a8bd54z.jpg',
  nano: 'https://ae01.alicdn.com/kf/HTB1YDCJRVXXXXXRXpXXq6xXFXXX2.jpg',
  mega: 'https://ae01.alicdn.com/kf/HTB1RCMXPFXXXXX_XpXXq6xXFXXXp.jpg',
  esp32: 'https://ae01.alicdn.com/kf/S0cf07ef74fc44f12b6ac2da4c1ce7dc8J.jpg',
  esp8266: 'https://ae01.alicdn.com/kf/Sda7a33e0abf34f71aa79ce0bb2e30afbz.jpg',
  dht11: 'https://ae01.alicdn.com/kf/HTB1iYsmHXXXXXcGXFXXq6xXFXXXq.jpg',
  dht22: 'https://ae01.alicdn.com/kf/HTB1NJCuHXXXXXacXVXXq6xXFXXXt.jpg',
  hcsr04: 'https://ae01.alicdn.com/kf/HTB1wC3SHXXXXX_3apXXq6xXFXXXb.jpg',
  oled: 'https://ae01.alicdn.com/kf/Sc68cc67ded594a56b2eb90a249e8fcca1.jpg',
  lcd: 'https://ae01.alicdn.com/kf/HTB1jNPvHXXXXXbMapXXq6xXFXXXJ.jpg',
  servo: 'https://ae01.alicdn.com/kf/HTB1UQy2HXXXXXb4aXXXq6xXFXXXk.jpg',
  stepper: 'https://ae01.alicdn.com/kf/HTB1bKK8HXXXXXcaXFXXq6xXFXXXe.jpg',
  l298n: 'https://ae01.alicdn.com/kf/HTB1NjqNHXXXXXcwXpXXq6xXFXXXm.jpg',
  hc05: 'https://ae01.alicdn.com/kf/HTB1UlaNHXXXXXcGapXXq6xXFXXXc.jpg',
  nrf24: 'https://ae01.alicdn.com/kf/HTB1U3GyHXXXXXXcXVXXq6xXFXXXp.jpg',
  lm2596: 'https://ae01.alicdn.com/kf/HTB1JdWXHXXXXXcfaFXXq6xXFXXXH.jpg',
  resistors: 'https://ae01.alicdn.com/kf/HTB1hF3aHXXXXXaJaXXXq6xXFXXXg.jpg',
  leds: 'https://ae01.alicdn.com/kf/HTB1UhiZHXXXXXXyaXXXq6xXFXXX7.jpg',
  breadboard: 'https://ae01.alicdn.com/kf/HTB1GBiOHXXXXXX3XVXXq6xXFXXXL.jpg',
  multimeter: 'https://ae01.alicdn.com/kf/HTB1aCXaHXXXXXXJaXXXq6xXFXXXu.jpg',
  mpu6050: 'https://ae01.alicdn.com/kf/Sed4af1b8d0054c11b47e9de6568e5c6af.jpg',
  pir: 'https://ae01.alicdn.com/kf/HTB1Lp8bHXXXXXcEaXXXq6xXFXXXy.jpg',
  bmp280: 'https://ae01.alicdn.com/kf/Sfcb35abd84df44a3ac63f9d2abfef6ceM.jpg',
  lora: 'https://ae01.alicdn.com/kf/Sc8c2a5de7a0c42b7be2c8f60ad5a71bcR.jpg',
  tp4056: 'https://ae01.alicdn.com/kf/HTB1M_CSHXXXXX_0apXXq6xXFXXXd.jpg',
  tft: 'https://ae01.alicdn.com/kf/S3b29f5e789904c3b9c09e2dace5d6ac4L.jpg',
  wemos: 'https://ae01.alicdn.com/kf/S50f7f5b5c1d447e9ab9cdaeb57e2abd4j.jpg',
  espcam: 'https://ae01.alicdn.com/kf/Sa0a1b5e2c4534ea3a9f3dc4e64ab9e1cs.jpg',
  nema17: 'https://ae01.alicdn.com/kf/Sd7e3e1a0fc6e4a00afe1f4e08b9b0c23d.jpg',
  soldering: 'https://ae01.alicdn.com/kf/Sc4d5e2b1a6f04f7281e58d10a6b4e0f7K.jpg',
  jumpers: 'https://ae01.alicdn.com/kf/HTB1_V8SHXXXXXbeaXXXq6xXFXXXB.jpg',
  kit: 'https://ae01.alicdn.com/kf/Sa1b2c3d4e5f647a8b9c0d1e2f3a4b5c6d.jpg',
};

// Builds a working AliExpress search URL by product name (always resolves, shows real lowest prices)
const makeLink = (searchTerm) =>
  `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(searchTerm)}&SortType=price_asc`;

export const products = [
  // ARDUINO

  {
    id: 1, name: 'Arduino Uno R3 ATmega328P', category: 'arduino',
    price: 3.49, oldPrice: 8.99, rating: 4.8, reviews: 12453, sold: 98234,
    image: imgs.arduino, affiliateLink: makeLink('Arduino Uno R3 ATmega328P'),
    tags: ['Popular', 'Bestseller'], badge: 'Mais Vendido',
    description: 'Arduino Uno R3 ATmega328P compatível com USB. Placa de desenvolvimento ideal para iniciantes e projetos avançados. Compatível com todas as shields Arduino.',
    specs: ['ATmega328P 16MHz', 'Flash 32KB', 'SRAM 2KB', '14 I/O Digitais', '6 Entradas Analógicas', 'USB Type-B'],
    shipping: 'Frete Grátis', deliveryDays: '15-25 dias',
  },
  {
    id: 2, name: 'Arduino Nano V3.0 ATmega328P CH340', category: 'arduino',
    price: 1.89, oldPrice: 4.99, rating: 4.7, reviews: 8921, sold: 67123,
    image: imgs.nano, affiliateLink: makeLink('Arduino Nano V3 ATmega328P CH340'),
    tags: ['Compacto'], badge: null,
    description: 'Arduino Nano versão 3.0 com chip CH340G para interface USB. Perfeito para projetos que precisam de tamanho reduzido sem abrir mão de funcionalidades.',
    specs: ['ATmega328P', 'Mini USB', '30 pinos', '14 I/O Digitais', '8 Analógicas', '5V/3.3V'],
    shipping: 'Frete Grátis', deliveryDays: '18-30 dias',
  },
  {
    id: 3, name: 'Arduino Mega 2560 R3 CH340G', category: 'arduino',
    price: 7.49, oldPrice: 18.99, rating: 4.9, reviews: 5632, sold: 34521,
    image: imgs.mega, affiliateLink: makeLink('Arduino Mega 2560 R3'),
    tags: ['Pro', 'Alta Performance'], badge: 'Pro',
    description: 'Arduino Mega 2560 com 54 pinos digitais, 16 analógicos e 4 portas seriais. O mais poderoso da família Arduino para projetos complexos.',
    specs: ['ATmega2560 16MHz', 'Flash 256KB', 'SRAM 8KB', '54 I/O Digitais', '16 Analógicas', 'USB Type-B'],
    shipping: 'Frete Grátis', deliveryDays: '15-25 dias',
  },

  // ESP
  {
    id: 4, name: 'ESP32 Dev Board 38 Pinos WiFi+BT', category: 'esp',
    price: 2.89, oldPrice: 7.99, rating: 4.8, reviews: 23456, sold: 187654,
    image: imgs.esp32, affiliateLink: makeLink('ESP32 Dev Board WiFi Bluetooth'),
    tags: ['WiFi', 'Bluetooth', 'Popular'], badge: 'Top Vendas',
    description: 'ESP32 de 38 pinos com WiFi 802.11 b/g/n e Bluetooth 4.2 BLE integrados. Dual-core 240MHz, ideal para IoT e projetos conectados.',
    specs: ['Dual-core 240MHz', 'WiFi 802.11 b/g/n', 'Bluetooth 4.2 BLE', 'Flash 4MB', '38 GPIO', '3.3V'],
    shipping: 'Frete Grátis', deliveryDays: '12-20 dias',
  },
  {
    id: 5, name: 'ESP8266 NodeMCU V3 WiFi Module', category: 'esp',
    price: 1.99, oldPrice: 5.49, rating: 4.7, reviews: 18765, sold: 145232,
    image: imgs.esp8266, affiliateLink: makeLink('ESP8266 NodeMCU WiFi module'),
    tags: ['WiFi', 'IoT'], badge: null,
    description: 'NodeMCU ESP8266 com 30 pinos, WiFi integrado e interface USB. Perfeito para projetos IoT e automação residencial de baixo custo.',
    specs: ['ESP8266EX 80/160MHz', 'WiFi 802.11 b/g/n', 'Flash 4MB', '30 GPIO', '3.3V', 'USB CH340'],
    shipping: 'Frete Grátis', deliveryDays: '14-22 dias',
  },
  {
    id: 6, name: 'ESP32-CAM com Câmera OV2640 2MP', category: 'esp',
    price: 5.99, oldPrice: 14.99, rating: 4.6, reviews: 9876, sold: 54321,
    image: imgs.espcam, affiliateLink: makeLink('ESP32-CAM AI camera module'),
    tags: ['Câmera', 'WiFi', 'IA'], badge: 'IA Ready',
    description: 'ESP32-CAM com câmera OV2640 2MP. Suporte a reconhecimento facial, streaming de vídeo e tiragem de fotos via WiFi. Ideal para projetos de visão computacional.',
    specs: ['ESP32 240MHz', 'Câmera 2MP OV2640', 'WiFi+BT', 'MicroSD Slot', 'Flash 4MB', '3.3V'],
    shipping: 'Frete Grátis', deliveryDays: '15-25 dias',
  },
  {
    id: 7, name: 'Wemos D1 Mini ESP8266 Compact', category: 'esp',
    price: 1.79, oldPrice: 4.99, rating: 4.7, reviews: 11234, sold: 87654,
    image: imgs.wemos, affiliateLink: makeLink('Wemos D1 Mini ESP8266 board'),
    tags: ['Compacto', 'WiFi'], badge: null,
    description: 'Wemos D1 Mini — versão compacta do ESP8266 com apenas 34.2mm x 25.6mm. Ideal para wearables e projetos com restrição de espaço.',
    specs: ['ESP8266 80MHz', 'WiFi b/g/n', 'Flash 4MB', '11 I/O', 'MicroUSB', '3.3V/5V'],
    shipping: 'Frete Grátis', deliveryDays: '14-22 dias',
  },

  // SENSORES
  {
    id: 8, name: 'Sensor DHT11 Temperatura e Umidade', category: 'sensores',
    price: 0.79, oldPrice: 2.49, rating: 4.5, reviews: 34521, sold: 276543,
    image: imgs.dht11, affiliateLink: makeLink('DHT11 temperature humidity sensor'),
    tags: ['Popular'], badge: null,
    description: 'Sensor DHT11 para medir temperatura (0-50°C) e umidade (20-90% RH). Interface digital de 1 fio, fácil de usar com Arduino e ESP.',
    specs: ['Temp: 0~50°C ±2°C', 'Umidade: 20~90% RH', 'Interface Digital', '3~5.5V', 'Resposta 1-2s'],
    shipping: 'Frete Grátis', deliveryDays: '20-35 dias',
  },
  {
    id: 9, name: 'Sensor DHT22 Temperatura Precisão Alta', category: 'sensores',
    price: 1.99, oldPrice: 5.49, rating: 4.8, reviews: 21345, sold: 134567,
    image: imgs.dht22, affiliateLink: makeLink('DHT22 AM2302 temperature humidity sensor'),
    tags: ['Precisão'], badge: 'Alta Precisão',
    description: 'DHT22 (AM2302) com maior precisão que o DHT11. Faixa -40°C a +80°C e 0-100% RH. Recomendado para aplicações que exigem maior confiabilidade.',
    specs: ['Temp: -40~80°C ±0.5°C', 'Umidade: 0~100% RH', 'Interface Digital', '3.3~5.5V', '2s resposta'],
    shipping: 'Frete Grátis', deliveryDays: '18-28 dias',
  },
  {
    id: 10, name: 'Sensor Ultrassônico HC-SR04', category: 'sensores',
    price: 0.49, oldPrice: 1.99, rating: 4.6, reviews: 45678, sold: 398765,
    image: imgs.hcsr04, affiliateLink: makeLink('HC-SR04 ultrasonic distance sensor'),
    tags: ['Barato', 'Popular'], badge: null,
    description: 'Sensor ultrassônico HC-SR04 para medir distâncias de 2cm a 4m com precisão de 3mm. Amplamente utilizado em robótica e projetos de detecção de obstáculos.',
    specs: ['Distância: 2cm~4m', 'Precisão: ±3mm', 'Frequência: 40kHz', '5V DC', '15mA', '4 pinos'],
    shipping: 'Frete Grátis', deliveryDays: '20-35 dias',
  },
  {
    id: 11, name: 'Sensor PIR HC-SR501 Detecção Movimento', category: 'sensores',
    price: 0.79, oldPrice: 2.49, rating: 4.5, reviews: 28765, sold: 213456,
    image: imgs.pir, affiliateLink: makeLink('PIR motion sensor HC-SR501'),
    tags: ['Segurança'], badge: null,
    description: 'Sensor PIR HC-SR501 infravermelho para detecção de movimento humano. Ângulo de detecção 120°, alcance ajustável 3-7 metros, ideal para alarmes e automação.',
    specs: ['Alcance: 3~7m', 'Ângulo: 120°', 'Delay: 0.3~200s', '5~20V', 'Saída digital TTL'],
    shipping: 'Frete Grátis', deliveryDays: '20-35 dias',
  },
  {
    id: 12, name: 'Módulo BMP280 Pressão e Temperatura I2C', category: 'sensores',
    price: 0.59, oldPrice: 2.29, rating: 4.7, reviews: 16543, sold: 98765,
    image: imgs.bmp280, affiliateLink: makeLink('BMP280 barometric pressure sensor'),
    tags: ['I2C', 'Preciso'], badge: null,
    description: 'BMP280 para medir pressão barométrica (300-1100 hPa) e temperatura (-40°C a +85°C). Interface I2C/SPI, alta precisão para altitude e condições climáticas.',
    specs: ['Pressão: 300~1100hPa', 'Temp: -40~85°C', 'I2C/SPI', '3.3V', 'Ultra-baixo consumo'],
    shipping: 'Frete Grátis', deliveryDays: '18-28 dias',
  },
  {
    id: 13, name: 'MPU6050 Giroscópio + Acelerômetro 6 Eixos', category: 'sensores',
    price: 1.29, oldPrice: 3.99, rating: 4.8, reviews: 19876, sold: 145678,
    image: imgs.mpu6050, affiliateLink: makeLink('MPU6050 gyroscope accelerometer'),
    tags: ['IMU', 'Drones'], badge: null,
    description: 'MPU6050 com giroscópio e acelerômetro de 3 eixos cada (6 DOF). Interface I2C, processador DMP integrado. Ideal para drones, robótica e controle de gestos.',
    specs: ['3 eixos giroscópio', '3 eixos acelerômetro', 'Interface I2C', '3.3V/5V', 'DMP integrado'],
    shipping: 'Frete Grátis', deliveryDays: '18-28 dias',
  },

  // DISPLAYS
  {
    id: 14, name: 'Display OLED 0.96" I2C 128x64 SSD1306', category: 'displays',
    price: 1.49, oldPrice: 4.99, rating: 4.8, reviews: 31245, sold: 234567,
    image: imgs.oled, affiliateLink: makeLink('OLED display 0.96 inch I2C SSD1306'),
    tags: ['I2C', 'Popular'], badge: 'Mais Popular',
    description: 'Display OLED 0.96 polegadas monocromático SSD1306 com interface I2C. Alto contraste, sem necessidade de backlight. Compatível com Arduino, ESP32, Raspberry Pi.',
    specs: ['0.96 polegadas', '128x64 pixels', 'I2C (SDA/SCL)', '3.3V/5V', 'SSD1306', 'Branco/Azul/Amarelo-Azul'],
    shipping: 'Frete Grátis', deliveryDays: '15-25 dias',
  },
  {
    id: 15, name: 'Display LCD 16x2 com Módulo I2C', category: 'displays',
    price: 0.89, oldPrice: 2.99, rating: 4.6, reviews: 22345, sold: 178654,
    image: imgs.lcd, affiliateLink: makeLink('LCD 16x2 I2C display module'),
    tags: ['Clássico'], badge: null,
    description: 'LCD 16x2 caracteres com backlight azul e módulo I2C (PCF8574) incluso. Apenas 4 fios (GND, VCC, SDA, SCL) para funcionar. Amplamente usado em projetos Arduino.',
    specs: ['16 colunas x 2 linhas', 'Backlight azul', 'Módulo I2C incluso', '5V', 'HD44780'],
    shipping: 'Frete Grátis', deliveryDays: '18-28 dias',
  },
  {
    id: 16, name: 'Display TFT 2.4" Touch 240x320 ILI9341', category: 'displays',
    price: 3.29, oldPrice: 8.99, rating: 4.5, reviews: 12453, sold: 67890,
    image: imgs.tft, affiliateLink: makeLink('TFT display 1.8 inch ST7735'),
    tags: ['Touch', 'Colorido'], badge: null,
    description: 'Display TFT 2.4 polegadas colorido 240x320 com touch resistivo. Controlador ILI9341, interface SPI, slot para MicroSD. Ideal para interfaces gráficas e monitores portáteis.',
    specs: ['2.4 polegadas', '240x320 pixels', '65K cores', 'Touch resistivo', 'SPI', 'MicroSD slot'],
    shipping: 'Frete Grátis', deliveryDays: '15-25 dias',
  },

  // MOTORES
  {
    id: 17, name: 'Servo Motor SG90 9g Micro', category: 'motores',
    price: 0.99, oldPrice: 2.99, rating: 4.5, reviews: 54321, sold: 456789,
    image: imgs.servo, affiliateLink: makeLink('SG90 servo motor 9g'),
    tags: ['Barato', 'Leve'], badge: null,
    description: 'Servo motor SG90 9g com torque de 1.8 kg/cm. Ideal para robótica, braços mecânicos, câmeras pan-tilt e qualquer aplicação de posicionamento angular.',
    specs: ['Torque: 1.8 kg/cm', 'Velocidade: 0.1s/60°', '180° rotação', '4.8~6V', '9g', 'Plástico'],
    shipping: 'Frete Grátis', deliveryDays: '18-28 dias',
  },
  {
    id: 18, name: 'Motor de Passo 28BYJ-48 + Driver ULN2003', category: 'motores',
    price: 1.49, oldPrice: 3.99, rating: 4.6, reviews: 23456, sold: 187654,
    image: imgs.stepper, affiliateLink: makeLink('28BYJ-48 stepper motor ULN2003 driver'),
    tags: ['Kit'], badge: null,
    description: 'Kit motor de passo 28BYJ-48 com driver ULN2003A. 64 passos por revolução, redução 1:64. Ideal para posicionamento preciso em impressoras, câmeras e automação.',
    specs: ['28BYJ-48 5V', '64 passos/rev', 'Redução 1:64', 'Driver ULN2003', '4 fases', 'Torque: 34.3mN.m'],
    shipping: 'Frete Grátis', deliveryDays: '18-28 dias',
  },
  {
    id: 19, name: 'Driver Motor Ponte H L298N', category: 'motores',
    price: 1.29, oldPrice: 3.49, rating: 4.7, reviews: 34521, sold: 276543,
    image: imgs.l298n, affiliateLink: makeLink('L298N motor driver module'),
    tags: ['Dual', 'Potente'], badge: null,
    description: 'Módulo driver L298N Ponte H dual para controle de 2 motores DC ou 1 motor de passo. Corrente máx 2A por canal, tensão 5V-35V. Ideal para robótica.',
    specs: ['2A por canal (4A pico)', '5~35V', '2 canais DC', 'Enable pins', 'Proteção reversa', 'Dissipador incluso'],
    shipping: 'Frete Grátis', deliveryDays: '18-28 dias',
  },
  {
    id: 20, name: 'Motor NEMA17 17HS4401 Stepper 1.7A', category: 'motores',
    price: 5.49, oldPrice: 12.99, rating: 4.8, reviews: 8765, sold: 43210,
    image: imgs.nema17, affiliateLink: makeLink('Nema 17 stepper motor 42 3D printer'),
    tags: ['Impressora 3D', 'CNC'], badge: null,
    description: 'Motor de passo NEMA17 17HS4401 bipolar 1.7A, 40Ncm de torque. Padrão para impressoras 3D (Ender, Creality) e máquinas CNC. Alta precisão e confiabilidade.',
    specs: ['1.7A por fase', 'Torque: 40Ncm', 'Passo: 1.8°', '200 passos/rev', 'Bipolar 4 fios', '42x42mm'],
    shipping: 'Frete Grátis', deliveryDays: '15-25 dias',
  },

  // COMUNICAÇÃO
  {
    id: 21, name: 'Módulo Bluetooth HC-05 Master/Slave', category: 'comunicacao',
    price: 2.99, oldPrice: 7.99, rating: 4.6, reviews: 18765, sold: 134532,
    image: imgs.hc05, affiliateLink: makeLink('HC-05 Bluetooth module serial'),
    tags: ['Bluetooth'], badge: null,
    description: 'Módulo HC-05 Bluetooth 2.0 EDR Master/Slave configurável via AT commands. Alcance 10m, comunicação serial UART. Amplamente usado com Arduino para controle remoto.',
    specs: ['Bluetooth 2.0 EDR', 'Master/Slave', 'UART 9600-1382400 bps', '3.3V lógico (5V tolerante)', 'Alcance 10m'],
    shipping: 'Frete Grátis', deliveryDays: '18-28 dias',
  },
  {
    id: 22, name: 'Módulo RF nRF24L01+ 2.4GHz', category: 'comunicacao',
    price: 0.79, oldPrice: 2.49, rating: 4.4, reviews: 23456, sold: 187654,
    image: imgs.nrf24, affiliateLink: makeLink('NRF24L01 wireless transceiver 2.4GHz'),
    tags: ['RF', '2.4GHz'], badge: null,
    description: 'Módulo RF nRF24L01+ para comunicação wireless 2.4GHz. Alcance até 100m em espaço aberto, 125 canais, velocidade até 2Mbps. Ideal para redes de sensores.',
    specs: ['2.4GHz ISM', '0~2Mbps', 'Alcance 100m', '3.3V (I/O 5V tolerante)', '125 canais', 'SPI'],
    shipping: 'Frete Grátis', deliveryDays: '20-35 dias',
  },
  {
    id: 23, name: 'Módulo LoRa SX1278 Ra-02 433MHz', category: 'comunicacao',
    price: 3.49, oldPrice: 8.99, rating: 4.7, reviews: 9876, sold: 54321,
    image: imgs.lora, affiliateLink: makeLink('LoRa SX1276 433MHz wireless module'),
    tags: ['LoRa', 'Longo Alcance'], badge: 'Longo Alcance',
    description: 'Módulo LoRa SX1278 433MHz com alcance de até 10km em espaço aberto. Ideal para IoT de longa distância, monitoramento remoto e redes LPWAN.',
    specs: ['433MHz', 'LoRa/FSK', 'Alcance 10km', '+20dBm TX', 'SPI', '3.3V'],
    shipping: 'Frete Grátis', deliveryDays: '15-25 dias',
  },

  // FONTES
  {
    id: 24, name: 'Módulo Step Down LM2596 Ajustável', category: 'fonte',
    price: 0.59, oldPrice: 1.99, rating: 4.5, reviews: 43210, sold: 345678,
    image: imgs.lm2596, affiliateLink: makeLink('LM2596 DC step down buck converter'),
    tags: ['DC-DC', 'Regulável'], badge: null,
    description: 'Conversor step-down LM2596 DC-DC ajustável de 1.25V a 35V, corrente máx 3A. Com display de tensão LED. Ideal para alimentar projetos com diferentes tensões.',
    specs: ['Entrada: 4~40V', 'Saída: 1.25~35V', 'Corrente: 3A', 'Eficiência 92%', 'Display LED', 'Trimpot ajuste'],
    shipping: 'Frete Grátis', deliveryDays: '18-28 dias',
  },
  {
    id: 25, name: 'Módulo Carregador TP4056 Li-Ion com Proteção', category: 'fonte',
    price: 0.39, oldPrice: 1.29, rating: 4.6, reviews: 56789, sold: 478965,
    image: imgs.tp4056, affiliateLink: makeLink('TP4056 lithium battery charger module'),
    tags: ['Bateria', 'Li-Ion'], badge: null,
    description: 'Módulo TP4056 com proteção DW01 integrada para carregar baterias Li-Ion 18650 via MicroUSB. Corrente de carga 1A, proteção contra sobrecarga, descarga e curto.',
    specs: ['MicroUSB entrada', '4.2V saída', 'Corrente: 1A', 'Proteção DW01', 'LED status', 'MicroUSB'],
    shipping: 'Frete Grátis', deliveryDays: '20-35 dias',
  },

  // BÁSICOS
  {
    id: 26, name: 'Kit 600 Resistores 30 Valores Surtidos', category: 'basicos',
    price: 1.49, oldPrice: 3.99, rating: 4.8, reviews: 34521, sold: 276543,
    image: imgs.resistors, affiliateLink: makeLink('resistor kit 1 4W assorted electronics'),
    tags: ['Kit', 'Completo'], badge: 'Essencial',
    description: 'Kit com 600 resistores de filmes de carbono: 30 valores diferentes (10Ω a 1MΩ), 20 unidades de cada. Organizados em caixa. Precisão 5%, 1/4W.',
    specs: ['600 resistores', '30 valores', '10Ω~1MΩ', 'Tolerância 5%', '1/4W 0.25W', 'Caixa inclusa'],
    shipping: 'Frete Grátis', deliveryDays: '20-35 dias',
  },
  {
    id: 27, name: 'Kit 100 LEDs Surtidos 5 Cores 5mm', category: 'basicos',
    price: 0.99, oldPrice: 2.99, rating: 4.7, reviews: 23456, sold: 198765,
    image: imgs.leds, affiliateLink: makeLink('LED kit assorted 5mm 3mm electronics'),
    tags: ['Kit', 'Colorido'], badge: null,
    description: 'Kit com 100 LEDs 5mm de 5 cores: vermelho, verde, azul, amarelo e branco (20 de cada). Difuso e transparente. Essencial para qualquer projeto eletrônico.',
    specs: ['100 LEDs totais', '5 cores x 20 un.', '5mm diâmetro', '2V~3.4V Vf', '20mA If', '5mm'],
    shipping: 'Frete Grátis', deliveryDays: '20-35 dias',
  },
  {
    id: 28, name: 'Protoboard 830 Pontos com Linhas de Energia', category: 'basicos',
    price: 1.49, oldPrice: 3.99, rating: 4.8, reviews: 45678, sold: 387654,
    image: imgs.breadboard, affiliateLink: makeLink('breadboard 400 830 points prototype'),
    tags: ['Essencial'], badge: 'Essencial',
    description: 'Protoboard 830 pontos com 2 linhas de alimentação lateral. Sem solda, ideal para prototipagem rápida. Compatível com componentes DIP e jumpers padrão.',
    specs: ['830 pontos de conexão', '2 linhas de energia', 'Sem solda', '2.54mm pitch', 'Clip 1A/max', 'ABS antichama'],
    shipping: 'Frete Grátis', deliveryDays: '20-35 dias',
  },
  {
    id: 29, name: 'Kit 120 Jumpers Macho-Macho Macho-Fêmea Fêmea-Fêmea', category: 'basicos',
    price: 0.89, oldPrice: 2.49, rating: 4.7, reviews: 34521, sold: 298765,
    image: imgs.jumpers, affiliateLink: makeLink('jumper wire dupont male female'),
    tags: ['Kit', 'Essencial'], badge: null,
    description: 'Kit 120 jumpers 20cm: 40 macho-macho, 40 macho-fêmea, 40 fêmea-fêmea. Fio de cobre com isolamento colorido. Essencial para prototipagem em protoboard.',
    specs: ['120 jumpers total', '40 MM + 40 MF + 40 FF', '20cm comprimento', '26AWG', '10 cores', 'Cobre estanhado'],
    shipping: 'Frete Grátis', deliveryDays: '20-35 dias',
  },

  // FERRAMENTAS
  {
    id: 30, name: 'Multímetro Digital DT830B AC/DC', category: 'ferramentas',
    price: 4.99, oldPrice: 12.99, rating: 4.5, reviews: 23456, sold: 178654,
    image: imgs.multimeter, affiliateLink: makeLink('digital multimeter electronic tester'),
    tags: ['Essencial'], badge: null,
    description: 'Multímetro digital DT830B com display LCD 3.5 dígitos. Mede tensão AC/DC, corrente DC, resistência e teste de diodo. Essencial para qualquer bancada eletrônica.',
    specs: ['3.5 dígitos LCD', 'VDC: 200mV~1000V', 'VAC: 200V~750V', 'ADC: 200μA~10A', 'Resistência: 200Ω~2MΩ', 'Teste diodo/transistor'],
    shipping: 'Frete Grátis', deliveryDays: '18-28 dias',
  },
  {
    id: 31, name: 'Estação de Solda TS100 65W Digital', category: 'ferramentas',
    price: 24.99, oldPrice: 59.99, rating: 4.9, reviews: 12453, sold: 67890,
    image: imgs.soldering, affiliateLink: makeLink('soldering iron kit electronics station'),
    tags: ['Pro', 'Recomendado'], badge: 'Pro Recomendado',
    description: 'Ferro de solda digital TS100 65W com temperatura ajustável 100~400°C, aquecimento em 6s. Compatível com firmware open-source. A melhor escolha para quem trabalha com SMD.',
    specs: ['65W DC 12-24V', 'Temp: 100~400°C', 'Aquecimento 6s', 'Display OLED', 'Firmware open', 'Ponta TS-B2'],
    shipping: 'Frete Grátis', deliveryDays: '15-25 dias',
  },

  // KITS
  {
    id: 32, name: 'Kit Starter Arduino Uno + 37 Sensores Completo', category: 'kits',
    price: 14.99, oldPrice: 39.99, rating: 4.8, reviews: 18765, sold: 123456,
    image: imgs.kit, affiliateLink: makeLink('Arduino starter kit components electronics'),
    tags: ['Completo', 'Iniciante', 'Kit'], badge: 'Kit Completo',
    description: 'Kit iniciante completo com Arduino Uno R3, 37 módulos de sensores (temperatura, joystick, buzzer, relé, IR, etc.), protoboard, jumpers e resistores. Tudo para começar!',
    specs: ['Arduino Uno R3', '37 módulos/sensores', 'Protoboard 830pts', '120 jumpers', 'USB cable', 'Guia em PDF'],
    shipping: 'Frete Grátis', deliveryDays: '18-28 dias',
  },
];

export const getFeaturedProducts = () =>
  products.filter((p) => ['Mais Vendido', 'Top Vendas', 'Mais Popular', 'Pro Recomendado', 'Kit Completo'].includes(p.badge));

export const getProductsByCategory = (categoryId) =>
  products.filter((p) => p.category === categoryId);

export const getProductById = (id) =>
  products.find((p) => p.id === parseInt(id));

export const getRelatedProducts = (product, limit = 4) =>
  products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);

export const searchProducts = (query) => {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
};

