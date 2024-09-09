import { StyleSheet, View, TextInput, TouchableOpacity, FlatList, Text, ImageBackground, Animated, Easing } from 'react-native';
import React, { useState } from 'react'; 

const QuestScreen = () => {
  const [quest, setQuest] = useState(""); 
  const [questList, setQuestList] = useState([]); 
  const [editMode, setEditMode] = useState(false); 
  const [editQuestId, setEditQuestId] = useState(null); 

 
  const handleAddOrEditQuest = () => {
    if (quest.trim()) {
      if (editMode) {
        setQuestList(questList.map((item) =>
          item.id === editQuestId ? { ...item, title: quest } : item
        ));
        setEditMode(false);
        setEditQuestId(null);
      } else {
        setQuestList([...questList, { id: Date.now().toString(), title: quest, fadeAnim: new Animated.Value(1) }]);
      }
      setQuest(""); 
    }
  };

  
  const handleDeleteQuest = (id) => {
    const questToAnimate = questList.find((quest) => quest.id === id);
    if (questToAnimate) {
      Animated.timing(questToAnimate.fadeAnim, {
        toValue: 0, 
        duration: 600,
        easing: Easing.ease,
        useNativeDriver: true, 
      }).start(() => {
        const updatedQuestList = questList.filter((quest) => quest.id !== id);
        setQuestList(updatedQuestList); 
      });
    }
  };

  
  const handleEditQuest = (item) => {
    setQuest(item.title);
    setEditMode(true);
    setEditQuestId(item.id);
  };

  
  const renderQuest = ({ item }) => {
    return (
      <Animated.View
        style={{
          backgroundColor: '#1e90ff',
          borderRadius: 6,
          paddingHorizontal: 6,
          paddingVertical: 12,
          marginVertical: 6,
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          opacity: item.fadeAnim, 
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => handleEditQuest(item)}>
            <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 8 }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteQuest(item.id)}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Complete</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.title}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    
      <View style={{ marginHorizontal: 16, marginTop: 50 }}>
        <TextInput
          style={{
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 6,
            paddingVertical: 6,
            paddingHorizontal: 10,
            marginBottom: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          }}
          placeholder="Add Quest"
          value={quest}
          onChangeText={(userText) => setQuest(userText)}
        />

        <TouchableOpacity
          style={{
            backgroundColor: '#d0d0d0', 
            borderRadius: 6,
            paddingVertical: 12,
            marginBottom: 16,
          }}
          onPress={handleAddOrEditQuest} 
        >
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              alignSelf: 'center',
              fontSize: 16,
              textTransform: 'uppercase',
            }}
          >
            {editMode ? 'Update' : 'Add'} {/* Dynamic button text */}
          </Text>
        </TouchableOpacity>

        {/* Render quest list */}
        <FlatList
          data={questList} 
          renderItem={renderQuest}
          keyExtractor={(item) => item.id} 
        />
      </View>
    
  );
};

export default QuestScreen;

const styles = StyleSheet.create({});
