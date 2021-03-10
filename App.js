import React, { useRef, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Animated,
  Dimensions,
} from "react-native";

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';

const data = [
  {
    imageUrl: require("./assets/1615285307.766199_0.png"),
    color: '#9dcdfa',
    type: 'ADDRESS',
    bad: "dfdkfqlfqknfadaffqwef",
    good: "dfjksjflkqefasdf",
    key: 0,
  },
  {
    imageUrl: require("./assets/1615285307.766199_1.png"),
    color: '#db9efa',
    type: 'TAKE AWAY',
    bad: "dfdkfqlfqknfadaffqwef",
    good: "dfjksjflkqefasdf",
    key: '1',
  },
  {
    imageUrl: require("./assets/1615285307.766199_2.png"),
    color: '#999',
    type: 'BACK SWING',
    bad: "dfdkfqlfqknfadaffqwef",
    good: "dfjksjflkqefasdf",
    key: '2',
  },
  {
    imageUrl: require("./assets/1615285307.766199_3.png"),
    color: '#a1e3a1',
    type: 'TOP',
    bad: "dfdkfqlfqknfadaffqwef",
    good: "dfjksjflkqefasdf",
    key: '3',
  },
  {
    imageUrl: require("./assets/1615285307.766199_4.png"),
    color: '#9dcdfa',
    type: 'DOWN SWING',
    bad: "dfdkfqlfqknfadaffqwef",
    good: "dfjksjflkqefasdf",
    key: '4',
  },
  {
    imageUrl: require("./assets/1615285307.766199_5.png"),
    color: '#db9efa',
    type: 'IMPACT',
    bad: "dfdkfqlfqknfadaffqwef",
    good: "dfjksjflkqefasdf",
    key: '5',
  },
  {
    imageUrl: require("./assets/1615285307.766199_6.png"),
    color: '#999',
    type: 'RELEASE',
    bad: "dfdkfqlfqknfadaffqwef",
    good: "dfjksjflkqefasdf",
    key: '6',
  },
  {
    imageUrl: require("./assets/1615285307.766199_7.png"),
    color: '#a1e3a1',
    type: 'FOLLOW THROUGH',
    bad: "dfdkfqlfqknfadaffqwef",
    good: "dfjksjflkqefasdf",
    key: '7',
  },
];

const { width, height } = Dimensions.get('window');
const DOT_SIZE = 40;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.6;

const Ticker = ({ scrollX }) => {
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
  });

  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map(({ type }, index) => (
          <Text key={index} style={styles.tickerText}>
            {type}
          </Text>
        ))}
      </Animated.View>
    </View>
  )
}

const Item = ({ imageUrl, good, bad, index, scrollX }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const inputRangeOpacity = [
    (index - 0.3) * width,
    index * width,
    (index + 0.3) * width,
  ];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });
  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.1, 0, -width * 0.1],
  });
  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.7, 0, -width * 0.7],
  });
  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [1, 1, 1],
  });

  return (
    <View style={styles.itemStyle}>
      <Animated.Image
        source={imageUrl}
        style={[
          styles.imageStyle,
          {
            // transform: [{ scale }],
            opacity: opacity,
          },
        ]}
      />
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity,
              transform: [{ translateX: translateXHeading }],
            }
          ]}
        >
          굿 포인트
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            {
              opacity,
              transform: [
                {
                  translateX: translateXDescription,
                },
              ],
            },
          ]}
        >
          {good}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity,
              transform: [{ translateX: translateXHeading }],
            }
          ]}
        >
          배드 포인트ㅠㅠ
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            {
              opacity,
              transform: [
                {
                  translateX: translateXDescription,
                },
              ],
            },
          ]}
        >
          {bad}
        </Animated.Text>
      </View>
    </View>
  )
}

const Pagination = ({ scrollX }) => {
  const inputRange = [-width, 0, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-DOT_SIZE, 0, DOT_SIZE],
  });

  return (
    <View style={[styles.pagination]}>
      <Animated.View
        style={[
          styles.paginationIndicator,
          {
            position: 'absolute',
            // backgroundColor: 'red',
            transform: [{ translateX }],
          },
        ]}
      />
      {data.map((item, index) => (
        <View key={index} style={styles.paginationDotContainer}>
          <View
            style={[styles.paginationDot, { backgroundColor: item.color }]}
          />
        </View>
      ))}
    </View>
  )
}

const App = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [isSharing, setSharing] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await Sharing.isAvailableAsync();
      setSharing(result);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        keyExtractor={item => item.key}
        data={data}
        renderItem={({ item, index }) => (
          <Item {...item} index={index} scrollX={scrollX} />
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX }}}],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
      <Pagination scrollX={scrollX} />
      
      <View style={{ 
        position: 'absolute', 
        bottom: height * 0.4, 
        left: width * 0.35, 
        flexDirection: 'row' }}>
        <Ionicons name="md-share-social-outline" size={32} color="black" />
        <MaterialIcons name="save-alt" size={32} color="black" />
        <MaterialIcons name="replay" size={32} color="black" />
      </View>

      <Ticker scrollX={scrollX} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  itemStyle: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: width * 1,
    height: width * 1,
    resizeMode: 'contain',
    flex: 1,
  },
  pagination: {
    position: 'absolute',
    bottom: height * 0.45,
    alignSelf: 'center',
    flexDirection: 'row',
    height: DOT_SIZE,
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE *  0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  tickerContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    overflow: 'hidden',
    height: TICKER_HEIGHT,
  },
  tickerText: {
    fontSize: TICKER_HEIGHT,
    lineHeight: TICKER_HEIGHT,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  textContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    flex: 0.5,
  },
  heading: {
    color: '#444',
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 5,
  },
  description: {
    color: '#ccc',
    fontWeight: '600',
    textAlign: 'left',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
});

export default App;