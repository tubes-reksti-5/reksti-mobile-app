import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Event, DateData, TimeData } from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '@/utils/supabase';
import Reservation from './Reservation';

interface RoomProps {
    id: string,
    isSelected?: boolean,
    setIsSelected : (id: string) => void;
    roomName?: string,
    roomCapacity?: number,
    room_floor? : number,
    room_number? : number,
    array : []

}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={24} {...props} />;
  }

const screenWidth = Dimensions.get('window').width;

const Room: React.FC<RoomProps> = ({ isSelected, roomName, roomCapacity, id, setIsSelected, room_floor, room_number, array }) => {
    const [date, setDate] = React.useState(new Date()); // Default Date Value of Today
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const [startTime, setStartTime] = React.useState(new Date());
    const [endTime, setEndTime] = React.useState(new Date(Date.now() + 1.5 * 60 * 60 * 1000)); // 1.5 hours after start time
    const [showStartTimePicker, setShowStartTimePicker] = React.useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = React.useState(false);
    const [isAvaible, setAvaible] = React.useState(false)
    let containerStyle;

    function timeStringToSeconds(timeString) {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
      }
    
    function convertToSeconds(dateString) {
        const date = new Date(dateString);
    
        
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
    
        
        const totalSeconds = (hours * 3600) + (minutes * 60) + seconds + 25200; //To adjust for timezone
    
        return totalSeconds;
      }

    function extractDate(dateString) {
        const date = new Date(dateString);
    
        
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
    
        
        const formattedDate = `${year}-${month}-${day}`;
    
        return formattedDate;
    }

    function dateToTime(dateString) {
        const date = new Date(dateString);
        const hour = String(date.getUTCHours() + 1).padStart(2, '0');
        const minute = String(date.getUTCMinutes()).padStart(2, '0');
        const formattedDate = `${hour}:${minute}:`;
    
        return formattedDate;
    }

    function filterFunc(start1, end1, date1, start2, end2, date2) {
        
        if (date1 != date2) {
            
          return false
        }
        else if (end1 < start2 || end2 < start1) {
          return false;
        } else {
          return true;
          
      }
    }

    const checkAvaible = () => {
        
        const reserve = array.filter(item => filterFunc( convertToSeconds(startTime), convertToSeconds(endTime), extractDate(date), 
        timeStringToSeconds(item.reservation_time_start), timeStringToSeconds(item.reservation_time_end), item.reservation_date)  )
        if (reserve.length > 0) {
          return setAvaible(false)
        } else {
          return setAvaible(true)
        }
    }

    if (isSelected) {
        containerStyle = styles.selected
    } else {
        containerStyle = styles.unselected
    }

    React.useEffect( () => {checkAvaible(); 
        
    } ,[date, startTime, endTime])

    const onStartTimeChange = (event: Event, selectedTime: TimeData) => {
        if (selectedTime) {
          setStartTime(selectedTime);
          setEndTime(new Date(selectedTime.getTime() + 1.5 * 60 * 60 * 1000)); // Update end time to 1.5 hours after start time
        }
        setShowStartTimePicker(false);
    };
      
    const onEndTimeChange = (event: Event, selectedTime: TimeData) => {
        if (selectedTime) {
          setEndTime(selectedTime);
        }
        setShowEndTimePicker(false);
    };

    const onChange = (event: Event, selectedDate: DateData) => {
        if (selectedDate){
          setDate(selectedDate)
        }
        setShowDatePicker(false)
    };

    const handleReserve = async () => {
        const {data, error} = await supabase.from("Reservation").insert([{
            reservation_date : date,
            reservation_time_start : dateToTime(startTime),
            reservation_time_end : dateToTime(endTime),
            room_number : room_number,
            room_floor : room_floor
        }])

        if (error) {
            console.log("reserve Error", error)
        } else {
            const {data : data2, error : error2} = await supabase.from("reservation_view_log").insert([{
                
            }])

        }
    }
    return (
        <View style={containerStyle}>
            <TouchableOpacity onPress={() => {setIsSelected(id)}} disabled={isSelected}>
                <View style={styles.topContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: screenWidth * (15/360)}}>
                        <View>
                            {/* <View style={{ backgroundColor: '#444444',width: screenWidth * (50/360), height: screenWidth * (50/360) }}/> */}
                            <FontAwesome name="cube" size={40} color={'#444444'} />
                        </View>
                        <View style={styles.topContainerRight }>
                            <Text style={[ styles.text, { fontSize: 16, fontWeight: 'bold', color: '#444444' }]}>
                                {roomName}
                            </Text>
                            <Text style={[ styles.text, { fontSize: 12, fontWeight: 'regular', color: '#444444' }]}>
                                {roomCapacity} People
                            </Text>
                        </View>
                    </View>
                    <View>
                        <AntDesign name={isSelected ? "upcircleo" : "downcircleo"} style={{ marginRight: 5 }} size={30} color={'#444444'} />
                    </View>
                </View>
            </TouchableOpacity>
            { isSelected && (
                <View style={styles.bottomContainer}>
                    <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <View style={styles.divider}/>
                        <View style={styles.formContainer}>
                            <View style={styles.DatePickerContainer}>
                                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: screenWidth * (250/360), height: screenWidth * (50/360) }}>
                                        <Text style={styles.subtextBoldBlack}>Date: {date.toLocaleDateString()}</Text>
                                        {/* <View style={{ backgroundColor: '#444444', width: screenWidth * (24/360), height: screenWidth * (24/360) }}/> */}
                                        <TabBarIcon name="calendar" color={'#E1E1E1'} />
                                    </View>
                                </TouchableOpacity>
                                {
                                    showDatePicker && (
                                    <DateTimePicker 
                                        value={date}
                                        mode="date"
                                        display="default"
                                        onChange={onChange}
                                    />
                                )}
                            </View>
                            <View style={styles.DatePickerContainer}>
                                <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: screenWidth * (250/360), height: screenWidth * (50/360) }}>
                                        <Text style={styles.subtextBoldBlack}>Start Time: {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                        {/* <View style={{ backgroundColor: '#444444', width: screenWidth * (24/360), height: screenWidth * (24/360) }}/> */}
                                        <TabBarIcon name="clock-o" color={'#E1E1E1'} />
                                    </View>
                                </TouchableOpacity>
                                {showStartTimePicker && (
                                <DateTimePicker
                                    value={startTime}
                                    mode="time"
                                    minuteInterval={30}
                                    display="default"
                                    onChange={onStartTimeChange}
                                />
                                )}
                            </View>
                            <View style={styles.DatePickerContainer}>
                                <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: screenWidth * (250/360), height: screenWidth * (50/360) }}>
                                        <Text style={styles.subtextBoldBlack}>End Time: {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                        {/* <View style={{ backgroundColor: '#444444', width: screenWidth * (24/360), height: screenWidth * (24/360) }}/> */}
                                        <TabBarIcon name="clock-o" color={'#E1E1E1'} />
                                    </View>
                                </TouchableOpacity>
                                {showEndTimePicker && (
                                <DateTimePicker
                                    value={endTime}
                                    mode="time"
                                    minuteInterval={30}
                                    display="default"
                                    onChange={onEndTimeChange}
                                />
                                )}
                            </View>
                        </View>
                    </View>
                    <View  style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}> 
                    {isAvaible  ?    <Text style={[ styles.text, { fontSize: 16, fontWeight: 'bold',  color: '#444444' }]}>
                            Tersedia
                        </Text> : 
                        <Text style={[ styles.text, { fontSize: 16, fontWeight: 'bold',  color: '#444444' }]}>
                        Tidak Tersedia
                    </Text> }
                    </View>
                    <View  style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}> 
                        <TouchableOpacity onPress={() => {handleReserve()}} disabled={!isAvaible}>
                            <View style={styles.button}>
                                <Text style={[ styles.text, { fontSize: 16, fontWeight: 'bold', color: 'white' }]}>
                                    Reserve
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
  };

export default Room;

const styles = StyleSheet.create({
    unselected: {
        padding: 0,
        width: screenWidth * (320/360),
        height: screenWidth * (70/360),
        borderWidth: 3,
        borderRadius: 16,
        borderColor: '#444444',
        flexDirection: 'column',
    },
    selected: {
        padding: 0,
        width: screenWidth * (320/360),
        height: screenWidth * (405/360),
        borderWidth: 3,
        borderRadius: 16,
        borderColor: '#E1E1E1',
        flexDirection: 'column',
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: screenWidth * (290/360),
        height: screenWidth * (50/360),
        gap: screenWidth * (15/360),
        marginLeft: screenWidth * (15/360),
        marginVertical: screenWidth * (6/360),
    },
    topContainerRight: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 5,
    },
    bottomContainer: {
        marginTop: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: screenWidth * (320/360),
    },
    divider: {
        height: screenWidth * (2/360),
        width: screenWidth * (300/360),
        backgroundColor: '#E1E1E1',
        marginBottom: screenWidth * (10/360),
    },
    formContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: screenWidth * (190/360),
    },
    text: {
        // fontFamily: 'inter',
    },
    DatePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: screenWidth * (56/360),
        width: screenWidth * (300/360),
        borderWidth: 2,
        borderRadius: 16,
        borderColor: '#E1E1E1',
      },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: screenWidth * (56/360),
        width: screenWidth * (300/360),
        borderWidth: 2,
        borderRadius: 16,
        borderColor: '#444444',
        backgroundColor: '#444444'
      },
      subtextBoldBlack:{
        fontSize: 16,
        textAlign: "center",
        color: '#444444',
      },
});
