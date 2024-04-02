// Social.js
import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// 从服务器获取的帖子数据
const posts = [
  {
    id: '1',
    userName: '张三',
    avatar: 'https://via.placeholder.com/100x100',
    content: '今天天气不错！',
    image: 'https://via.placeholder.com/300x200',
    likes: ['李四', '王五'],
    comments: [
      { id: 'c1', userName: '李四', text: '真的很不错！' },
      { id: 'c2', userName: '王五', text: '赞同！' },
    ],
  },
  {
    id: '2',
    userName: '张三',
    avatar: 'https://via.placeholder.com/100x100',
    content: '今天天气不错！',
    image: 'https://via.placeholder.com/300x200',
    likes: ['李四', '王五'],
    comments: [
      { id: 'c1', userName: '李四', text: '真的很不错！' },
      { id: 'c2', userName: '王五', text: '赞同！' },
    ],
  },
  {
    id: '3',
    userName: '张三',
    avatar: 'https://via.placeholder.com/100x100',
    content: '今天天气不错！',
    image: 'https://via.placeholder.com/300x200',
    likes: ['李四', '王五'],
    comments: [
      { id: 'c1', userName: '李四', text: '真的很不错！' },
      { id: 'c2', userName: '王五', text: '赞同！' },
    ],
  },
  // ...更多帖子
];

const SocialScreen = ({ navigation }) => {
  // 渲染每个帖子的函数
  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.postContent}>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text>{item.content}</Text>
        <Image source={{ uri: item.image }} style={styles.postImage} />
        <View style={styles.actions}>
          <Text>点赞: {item.likes.join(', ')}</Text>
          <Text>评论: {item.comments.length}</Text>
        </View>
        {/* 点赞和评论按钮等 */}
      </View>
    </View>
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={renderPost}
    />
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
  postContent: {
    flex: 1,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 6,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  // ...添加更多样式
});

export default SocialScreen;
