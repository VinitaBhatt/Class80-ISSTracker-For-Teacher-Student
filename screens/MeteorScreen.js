import axios from 'axios';
import React, {Component} from 'react';
import {View,Text,Alert} from 'react-native';


export default class MeteorScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            meteors:{}
        }
    }

    getMeteors=()=>{
        axios.get("https://api.nasa.gov/neo/rest/v1/feed?api_key=QVopnfNkbZhow33tLJwUpEgynXTyb6s7FGNgqEzn")
        .then(response =>{
            this.setState({meteors:response.data.near_earth_objects})
        })
        .catch(error=>{
            Alert.alert(error.message)
        })
    }

    componentDidMount(){
        this.getMeteors()
    }
    render(){
        if(Object.keys(this.state.meteors).length===0){
            return(
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text> Loading...</Text>
                </View>
            )
        }else{

            var meteor_arr = Object.keys(this.state.meteors).map(meteor_date=>{
                return this.state.meteors[meteor_date]
            })

            var meteors = [].concat.apply([],meteor_arr)

            meteors.forEach(function (element){
                var diameter = (element.estimated_diameter.kilometers.estimated_diameter_max + element.estimated_diameter.kilometers.estimated_diameter_min)/2;
                var threatScore = (diameter/element.close_approach_data[0].miss_distance.kilometers)*1000000000;
                element.threat_score = threatScore;
            })
            return(
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text> Meteor Screen! </Text>
                </View>
            )
        }
    }
}