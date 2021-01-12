#include <Servo.h> 
 
Servo myservo;  // create servo object to control a servo 
//Servo myservo1   // a maximum of eight more servo objects can be created 
int pos = 0;    // variable to store the servo position 

void setup() 
{
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  // send an intro:
  Serial.println("Ready to rock and roll !!!");
  Serial.println();
  myservo.attach(9);
}

void loop()
{
  // get any incoming bytes:
  if (Serial.available() > 0) 
  {
    char thisChar = Serial.read();
    // say what was sent:
    Serial.println("You sent me:");
    Serial.write(thisChar);
    Serial.println();
    
    // analyze what was sent:
    if(thisChar=='5') {
      Serial.println("moving camera down");
      for(pos = 0; pos < 180; pos += 1)  // goes from 0 degrees to 180 degrees 
        {                                  // in steps of 1 degree 
          myservo.write(pos);              // tell servo to go to position in variable 'pos' 
          delay(15);                       // waits 15ms for the servo to reach the position 
        } 
    }
    if(thisChar=='6') {
      Serial.println("moving camera up");
      for(pos = 180; pos >= 30; pos -= 1)  // goes from 180 degrees to 30 degrees 
        {                                  // in steps of 1 degree 
          myservo.write(pos);              // tell servo to go to position in variable 'pos' 
          delay(15);                       // waits 15ms for the servo to reach the position 
        } 
    }
    if(thisChar=='1') {
      Serial.println("action 1");
    }
    if(thisChar=='2') {
      Serial.println("action 2");
    }
    if(thisChar=='3') {
      Serial.println("action 3");
    }
    if(thisChar=='4') {
      Serial.println("action 4");
    }
    if(thisChar=='7') {
      Serial.println("action 7");
    }
    if (thisChar=='8') {
      Serial.println("action 8");
    }
    Serial.println("action complete");
    
    Serial.println("Awaiting next action...");
    
  }
}
