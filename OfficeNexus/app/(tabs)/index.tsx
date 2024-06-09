import { FlatList, ScrollView, StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Room from '@/components/Room';
import Reservation from '@/components/Reservation';
import { useState } from 'react';

export default function TabOneScreen() {
  const roomPlaceholder = [
    {id : "1" , roomName : "Room 1", roomCapacity : 10},
    {id : "2" , roomName : "Room 2", roomCapacity : 20},
    {id : "3" , roomName : "Room 3", roomCapacity : 30},
    {id : "4" , roomName : "Room 4", roomCapacity : 40},
    {id : "5" , roomName : "Room 5", roomCapacity : 50},
    {id : "6" , roomName : "Room 6", roomCapacity : 60},
    {id : "7" , roomName : "Room 7", roomCapacity : 70},
  ]

  const roomData = roomPlaceholder.map(item => ({...item, isSelected : false}))
  const [roomList, setRoomList] = useState(roomData)
  const setSelectedRoom = (id: string) => {
    setRoomList(prevData => prevData.map(item => {
      if (item.id === id) {
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    }));
  };

  const renderRoom = ({item}) => {
    return (
      <View style = {{marginVertical: 5}} >
        <Room 
          id={item.id}
          roomName={item.roomName}
          roomCapacity={item.roomCapacity}
          isSelected={item.isSelected}
          setIsSelected={setSelectedRoom}
        />
      </View>
    )
  }

  return (
    <View style={{flex: 1, alignItems: 'center', marginVertical: 10, backgroundColor: 'white'}}>
      <ScrollView horizontal = {true}>
          <FlatList data={roomList}
          renderItem={renderRoom}
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
