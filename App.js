import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Calendar from './components/Calendar';
import "intl";
import "intl/locale-data/jsonp/pt";

export default function App() {
  const [open, setOpen] = React.useState(false);
  const [label, setLabel] = React.useState("");

  return (
    <SafeAreaProvider>
      <View style={{flex: 1, backgroundColor: "#fff"}}>
        {
          !open &&
          <View style={styles.content}>
            <View style={styles.contInput}>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <TextInput
                  style={styles.input}
                  onChangeText={() => { }}
                  value={label}
                  placeholder={"Selecione até 4 datas"}
                  editable={false}
                  onTouchStart={() => setOpen(true)}
                />
              </TouchableOpacity>
            </View>
          </View>
        }
        {
          open &&
          <View style={styles.contCalendar}>
            <Calendar open={open} setOpen={(v, label) => {
              setOpen(v)
              setLabel(label)
              console.log(label)
            }} />
          </View>
        }
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  content: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  contInput: {
    width: "100%"
  },
  contCalendar: {
    paddingTop: 60,
    paddingBottom: 20,
    flex: 1
  }
});
