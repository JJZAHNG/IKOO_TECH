import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    marginRight: 10,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0064e1',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  messageBubble: {
    padding: 15,
    borderRadius: 20,
    margin: 10,
    maxWidth: '75%',
  },
  userBubble: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  serviceBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  messageText: {
    fontSize: 16,
    color: '#000', // 这会把文本颜色设置为黑色
  },
});
