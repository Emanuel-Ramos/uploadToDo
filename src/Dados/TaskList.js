import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TouchableOpacityComponent, TouchableWithoutFeedback} from 'react-native'
import { Foundation } from '@expo/vector-icons';

export default function TaskList({data, deleteItem, editItem}){
    return(
        <View style={styles.container}>
            <TouchableOpacity style={{marginRight: 10}} onPress={() =>deleteItem(data.key)}>
                
                <Foundation name="trash" size={24} color="black"/>
               
            </TouchableOpacity>

            <View style={{padding: 10}}>
            <TouchableWithoutFeedback onPress={() => editItem(data)}>
                <Text>{data.nome}</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5
    },
    

})