
// 从服务器获取的帖子数据
const posts = [
  
];

import React, { useState } from 'react';
import { 
  View, Text, Image, FlatList, StyleSheet, TouchableOpacity,
  ImageBackground, StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const postsData = [
  // ...你的帖子数据
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
  // ...更多帖子
];

const SocialScreen = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderPost = ({ item }) => {
    const isExpanded = item.id === selectedId;

    return (
      <View style={styles.postContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.postContent}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text>{item.content}</Text>
          {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => setSelectedId(isExpanded ? null : item.id)}
          >
            <Icon name="ellipsis-h" size={20} color="#000" />
          </TouchableOpacity>
          {isExpanded && (
            <View style={styles.expandedSection}>
              <Text>{`点赞: ${item.likes.length}`}</Text>
              <Text>{`评论: ${item.comments.length}`}</Text>
              {/* 实际应用中这里可以更复杂，比如评论列表等 */}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={postsData}
      keyExtractor={(item) => item.id}
      renderItem={renderPost}
      ListHeaderComponent={
        <ImageBackground
          source={{ uri: 'your-cover-photo-url' }} // 你的朋友圈封面图片链接
          style={styles.coverPhoto}
        >
          <StatusBar barStyle="light-content" />
          <TouchableOpacity style={styles.cameraButton}>
            <Icon name="camera" size={20} color="#fff" />
          </TouchableOpacity>
          <Image source={{ uri: 'your-profile-photo-url' }} style={styles.profilePhoto} />
        </ImageBackground>
      }
      style={styles.feed}
    />
  );
};

const styles = StyleSheet.create({
  feed: {
    flex: 1,
  },
  coverPhoto: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 15,
  },
  cameraButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: -40, // Half outside the cover photo
  },
  postContainer: {
    flexDirection: 'row',
    padding: 10,
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
  actionButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  expandedSection: {
    marginTop: 10,
  },
  // ...其它样式
});

export default SocialScreen;
