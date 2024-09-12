import { StyleSheet, View, TextInput, TouchableOpacity, FlatList, Text, ImageBackground, Animated, Easing } from 'react-native';
import React, { useState } from 'react'; 

const QuestScreen = () => {
  const [questTitle, setQuestTitle] = useState(""); 
  const [questDescription, setQuestDescription] = useState(""); 
  const [questList, setQuestList] = useState([]); 
  const [editMode, setEditMode] = useState(false); 
  const [editQuestId, setEditQuestId] = useState(null); 

  
  const handleAddOrEditQuest = () => {
    if (questTitle.trim()) {
      if (editMode) {
        setQuestList(questList.map((item) =>
          item.id === editQuestId ? { ...item, title: questTitle, description: questDescription } : item
        ));
        setEditMode(false);
        setEditQuestId(null);
      } else {
        setQuestList([...questList, {
          id: Date.now().toString(),
          title: questTitle,
          description: questDescription, 
          fadeAnim: new Animated.Value(1),
          minimized: true
        }]);
      }
      setQuestTitle(""); 
      setQuestDescription(""); 
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

  
  const handleToggleQuest = (id) => {
    setQuestList(questList.map((item) => 
      item.id === id ? { ...item, minimized: !item.minimized } : item
    ));
  };

  
  const handleEditQuest = (item) => {
    setQuestTitle(item.title);
    setQuestDescription(item.description); 
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
          paddingVertical: item.minimized ? 6 : 12,
          marginVertical: 6,
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          opacity: item.fadeAnim, 
        }}
      >
        <TouchableOpacity style={{ flex: 1 }} onPress={() => handleToggleQuest(item.id)}>
          
          {item.minimized ? (
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.title}</Text>
          ) : (
            <View>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.title}</Text>
              <Text style={{ color: 'white' }}>{item.description}</Text> 
            </View>
          )}
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => handleEditQuest(item)}>
            <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 8 }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteQuest(item.id)}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Complete</Text>
          </TouchableOpacity>
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
        placeholder="Add Quest Title"
        value={questTitle}
        onChangeText={(userText) => setQuestTitle(userText)}
      />

      
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
        placeholder="Add Quest Description"
        value={questDescription}
        onChangeText={(text) => setQuestDescription(text)}
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
          {editMode ? 'Update' : 'Add'}
        </Text>
      </TouchableOpacity>

      
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
