import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class HelloWorld extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.hello}>Hello, World~~</Text>
      </View>
    );
  }

  componentDidMount() {
    console.log(this._testMyPromise().test);
  }

  _testMyPromise() {
    return new MyPromise((esolve,reject) => {
      resolve("_testMyPromise");
      console.log("run _testMyPromise");
    });
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  hello: {
    color: "#ffffff",
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

function MyPromise(executor) {
  var self = this;//resolve和reject中的this指向不是promise实例，需要用self缓存
  self.state = 'padding';
  self.value = '';//缓存成功回调onfulfilled的参数
  self.reson = '';//缓存失败回调onrejected的参数
  self.onResolved = []; // 专门存放成功的回调onfulfilled的集合
  self.onRejected = []; // 专门存放失败的回调onrejected的集合
  function resolve (value) {
    if(self.state==='padding'){
      self.state==='resolved';
      self.value=value;
      self.onResolved.forEach(fn=>fn())
    }
  }
  function reject (reason) {
    self.state = 'rejected';
    self.value = reason;
    self.onRejected.forEach(fn=>fn())
  }
  try{
    executor(resolve,reject)
  }catch(e){
    reject(e)
  }

}

AppRegistry.registerComponent(
  'MyReactNativeApp',
  () => HelloWorld
);
