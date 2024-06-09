import { FlatList, ScrollView, StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Room from '@/components/Room';
import Reservation from '@/components/Reservation';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useSession } from '@/components/ctx';

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
  const [reservationList, setReservationList] = useState(null)
  const {signIn,signOut,userData,userEmail,isLoading} = useSession()
  function extractYear(dateString: string): number {
    const [year, ,] = dateString.split('-');
    return parseInt(year, 10);
  }

  function extractMonth(dateString: string): number {
    const [, month,] = dateString.split('-');
    return parseInt(month, 10);
  }


  function extractDay(dateString: string): number {
    const [, , day] = dateString.split('-');
    return parseInt(day, 10);
  }


  const fetchData = async () => {
    // const {data, error} = await supabase.from("Reservation").select("*").eq("user_id", userData.user_id)
    const {data, error} = await supabase.from("Reservation").select("*").eq("user_id", userData.user_id)
    if (error){
      console.log("get Reservation fail!",error)
    } else {
      const {data : data2, error : error2} = await supabase.from("Room").select("*")
      
      if (error2) {
        
      } else if (data2.length * data.length > 0) {
        const reservationData = data.map(item => {

          const matchingRoom = data2.find(item2 => 
            item2.room_number == item.room_number && item2.room_floor == item.room_floor
          )
          return {id : item.reservation_id, startTime : item.reservation_time_start,
          endTime : item.reservation_time_end, day : extractDay(item.reservation_date), month : extractMonth(item.reservation_date), year : extractYear(item.reservation_date),
          roomName : matchingRoom.room_name, roomCapacity : matchingRoom.room_capacity, roomFloor : matchingRoom.room_floor}

        })
        setReservationList(reservationData)
        
      }
      
    }
  }

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

  useEffect(() => {fetchData()} ,[])

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
