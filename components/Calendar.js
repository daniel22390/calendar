import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Calendar, LocaleConfig } from 'react-native-calendars'
import moment from "moment"
import DayVoop from './Day';

const config = {
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abril', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
    today: "Hoje"
}

LocaleConfig.locales['pt'] = config;
LocaleConfig.defaultLocale = 'pt';

const CalendarVoop = (props) => {
    const {
        open = false,
        setOpen
    } = props
    const [dates, setDates] = React.useState([]);

    const onDismiss = () => {
        setOpen(false);
    }

    const getLabel = () => {
        let label = ""
        dates.map((d, i) => {
            label += d.going.day + " de " + config.monthNamesShort[d.going.month - 1] + 
                    (d.return ? " a " + d.return.day + " de " + config.monthNamesShort[d.return.month - 1] : "") +
                    (i == dates.length - 1 ? "" : ", ")
        })
        return label
    }

    const onConfirm = () => {
        setOpen(false, getLabel())
    }

    const isInit = () => {
        let position = dates.length - 1
        for(let i = 0; i < dates.length; i++){
            if(dates[i].going === null || 
               (dates[i].return === null && dates[i].onlyGoing === false)){
                position = i;
                break;
            }
        }

        return dates.length == 0 || 
            ((dates[position].return !== null || dates[position].onlyGoing == true))
    }

    const selectDate = (day) => {
        const auxDate = [...dates]

        let position = dates.length - 1
        for(let i = 0; i < dates.length; i++){
            if(dates[i].going === null || 
               (dates[i].return === null && dates[i].onlyGoing === false)){
                position = i;
                break;
            }
        }

        if(isInit()){
            if(position == dates.length - 1 && (dates.length == 0 || dates[position].going !== null )){
                auxDate.push({
                    going: day,
                    return: null,
                    onlyGoing: false
                })
            } else {
                auxDate[position].going = day
            }
        } else {
            if(position == dates.length - 1){
                auxDate.filter(d => d.return == null && d.onlyGoing == false)[0].return = day
            } else {
                auxDate[position].return = day
            }
        }
        setDates(auxDate)
    }

    const onRemove = (day, going, position) => {
        const auxDate = [...dates]
        if(going)
            auxDate[position].going = null
        else
            auxDate[position].return = null
        
        if(auxDate[position].going == null && auxDate[position].return == null){
            auxDate.splice(position, 1)
        }
        setDates(auxDate)
    }

    const onCheck = (position, value) => {
        const auxDate = [...dates]
        auxDate[position].onlyGoing = value
        setDates(auxDate)
    }

    const complete = () => {
        let ret = true
        for(let date of dates){
            if(date.going == null)
                ret = false
            else if(date.return == null && date.onlyGoing == false)
                ret = false
        }
        return dates.length == 4 && ret
    }

    const markDates = {}
    if(dates.length > 0){
        let position = dates.length - 1
        for(let i = 0; i < dates.length; i++){
            if(dates[i].going === null || 
               (dates[i].return === null && dates[i].onlyGoing === false)){
                position = i;
                break;
            }
        }

        if(dates[position].going){
            markDates[dates[position].going.dateString] = {selected: true, marked: true, selectedColor: '#00aad6'}
        }

        if(dates[position].return){
            markDates[dates[position].return.dateString] = {selected: true, marked: true, selectedColor: '#FF5733'}
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center', fontSize: 16, marginBottom: 10, fontWeight: 'bold' }}>Selecione até quatro datas de ida e volta</Text>
            <View style={{ flex: 1 }}>
                <Calendar
                    minDate={isInit() ? moment().format('YYYY-MM-DD') : dates.filter(d => d.return == null && d.onlyGoing == false)[0].going.dateString}
                    onDayPress={day => {
                        if(!complete()) selectDate(day)
                    }}
                    markedDates={markDates}
                    disabledByDefault={complete()}
                    style={{marginBottom: 15}}
                    theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                    }}
                />
                <ScrollView style={{flex: 1}}>
                    {
                        dates.map((d, i) => 
                            <View style={[{flexDirection: 'row', paddingHorizontal: 25, borderTopColor: "#ddd", borderTopWidth: 1, paddingVertical: 15},
                            i == dates.length - 1 ? {borderBottomColor: '#ddd', borderBottomWidth: 1} : {}]}>
                                <View style={{width: 150, justifyContent: 'center'}}>
                                    {
                                        d.going &&
                                        <DayVoop going={true} day={d.going} onRemove={onRemove} position={i}></DayVoop>
                                    }
                                </View>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    {
                                        d.return ?
                                        <DayVoop going={false} day={d.return} onRemove={onRemove} position={i}></DayVoop>
                                        :
                                        <View style={{flexDirection: 'row'}}>
                                            <Checkbox
                                                value={d.onlyGoing}
                                                onValueChange={(value) => onCheck(i, value)}
                                                style={styles.checkbox}
                                                color="#00aad6"
                                            />
                                            <Text>Somente Ida</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                        )
                    }
                </ScrollView>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 15 }}>
                <View style={{width: 70}}>
                    <Button
                        title="Ok"
                        onPress={onConfirm}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    checkbox: {
        marginRight: 8
    },
})

export default CalendarVoop

