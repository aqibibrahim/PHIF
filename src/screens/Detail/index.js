import React, { useState } from 'react';
import {  View, Text,Image,Dimensions, TouchableOpacity,FlatList, ScrollView  } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import styles from './style';
import SweetAlert from 'react-native-sweet-alert';

// let medData=[{name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'}]
function Detail(props) {
    console.log(props.route.params.deatail.ContactNo)
    const [totalPrice, setotalPrice]=useState(0)
    const [tabletData, setTabletData]=useState(props.route.params.deatail.AssignedDrugs)
    const [medData, setMetData]=useState([{id:1,name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},
    {id:1,name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{id:1,name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{id:1,name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{id:1,name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{id:1,name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{id:1,name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},])
   const _renderMeds = (item, index) => {
    return (
        <>
        <TouchableOpacity onPress={() => {
                let array = [...tabletData];
                if (array[index].selected) {
                        console.log(array[index].Price)
                        array[index] = { ...array[index], selected: false }
                        let tempPrice = totalPrice-array[index].Price
                        setotalPrice(tempPrice)

                } else {
                        array[index] = { ...array[index], selected: true }
                        let tempPrice = totalPrice+array[index].Price
                        setotalPrice(tempPrice)
                }
                setTabletData(array)
            }
            }>
        <View style={{borderWidth:1,borderColor:'#e8e8e8',padding:'5%',borderRadius:10,marginBottom:'5%',backgroundColor:item?.selected ? "lightblue":"white"}}>

        <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:'1%'}}>
        <View>
        <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>{item.DrugName}</Text>
        </View>
        <View>
        <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>{"LYD"}</Text>
        </View>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:'1%'}}>
        <View>
        <Text>{item.Description}</Text>
        </View>
        <View style={{marginRight:'9%'}}>
        <Text>{item.Price}</Text>
        </View>
        </View>

        </View>
        </TouchableOpacity>
        </>
    )
    }

    const handleCointinue = () =>{
        let hobbiesArray = []
        tabletData.map((item) => {
            if (item.selected) {
                hobbiesArray.push(item.DrugId)
            }
        })
        console.log(hobbiesArray.toString());
        if(hobbiesArray.length>0)
        {
        fetch(`http://148.251.211.104:9098/AssignedDrugsApp/CreateDrugTransection?AssuredID=abc-2159P2&DrugIds=${hobbiesArray.toString()}`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            SweetAlert.showAlertWithOptions({
                title: '',
                subTitle: '',
                confirmButtonTitle: 'OK',
                confirmButtonColor: '#000',
                otherButtonTitle: 'Cancel',
                otherButtonColor: '#dedede',
                style: 'success',
                cancellable: true
              },
                callback => console.log('callback'));
        })
        .catch((error) => {
          console.error(error);
        });
        }
    }

    return (
        <>
        <View style={{backgroundColor:"white",height:SCREEN_HEIGHT,width:SCREEN_WIDTH}}>
        <ScrollView contentContainerStyle={{paddingBottom:'10%'}}>
          <Image style={{width:200,height:40,marginVertical:'5%',alignSelf:'center'}} source={require("../../assets/images/header2.png")}/>
          <View style={{marginHorizontal:'5%'}}>
          <View style={{marginTop:'1%'}}>
         <Text style={styles.itemText}>Patient Information</Text>
        </View>
        <View style={{marginVertical:'5%',borderBottomWidth:2,borderColor:'#e8e8e8'}}>
         <Text style={styles.itemText4}>Name: {props.route.params.deatail.AssuredName}</Text>
        </View>
        <View style={{marginVertical:'5%',borderBottomWidth:2,borderColor:'#e8e8e8'}}>
         <Text style={styles.itemText4}>Mobile No: {props.route.params.deatail.ContactNo}</Text>
        </View>
        <View style={{marginVertical:'5%',borderBottomWidth:2,borderColor:'#e8e8e8'}}>
         <Text style={styles.itemText4}>Claim Status: {props.route.params.deatail.StatusID == 0 ? "Complete" : "Pending"}</Text>
        </View>
        <View style={{marginTop:'2%'}}>
         <Text style={styles.itemText}>Select Drugs</Text>
        </View>
        <View style={{height:SCREEN_HEIGHT*0.23,marginVertical:'5%'}}>
        <FlatList
        nestedScrollEnabled={true}
        contentContainerStyle={{marginHorizontal:'2.5%'}}
        data={tabletData}
        renderItem={({ item, index }) => _renderMeds(item, index)} />
        </View>
        <View style={{marginVertical:'5%',borderBottomWidth:2,borderColor:'#e8e8e8'}}>
         <Text style={[styles.itemText4,{fontWeight:'600'}]}>Total Amount: LYD{totalPrice}</Text>
        </View>
        <View style={{marginTop:'1%'}}>
        <TouchableOpacity onPress={()=>handleCointinue()} style={styles.btnPrimary}>
                        <Text style={styles.itemText2}>Submit</Text>
        </TouchableOpacity>
        </View>
        <View style={{marginVertical:'5%',alignItems:'center',justifyContent:'center'}}>
      <Text style={styles.itemText3}>Monday, March 25 2022</Text>
      </View>
        </View>
        </ScrollView>
        </View>
        </>
    );
}

export default Detail;
