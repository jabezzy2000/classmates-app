import React from 'react';
import { Component, useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Alert,
  Button,
} from 'react-native';
import TimeTableView, { genTimeBlock } from 'react-native-timetable';


// type Item = {
//   class_assignments_due_today: Array<any>,
// };

// type Post = {
//   id: number;
//   title: string;
//   body: string;
//   userId: number;
// };
export default class App extends Component {

  numOfDays: number;
  pivotDate: any;
  timetableRef: any;
  constructor(props) {
    super(props);
    this.numOfDays = 7;
    this.pivotDate = genTimeBlock('mon');
  }

  scrollViewRef = (ref) => {
    this.timetableRef = ref;
  };
  
  onEventPress = (evt) => {
    const course_code = evt["title"]
    let data = {};

  
    fetch('https://RemoteLoathsomeVoxels.donaldechefu1.repl.co/class_assignments_due/' + course_code )
      .then(response => response.json())
      .then(responseData => {
        data = responseData;
        Alert.alert("onEventPress", JSON.stringify(data));
      })
      .catch(error => {
        console.error(error);
      });
    
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <TimeTableView
            scrollViewRef={this.scrollViewRef}
            events={events_data}
            pivotTime={9}
            pivotEndTime={20}
            pivotDate={this.pivotDate}
            nDays={this.numOfDays}
            onEventPress={this.onEventPress}
            headerStyle={styles.headerStyle}
            formatDateHeader="dddd"
            locale="en-US"
          />
          
          {/* <Button 
            // style={styles.Button}
            title="Add Assignment"
            onPress={newAssignment}
            color="#841584"
          /> */}
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#81E1B8'
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  Button: {
    backgroundColor: '00ffff',
    textAlign: "center",
    placeholderTextColor:'#003f5c',
    height: 10,
    width: 10,
    marginBottom: 5,
    flex: 1,
    padding: 10,
    marginLeft: 5,
  },
});


const events_data = [
  {
    title: "CSCI136-02",
    startTime: genTimeBlock("MON", 9),
    endTime: genTimeBlock("MON", 10, 50),
    location: "Classroom 403",
    extra_descriptions: ["Kim", "Lee"],
  },
  {
    title: "CSCI136-02",
    startTime: genTimeBlock("WED", 9),
    endTime: genTimeBlock("WED", 10, 50),
    location: "Classroom 403",
    extra_descriptions: ["Kim", "Lee"],
  },
  {
    title: "CSCI101-01",
    startTime: genTimeBlock("MON", 11),
    endTime: genTimeBlock("MON", 11, 50),
    location: "Lab 404",
    extra_descriptions: ["Einstein"],
  },
  {
    title: "CSCI101-01",
    startTime: genTimeBlock("WED", 11),
    endTime: genTimeBlock("WED", 11, 50),
    location: "Lab 404",
    extra_descriptions: ["Einstein"],
  },
  {
    title: "MATH101-01",
    startTime: genTimeBlock("TUE", 9),
    endTime: genTimeBlock("TUE", 10, 50),
    location: "Language Center",
    extra_descriptions: ["Chen"],
  },
  {
    title: "ENGW102-03",
    startTime: genTimeBlock("FRI", 9),
    endTime: genTimeBlock("FRI", 10, 50),
    location: "Language Center",
    extra_descriptions: ["Nakamura"],
  },
  {
    title: "MATH101-01",
    startTime: genTimeBlock("THU", 9),
    endTime: genTimeBlock("THU", 10, 50),
    location: "Activity Center",
  },
  {
    title: "MATH101-01",
    startTime: genTimeBlock("FRI", 13, 30),
    endTime: genTimeBlock("FRI", 14, 50),
    location: "Activity Center",
  },
];

