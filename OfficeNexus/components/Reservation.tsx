import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface ReservationProps {
    id: string,
    day?: string,
    month?: string,
    year?: string,
    startTime?: string,
    endTime?: string,
    roomName?: string,
    roomCapacity?: number
}

const screenWidth = Dimensions.get('window').width;

const Reservation: React.FC<ReservationProps> = ({ roomName, roomCapacity, day, month, year, startTime, endTime }) => {

    return (
        <View style={styles.mainContainer}>
            <FontAwesome name="book" style={{ marginBottom: 5 }} size={40} color={'#444444'} />
            <View style={styles.textContainer}>
                <Text style={[styles.text, {fontSize: 16, fontWeight: 'bold'}]}>
                    {roomName}
                </Text>
                <Text style={[styles.text, {fontSize: 12, fontWeight: 'regular'}]}>
                    {day} / {month} / {year}   |   {startTime} - {endTime}
                </Text>
                <Text style={[styles.text, {fontSize: 12, fontWeight: 'regular'}]}>
                    {roomCapacity}
                </Text>
            </View>
        </View>
    );
  };

export default Reservation;

const styles = StyleSheet.create({
    mainContainer: {
        padding: 0,
        width: screenWidth * (320/360),
        height: screenWidth * (102/360),
        borderWidth: 3,
        borderRadius: 16,
        borderColor: '#E1E1E1',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 25,
        paddingLeft: 25
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 8,
        paddingBottom: 5
    },
    text: {
        fontFamily: 'inter',
        color: '#444444'
    },
});
