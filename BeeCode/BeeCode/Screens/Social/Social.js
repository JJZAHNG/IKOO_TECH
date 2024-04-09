import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

// 本地图片路径
const testContentCover = require('./test_media/test_content_cover.jpeg');
const testProfilePhoto = require('./test_media/test_profile_photo.jpeg');

// 初始数据
let DATA = new Array(6).fill(null).map((_, index) => ({
  id: String(index),
  user: `User${index + 1}`,
  likes: 100,
  comments: 50,
  userImage: testProfilePhoto,
  postImage: testContentCover,
}));

const SocialScreen = () => {
  const [data, setData] = useState(DATA);

  // 分屏逻辑：横向3分，竖向2分
  const windowWidth = Dimensions.get('window').width;
  const cardWidth = windowWidth / 3 - 10; // 每列3个，减去边距
  const cardHeight = 250; // 定义卡片的高度

  // 当用户滚动到列表底部时加载更多数据
  const handleLoadMore = () => {
    // 假设这是从后端获取的新数据，这里我们复用初始数据作为演示
    const moreData = DATA.map((item, index) => ({
      ...item,
      id: String(parseInt(item.id) + data.length), // 确保ID的唯一性
    }));
    
    // 更新数据
    setData(data.concat(moreData));
  };

  const renderItem = ({ item }) => (
    <View style={[styles.cardContainer, { width: cardWidth, height: cardHeight }]}>
      <Image style={styles.postImage} source={item.postImage} />
      <View style={styles.infoContainer}>
        <Image style={styles.userImage} source={item.userImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.stats}>{`${item.likes} Likes`}</Text>
          <Text style={styles.stats}>{`${item.comments} Comments`}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={3} // 设置每行显示三个元素
      onEndReached={handleLoadMore} // 触底时加载更多
      onEndReachedThreshold={0.5} // 列表还剩下50%未显示时加载更多
      contentContainerStyle={styles.flatListContentContainer}
    />
  );
};

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
    paddingTop: 5,
  },
  cardContainer: {
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  postImage: {
    flex: 1,
    width: '100%',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around', // 分散对齐
    padding: 5,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  stats: {
    fontSize: 12,
    marginRight: 8,
  },
});

export default SocialScreen;
