import React from "react"
import {SafeAreaView,View,Text,StyleSheet,Flatlist} from "react-native"


const Pokelist = () => {
    const [data,setData] = React.useState([]);
    const [pointers,setPointers] = React.useState({
        next: 'https://pokeapi.co/api/v2/pokemon',
        prev: null,
    })

    const fetchData = async () => {
        if(pointers.next){
            const res = await fetch(pointers.next);
            const data = await res.json();
            const results = data.results;
            setData(prev => [...prev,...results]);
            setPointers({
                next: data.next,
                prev: data.prev,
            })
        }
    }

    React.useEffect(() => {
        fetchData();
    },[])

    return (
        <SafeAreaView style={styles.container} >
            <Flatlist
                data={data}
                keyExtractor={(item) => itemm.name}
                renderItem={(item) => {
                    return (
                        <Pressable onPress={() => {}} >
                            <View style={styles.card} >
                                <Text>{item.name}</Text>
                            </View>
                        </Pressable>
                    )
                }}
                onEndReached={fetchData}
                onEndReachedThreshold={0.5}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Pokelist