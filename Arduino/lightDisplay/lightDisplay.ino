#include "Bridge.h"
#include "HttpClient.h"

HttpClient client;

// EDIT: 'Server' address to match your domain
String server = "<your server address here>";

int mensRed = 13;
int mensGreen = 12;
int womensRed = 11;
int womensGreen = 10;
int showerRed = 9;
int showerGreen = 8;

// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication at 9600 bits per second:
  pinMode(mensRed, OUTPUT);
  pinMode(mensGreen, OUTPUT);
  pinMode(womensRed, OUTPUT);
  pinMode(womensGreen, OUTPUT);
  pinMode(showerRed, OUTPUT);
  pinMode(showerGreen, OUTPUT);

  Bridge.begin();
  Serial.begin(9600);


}


// This method makes a HTTP connection to the server and POSTs data
void parseData(int washroomID, bool isOpen) {
  Serial.println("sending get request to server");
  char id[1];
  sprintf(id, "%d", washroomID);
  String url = server + "?" + "id=" + id;
  if (isOpen) {
    url = url + "&" + "open=" + "1";
  } else {
    url = url + "&" + "open=" + "0";
  }
  client.get(url);
}

// the loop routine runs over and over again forever:
void loop() {
  Serial.println("starting loop");
  // read the input pin:
  client.get(server);

  while (client.available()) {
    char c = client.read();
    Serial.print(c);
    if (c == '1') {
      char next = client.read();
      if (next == 't') {
        digitalWrite(mensRed, LOW);
        digitalWrite(mensGreen, HIGH);
      } else {
        digitalWrite(mensGreen, LOW);
        digitalWrite(mensRed, HIGH);
      }
    }
    if (c == '2') {
      char next = client.read();
      if (next == 't') {
        digitalWrite(womensRed, LOW);
        digitalWrite(womensGreen, HIGH);
      } else {
        digitalWrite(womensGreen, LOW);
        digitalWrite(womensRed, HIGH);
      }
    }
    if (c == '3') {
      char next = client.read();
      if (next == 't') {
        digitalWrite(showerRed, LOW);
        digitalWrite(showerGreen, HIGH);
      } else {
        digitalWrite(showerGreen, LOW);
        digitalWrite(showerRed, HIGH);
      }
    }
  }
  Serial.flush();

  delay(2000);

  // delay in between reads for stability
}
