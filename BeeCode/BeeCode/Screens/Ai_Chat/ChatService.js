import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import styles from './ChatService.styles';

const ChatService = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // 将初始消息添加到聊天窗口中
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      text: '1, 2, 3, 4, 5, 6, 7, 8, 9',
      sender: 'service',
    };
    setMessages([welcomeMessage]);
  }, []);  

  const sendMessage = async () => {
    if (inputText.trim()) {
      try {
        const response = await axios.post('http://192.168.110.84:8000/api/v1/bot/chat/bot/', {
          text: inputText.trim(),
        });
  
        // 添加用户消息
        const userMessage = {
          id: Date.now(),
          text: inputText.trim(),
          sender: 'user',
        };
        setMessages([userMessage, ...messages]);
  
        // 添加服务端响应消息
        if (response.data.code === 200) {
          const serviceMessage = {
            id: Date.now() + 1, // 加1或其他数字来确保ID唯一
            text: response.data.msg, // 确保这里是msg，这与您的后端返回的键匹配
            sender: 'service',
          };
          setMessages(prevMessages => [serviceMessage, ...prevMessages]);
        }
  
        // 清空输入框
        setInputText('');
      } catch (error) {
        console.error('发送消息出错：', error);
        // 这里您可以选择如何处理错误（例如显示错误消息）
      }
    }
  };
  

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.serviceBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={80}
    >
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          style={styles.input}
          placeholder="Type a message..."
          onSubmitEditing={sendMessage}  // 允许在键盘上按“Enter”来发送消息
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatService;
