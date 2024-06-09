import { FlatList, ScrollView, StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Room from '@/components/Room';
import Reservation from '@/components/Reservation';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

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
  const [roomList, setRoomList] = useState(null)
  const [reserveList, setReserveList] = useState([])


  const fetchData = async () => {
    const {data, error } = await supabase.from("Room").select("*")
    if (error) {
      console.log("Get Room Error", error)
    } else {
      const {data : reserveData, error : reserveError} = await supabase.from("Reservation").select("*")
      if (reserveError) {
        console.log("Get Reserve Error",reserveError)
      } else {
      const roomData = data.map(item => ({...item, isSelected : false, id : (item.room_number + "_" +item.room_floor)}))
      setReserveList(reserveData)
      setRoomList(roomData)

      }
    }
    
  }
  


  
  
  useEffect(() => {fetchData()} , [])

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
          roomName={item.room_name}
          roomCapacity={item.room_capacity}
          isSelected={item.isSelected}
          setIsSelected={setSelectedRoom}
          room_floor={item.room_floor}
          room_number={item.room_number}
          array= {reserveList}
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
