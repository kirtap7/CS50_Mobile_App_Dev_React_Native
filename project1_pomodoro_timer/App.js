import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView, Image } from 'react-native';
import Constants from 'expo-constants';
import { vibrate } from './utils'

//set default work and break time
const workMinutes = 25
const breakMinutes = 5

class Timer extends React.Component {
  constructor() {
    super()
    this.state = {
      timerOn: false, // timer is off
      status: 'Work', //initial status is set to work
      minutes: workMinutes, //initial minutes is set to work minutes
      seconds: 0,
      buttonName: 'Start', 
      inputWorkMinutes: workMinutes, //initial input minutes are the same as the defaul
      inputBreakMinutes: breakMinutes,
    }
    let secondsRemaining //initialise variable that will store the remaining seconds
  }

  //method that decrements the timer
  decrement = () => {
    this.secondsRemaining--

    //change minutes, seconds and state to show current time
    let currentMinutes = Math.floor(this.secondsRemaining / 60)
    let currentSeconds = this.secondsRemaining - (currentMinutes * 60)

    this.setState({
      minutes: currentMinutes,
      seconds: currentSeconds,
    })

    //if the timer reaches 0 minutes and seconds
    if (this.state.minutes === 0 && this.state.seconds === 0){
      
      clearInterval(this.timer)

      vibrate() //vibrate the device

      //swap the timer
      if (this.state.status === 'Work')
        this.startBreak()
      else if (this.state.status === 'Break')
        this.startWork()
    }
  }

  //method to start timer
  startTimer() {
    //start timer only if timerOn: false
    if (!this.state.timerOn){  
      this.setState({
        timerOn: true,
        buttonName: 'Stop' //change name and funtionality of button 
      })

      //set seconds remaining
      this.secondsRemaining = (this.state.minutes * 60 + this.state.seconds)
      this.timer = setInterval(this.decrement, 1000)
    }
  }

  //method to stop timer
  stopTimer() {
    this.setState({
      timerOn: false,
      buttonName: 'Start',
    })
    clearInterval(this.timer)
  }

  //methos to reset timer
  resetTimer() {
    this.setState({
      timerOn: false,
      status: 'Work',
      minutes: this.state.inputWorkMinutes, //set timer minutes to the initial state
      seconds: 0,
      buttonName: 'Start',        
    })
    this.secondsRemaining = this.state.minutes * 60
    clearInterval(this.timer)
  }

  //method to start work timer
  startWork() {
    this.setState({
      minutes: this.state.inputWorkMinutes,
      status: 'Work',
    })
    this.secondsRemaining = this.state.minutes * 60
    this.timer = setInterval(this.decrement, 1000)
  }

  //method to start break timer
  startBreak() {
    this.setState({
      minutes: this.state.inputBreakMinutes,
      status: 'Break',
    })
    this.secondsRemaining = this.state.minutes * 60
    this.timer = setInterval(this.decrement, 1000)
  }

  //method to set work time from user input
  setWorkTime = (value) => {
    this.setState({
      minutes: value,
      inputWorkMinutes: value,
      })
  }
  
  //method to set break time from user input
  setBreakTime = (value) => {
    this.setState({
      inputBreakMinutes: value,
      })
  }

  //clear interval when timer is over
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>    
          <View > 
            <View > 
              <Text style={styles.title}>
                {this.state.status}
              </Text>

              <Text style={styles.timer}>
                {(this.state.minutes < 10) ? '0'+this.state.minutes : this.state.minutes}:
                {(this.state.seconds < 10) ? '0'+this.state.seconds : this.state.seconds} 
              </Text>
            </View>

            <View style={styles.button}>
              <Button
                  color={this.state.buttonName === 'Start' ? "green" : "red"} //change button color based on its name
                  title={this.state.buttonName}
                  onPress={
                    //based on button name call corresponding function
                    (this.state.buttonName === 'Start') ? 
                    () => this.startTimer() : () => this.stopTimer()
                  }
              />
              <Button
                color="orange"
                title="Reset"
                onPress={() => this.resetTimer()}
              /> 
            </View>
            
            <View style={styles.input}>
                {!this.state.timerOn && //show input boxes only if timer is off
                  [<Text style={{fontSize:17,}}>
                    {'Set Work Minutes'} 
                  </Text>,
                  <TextInput 
                    onFocus={() => this.resetTimer()} //if user wants to change time, timer will reset
                    style={styles.inputBox}
                    onChangeText={value => this.setWorkTime(value)}
                    value={this.state.inputWorkMinutes.toString()} 
                    keyboardType={'number-pad'}
                  /> ]
                } 

                {!this.state.timerOn && //show input boxes only if timer is off
                  [<Text style={{fontSize:17, marginTop:20}}>
                    {'Set Break Minutes'} 
                  </Text>,
                  <TextInput 
                    onFocus={() => this.resetTimer()}
                    style={styles.inputBox}
                    onChangeText={value => this.setBreakTime(value)}
                    value={this.state.inputBreakMinutes.toString()}
                    keyboardType={'number-pad'}
                  />]
                }
                
            </View>
          </View>
        <Image source={require('/image/tomato.jpeg')} style={{width: 200, height: 200, top:110}} />
      </KeyboardAvoidingView>

    )
  }
}


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Timer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1EEE5',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop:20,
    textAlign: 'center',
  },
  timer:{
    fontSize: 90,
    marginBottom: 20,
    fontFamily: 'Helvetica-Light'
  },
  button:{
    flexDirection:'row',
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  input:{
    
    position: 'absolute',
    alignSelf: 'center',
    top: 290,
  },
  inputBox:{
    height: 25, 
    width: 50,
    borderColor: 'grey', 
    borderWidth: 1,
    alignSelf: 'center',
    fontSize: 18,
    textAlign: 'center',
  },

});
