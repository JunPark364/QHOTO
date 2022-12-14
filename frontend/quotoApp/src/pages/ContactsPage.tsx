import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {Card, Button, Icon} from '@rneui/themed';
import {addFriendApi, getContactsApi} from '../api/friend';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const ContactsPage: React.FC<props> = props => {
  const {myContacts, callbackState, setCallbackState, setMyContacts} = props;
  // 친구요청 버튼 전용 state

  const navigation = useNavigation();
  const changeFriendState = async (myContact: any) => {
    addFriendApi(
      myContact.userId,
      res => {
        console.log('addFriendApi - res', res.data);
        // 1) 내가 요청하는경우
        if (
          myContact.relation === '관계없음' ||
          myContact.relation === null ||
          myContact.relation === '노관계'
        ) {
          // BE 응답보다 FE 에서 먼저 움직이도록 설정
          setTmpTitle('친구수락 대기중');
          setTmpColor('silver');
          setCallbackState(!callbackState);
          return;
        }

        // 2) 내가 수락하는 경우
        if (myContact.relation === '상대방요청') {
          // BE 응답보다 FE 에서 먼저 움직이도록 설정
          return setMyContacts(
            myContacts.filter((item: any) => {
              setCallbackState(!callbackState);
              return item.userId !== myContact.userId;
            }),
          );
        }
        // setCallbackState(!callbackState);
      },
      err => console.log('addFriendApi - err', err),
    );
  };

  const renderSectionOne = () => {
    return myContacts.map((myContact, index) => {
      return (
        <View
          key={index}
          style={{
            width: width * 0.46,
            height: height * 0.38,
            marginRight: -12,
            // padding: 0,
            // backgroundColor: 'green',
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OtherPage', {userId: myContact.userId})
            }>
            <Card>
              <Card.Image
                style={{
                  borderRadius: 100,
                  // width: '100%',
                  aspectRatio: 1,
                  width: width * 0.3,
                  height: width * 0.3,
                  // padding: 0,
                  // margin: 0,
                }}
                source={{uri: myContact.image}}
              />
              <Card.Title
                style={{
                  // backgroundColor: 'yellow',
                  fontFamily: 'esamanru-Medium',
                  marginVertical: height * 0.0125,
                }}>
                {myContact.name}
              </Card.Title>
              <Card.Divider style={{margin: 0, padding: 0, marginRight: 12}} />
              <View
                style={{
                  justifyContent: 'center',
                  // alignItems: 'center',
                }}>
                {buttonFunc(myContacts[index])}
              </View>
            </Card>
          </TouchableOpacity>
          {/* </View> */}
        </View>
      );
    });
  };

  const [tmpTitle, setTmpTitle] = useState('친구요청');
  const [tmpColor, setTmpColor] = useState('#2089dc');

  const buttonFunc = (myContact: any) => {
    if (
      myContact.relation === '관계없음' ||
      myContact.relation === null ||
      myContact.relation === '노관계'
    ) {
      return (
        <Button
          buttonStyle={styles.button}
          title={tmpTitle}
          titleStyle={styles.buttonTitle}
          onPress={() => changeFriendState(myContact)}
        />
      );
    } else if (myContact.relation === '상대방요청') {
      return (
        <Button
          // icon={
          //   <Icon name="code" color="#ffffff" iconStyle={{marginRight: 10}} />
          // }
          buttonStyle={styles.button}
          title="친구요청 수락"
          titleStyle={styles.buttonTitle}
          onPress={() => changeFriendState(myContact)}
        />
      );
    } else if (myContact.relation === '내가요청') {
      return (
        <Button
          buttonStyle={styles.buttonSilver}
          title="친구수락 대기중"
          titleStyle={styles.buttonTitle}
          onPress={() => {}}
        />
      );
    }
    return;
  };

  return (
    <ScrollView horizontal={true}>
      <View
        style={{
          flexDirection: 'row',
          // flexWrap: 'wrap',
          marginRight: 12,
          marginBottom: -height * 0.025,
        }}>
        {renderSectionOne()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonSilver: {
    width: width * 0.3,
    alignSelf: 'center',
    // marginBottom: height * 0.0125,
    backgroundColor: 'silver',
    // backgroundColor: '#3B28B1',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  button: {
    width: width * 0.3,
    alignSelf: 'center',
    // marginBottom: height * 0.0125,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonUndefined: {
    width: width * 0.3,
    alignSelf: 'center',
    // marginBottom: height * 0.0125,
    backgroundColor: 'white',
    // backgroundColor: '#3B28B1',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonTitle: {
    fontFamily: 'esamanru-Medium',
    fontSize: 12,
  },
});

export default ContactsPage;
