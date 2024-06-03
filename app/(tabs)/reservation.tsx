import { FlatList, ScrollView, StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Room from '@/components/Room';
import Reservation from '@/components/Reservation';
import { useState } from 'react';

export default function TabTwoScreen() {
  const reservationPlaceholder = [
    {id : "1" , roomName : 'Room 1', roomCapacity : 23, day : "1", month : '12', year : '2024', startTime : '19:00', endTime : '20:00' },
    {id : "2" , roomName : 'Room 1', roomCapacity : 12, day : "2", month : '11', year : '2023', startTime : '23:00', endTime : '23:00' },
    {id : "3" , roomName : 'Room 2', roomCapacity : 23, day : "3", month : '10', year : '2023', startTime : '11:00', endTime : '10:00' },
    {id : "4" , roomName : 'Room 2', roomCapacity : 34, day : "4", month : '9', year : '2023', startTime : '22:00', endTime : '22:00' },
    {id : "5" , roomName : 'Room 3', roomCapacity : 12, day : "5", month : '8', year : '2021', startTime : '22:00', endTime : '20:00' },
    {id : "6" , roomName : 'Room 4', roomCapacity : 22, day : "6", month : '7', year : '2021', startTime : '15:00', endTime : '16:00' },
    {id : "7" , roomName : 'Room 4', roomCapacity : 33, day : "7", month : '6', year : '2021', startTime : '17:00', endTime : '09:00' },
  ]

  const reservationData = reservationPlaceholder.map(item => ({...item, isSelected : false}))
  const [reservationList, setReservationList] = useState(reservationData)

  const renderReservation = ({item}) => {
    return (
      <View style = {{marginVertical: 5}} >
        <Reservation 
          id={item.id}
          roomName={item.roomName}
          roomCapacity={item.roomCapacity}
          day={item.day}
          month={item.month}
          year={item.year}
          startTime={item.startTime}
          endTime={item.endTime}
        />
      </View>
    )
  }

  return (
    <View style={{flex: 1, alignItems: 'center', marginVertical: 10, backgroundColor: 'white'}}>
      <ScrollView horizontal = {true}>
          <FlatList data={reservationList}
          renderItem={renderReservation}
          keyExtractor={item => item.id}
          style = {{maxWidth : "100%"}} />
      </ScrollView>
      {/* <Reservation roomName='Test' roomCapacity={20} day='1' month='6' year='2024' startTime='09:00' endTime='10:00'/> */}
      {/* <Reservation roomName='Test' roomCapacity={20} day='1' month='6' year='2024' startTime='09:00' endTime='10:00'/> */}
    </View>
  );
}

const styles = StyleSheet.create({
});
