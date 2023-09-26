import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';

const App = () => {
  const windowWidth = Dimensions.get('window').width;
  const buttonWidth = windowWidth / 4;
  const buttonHeight = buttonWidth;
  const borderWith = (buttonWidth + buttonHeight) * 0.02;
  const [answerValue, setAnswerValue] = useState('0');
  const [readyToPlace, setReadyToPlace] = useState(true);
  const [memoryValue, setMemoryValue] = useState(0);
  const [operatorValue, setOperatorValue] = useState('');
  const [mathExpression, setMathExpression] = useState('');
  const [activeOperator, setActiveOperator] = useState(''); // Store the active operator
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [calculationPerformed, setCalculationPerformed] = useState(false);
  
  const calcButton = ({ label, onLongPressAction, onPressAction, customStyle, customStyleText }) => {
    return (
      <TouchableOpacity
        style={[
          {
            borderWidth: borderWith,
            width: buttonWidth,
            height: buttonHeight,
            borderRadius: buttonWidth / 2,
          },
          customStyle,
        ]}
        onLongPress={onLongPressAction}
        onPress={onPressAction}
      >
        <Text style={[customStyleText,styles.buttonText]}>{label}</Text>
      </TouchableOpacity>
    );
  };
  
  const longPressedButton = () =>  {setCalculationHistory([])}
  const pressedButton = (buttonValue) => {
    if (['+', '-', 'x', '/'].includes(buttonValue)) {
      setCalculationPerformed(false);
      if (operatorValue !== '') {
        calculateEquals(); // Calculate previous operation when a new operator is pressed
      }

      setOperatorValue(buttonValue);
      setMemoryValue(parseFloat(answerValue));
      setReadyToPlace(true);
    }
    if(mathExpression.slice(-1) !== buttonValue.slice(-1)){
      setMathExpression(mathExpression + buttonValue);
    }
    if (isNaN(buttonValue)) {
      setActiveOperator(buttonValue);
      if (buttonValue === 'AC') {
        setAnswerValue('0');
        setMemoryValue(0);
        setReadyToPlace(true);
        setOperatorValue('');
        setMathExpression('');
        setCalculationPerformed(false);
      } else if (buttonValue === '+/-') {
        setAnswerValue((parseFloat(answerValue) * -1).toString());
      } else if (buttonValue === '%') {
        const percentage = (parseFloat(answerValue) / 100).toString();
        setAnswerValue(percentage);
        setReadyToPlace(true);
      } else if (buttonValue === '.') {
        if (readyToPlace) {
          setAnswerValue('0' + buttonValue); // Start with '0.' for the first decimal entry
          setReadyToPlace(false);
        } else if (!answerValue.includes('.'))  {
          setAnswerValue(answerValue + buttonValue);
          setReadyToPlace(false);
        }
      } else if (buttonValue === '=') {
        
        if(calculationPerformed){
          return;
        }else {
          calculateEquals();
          setMathExpression('');
          setActiveOperator('');
          setCalculationPerformed(true);
        }
      }
    } else {
      handleNumber(buttonValue);
    }
    
  };

const calculateEquals = () => {
  const previous = parseFloat(memoryValue);
  const current = parseFloat(answerValue);
  let result = 0;

  if (operatorValue === '+') {
    result = previous + current;
  } else if (operatorValue === '-' || operatorValue === '+/-') {
    if (current < 0) {
      result = previous + Math.abs(current); // Add the absolute value of current if it's negative
    } else {
      result = previous - current;
    }
  } else if (operatorValue === '/') {
    if (current === 0) {
      result = 'Error';
    } else {
      result = previous / current;
    }
  } else if (operatorValue === 'x') {
    result = previous * current;
  }
  const calculationString = `${previous} ${operatorValue} ${current} = ${result}`;
  setCalculationHistory((prevHistory) => [calculationString, ...prevHistory]);
  setAnswerValue(result.toString());
  setMemoryValue(result);
  setReadyToPlace(true);
  setMathExpression('');
  setOperatorValue('')
};

  const handleNumber = (buttonValue) => {
    if(readyToPlace) {
      setAnswerValue(buttonValue);
      setReadyToPlace(false);
    } else {
      setAnswerValue(answerValue + buttonValue);
    }
    setMathExpression(mathExpression + buttonValue);
  };
   return (

    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content'/>
      <View style={styles.container}>
      <FlatList
        data={calculationHistory}
        renderItem={({ item }) => (
          <Text style={styles.historyText}>{item}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.historyContainer}
      />
      <Text style={styles.text}>
      {mathExpression}
      </Text>
      <Text style={styles.text}>
      {answerValue}
      </Text>
      <View style={styles.row}>
          {calcButton({
            label: 'AC',
            onLongPressAction: () => longPressedButton('AC'),
            onPressAction: () => pressedButton('AC'),
            customStyle: styles.buttonFrist,
          })}
          {calcButton({
            label: '+/-',
            onPressAction: () => pressedButton('+/-'),
            customStyle: [
              styles.buttonFrist,
              activeOperator === "+/-" ? styles.activeOperator : null
            ],
          })}
          {calcButton({
            label: '%',
            onPressAction: () => pressedButton('%'),
            customStyle: [
              styles.buttonFrist,
              activeOperator === "%" ? styles.activeOperator : null
            ],
          })}
          {calcButton({
            label: '/',
            onPressAction: () => pressedButton('/'),
            customStyle: [
              styles.buttonLastRow,
              activeOperator === "/" ? styles.activeOperator : null
            ],
          })}
      </View>
      <View style={styles.row}>
        {calcButton({
            label: '7',
            onPressAction: () => pressedButton('7'),
            customStyle: styles.button,
          })}
        {calcButton({
            label: '8',
            onPressAction: () => pressedButton('8'),
            customStyle: styles.button,
          })}
        {calcButton({
            label: '9',
            onPressAction: () => pressedButton('9'),
            customStyle: styles.button,
          })}
          {calcButton({
            label: 'x',
            onPressAction: () => pressedButton('x'),
            customStyle: [
              styles.buttonLastRow,
              activeOperator === "x" ? styles.activeOperator : null
            ],
          })}
      </View>
      <View style={styles.row}>
        {calcButton({
            label: '4',
            onPressAction: () => pressedButton('4'),
            customStyle: styles.button,
          })}
        {calcButton({
            label: '5',
            onPressAction: () => pressedButton('5'),
            customStyle: styles.button,
          })}
        {calcButton({
            label: '6',
            onPressAction: () => pressedButton('6'),
            customStyle: styles.button,
          })}
          {calcButton({
            label: '-',
            onPressAction: () => pressedButton('-'),
            customStyle: [
              styles.buttonLastRow,
              activeOperator === "-" ? styles.activeOperator : null
            ],
          })}
      </View>
      <View style={styles.row}>
        {calcButton({
            label: '1',
            onPressAction: () => pressedButton('1'),
            customStyle: styles.button,
          })}
        {calcButton({
            label: '2',
            onPressAction: () => pressedButton('2'),
            customStyle: styles.button,
          })}
        {calcButton({
            label: '3',
            onPressAction: () => pressedButton('3'),
            customStyle: styles.button,
          })}
          {calcButton({
            label: '+',
            onPressAction: () => pressedButton('+'),
            customStyle: [
              styles.buttonLastRow,
              activeOperator === "+" ? styles.activeOperator : null
            ],
          })}
      </View>
      <View style={styles.row}>
        {calcButton({
            label: '0',
            onPressAction: () => pressedButton('0'),
            customStyle: [
              styles.buttonZero,
              {flexGrow: 1, alignItems: 'left',}
            ],
            customStyleText: {marginLeft: 30,},
          })}
        {calcButton({
            label: '.',
            onPressAction: () => pressedButton('.'),
            customStyle: styles.button,
          })}
        {calcButton({
            label: '=',
            onPressAction: () => pressedButton('='),
            customStyle: [
              styles.buttonLastRow,
              activeOperator === "=" ? styles.activeOperator : null
            ],
          })}
      </View>
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'black',
    padding: 10,
  },
  text: {
   color: 'white',
   fontSize: 50,
   textAlign: 'right',
   padding: 10,
   marginRight: 15,
  },
  row: {
    color: 'white',
    flexDirection: 'row',

  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    borderColor: 'black',
  },
  buttonZero: {
    justifyContent: 'center',
    alignItems: 'left',
    backgroundColor: '#1c1c1c',
    borderColor: 'black',
  },
  buttonFrist: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00ced1',
    borderColor: 'black',
  },
  buttonLastRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e90ff',
    borderColor: 'black',
  },
  buttonText: {
    fontSize: 40,
    color: 'white',
  },
  activeOperator: {
    opacity: 0.3, // Change the background color for active operators
  },
  historyContainer: {
    maxHeight: 150, // Adjust the max height as needed
    marginTop: 10,
    marginRight: 20,
  },
  historyText: {
    color: 'white',
    fontSize: 20,
  },
});
export default App;
