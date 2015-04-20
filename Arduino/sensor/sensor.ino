#include "Bridge.h"
#include "HttpClient.h"

HttpClient client;

// EDIT: 'Server' address to match your domain
String server = "<Your server address here>";

int mensSensor = 2;
int womensSensor = 4;
int showerSensor = 7;
int ledPin = 13;

// the setup routine runs once when you press reset:
void setup() {
  // initialize serial communication at 9600 bits per second:
  // make the pushbutton's pin an input:
  pinMode(mensSensor, INPUT);
  pinMode(womensSensor, INPUT);
  pinMode(showerSensor, INPUT);
  pinMode(ledPin, OUTPUT);
  Bridge.begin();
  Serial.begin(9600);
  

}


// This method makes a HTTP connection to the server and POSTs data
void postData(int washroomID, bool isOpen) {
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

int previousMen;
int previousWomen;
int previousShower;
// the loop routine runs over and over again forever:
void loop() {
  // read the input pin:
  int menState = digitalRead(mensSensor);
  int womenState = digitalRead(womensSensor);
  int showerState = digitalRead(showerSensor);
  if (menState != previousMen) {
    previousMen = menState;
    digitalWrite(ledPin, HIGH);
    postData(1, menState);
    digitalWrite(ledPin, LOW);
    
  }
  if (womenState != previousWomen) {
    previousWomen = womenState;
    digitalWrite(ledPin, HIGH);
    postData(2, womenState);
    digitalWrite(ledPin, LOW);
    
  }
  if (showerState != previousShower) {
    previousShower = showerState;
    digitalWrite(ledPin, HIGH);
    postData(3, showerState);
    digitalWrite(ledPin, LOW);
    
  }
  // print out the state of the button:
  
  delay(1000);        // delay in between reads for stability
}



