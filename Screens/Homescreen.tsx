import React from 'react';
import { Component, useState, useEffect } from 'react';
import Parse from "parse/react-native.js";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Alert,
  Button,
} from 'react-native';
import TimeTableView, { genTimeBlock } from 'react-native-timetable';

async function createDialog() {
  const Course_Code = "CSCI136-02"
  const Title = "Valid Parenthesis"
  const Submission_Via = "Blackboard"
  const currentUser: Parse.User = await Parse.User.currentAsync();
  const current_user = currentUser.get('username')
  const due_date = "2022/12/10"
  const data = {"title": Title,"Assignment Via": Submission_Via, "Due": due_date,"userPosted": current_user , "course_code":Course_Code}
  newAssignment(data)

};

function newAssignment(data) {
  fetch('https://ClassmatesAPI.jabezagyemang-p.repl.co/add_assignment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // template
    //{"title": "In Order Traversals", "Assignment Via": "Blackboard", "Due": "28/11/2022","userPosted": "Jabezzy00"}
    // {"title": Title,"Assignment Via": Submission_Via, "Due": due_date,"userPosted": current_user, "course_code":Course_Code}
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(data)
      alert("Successfully added assignment")
    })
    .catch((error) => {
      console.error(error);
    });
}

const events_data = [
  {
    title: "Math",
    startTime: genTimeBlock("MON", 9),
    endTime: genTimeBlock("MON", 10, 50),
    location: "Classroom 403",
    extra_descriptions: ["Kim", "Lee"],
  },
  {
    title: "Math",
    startTime: genTimeBlock("WED", 9),
    endTime: genTimeBlock("WED", 10, 50),
    location: "Classroom 403",
    extra_descriptions: ["Kim", "Lee"],
  },
  {
    title: "Physics",
    startTime: genTimeBlock("MON", 11),
    endTime: genTimeBlock("MON", 11, 50),
    location: "Lab 404",
    extra_descriptions: ["Einstein"],
  },
  {
    title: "Physics",
    startTime: genTimeBlock("WED", 11),
    endTime: genTimeBlock("WED", 11, 50),
    location: "Lab 404",
    extra_descriptions: ["Einstein"],
  },
  {
    title: "Mandarin",
    startTime: genTimeBlock("TUE", 9),
    endTime: genTimeBlock("TUE", 10, 50),
    location: "Language Center",
    extra_descriptions: ["Chen"],
  },
  {
    title: "Japanese",
    startTime: genTimeBlock("FRI", 9),
    endTime: genTimeBlock("FRI", 10, 50),
    location: "Language Center",
    extra_descriptions: ["Nakamura"],
  },
  {
    title: "Club Activity",
    startTime: genTimeBlock("THU", 9),
    endTime: genTimeBlock("THU", 10, 50),
    location: "Activity Center",
  },
  {
    title: "Club Activity",
    startTime: genTimeBlock("FRI", 13, 30),
    endTime: genTimeBlock("FRI", 14, 50),
    location: "Activity Center",
  },
];

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
          
          <Button 
            // style={styles.Button}
            title="Add Assignment"
            // onPress={newAssignment}
            onPress={createDialog}
            color="#841584"
          /> 
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

