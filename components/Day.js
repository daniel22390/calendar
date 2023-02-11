import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons' 
import moment from "moment"
import 'moment/locale/pt' 
moment.locale('pt')

const DayVoop = (props) => {
    const {
        day,
        going,
        onRemove,
        position
    } = props

    return (
        <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
            <Text>{going ? "Ida: " : "Volta: "}</Text>
            <TouchableOpacity onPress={() => onRemove(day, going, position)}>
                <View style={[{marginLeft: 10, width: 40, height: 40, backgroundColor: going ? '#00aad6' : '#FF5733', borderRadius: 5}, styles.box]}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold', color: "#fff"}}>{day.day}</Text>
                    <Text style={{textAlign: 'center', textTransform: 'uppercase', color: "#fff"}}>{moment(day.dateString).format('MMM')}</Text>
                </View>
                <View style={[styles.dot, {elevation: 2, backgroundColor: going ? '#00aad6' : '#FF5733'}]}>
                    <AntDesign name='close' size={8} color={"#fff"} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
    }, 
    dot: {
        position: 'absolute',
        top: -6,
        right: -6,
        width: 12,
        height: 12,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }       
  });

export default DayVoop