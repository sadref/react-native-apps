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

  const longPressedButton = () =>  {setCalculationHistory([])}
  const pressedButton = (buttonValue) => {
    if (isNaN(buttonValue)) {
      setActiveOperator(buttonValue);
      setOperatorValue(buttonValue);
      if (buttonValue === 'AC') {
        setAnswerValue('0');
        setMemoryValue(0);
        setReadyToPlace(true);
        setOperatorValue('');
        setMathExpression('');
      } else if (buttonValue === '+/-') {
        setAnswerValue((parseFloat(answerValue) * -1).toString());
        //console.log(`answerValue ${answerValue}`);
      } else if (buttonValue === '%') {
        setAnswerValue((parseFloat(answerValue)* 0.01).toString());
      } else if (buttonValue === '.') {
      if (answerValue.includes('.')) {
        return;
      } else {
        setAnswerValue(answerValue + '.');
      }
      } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === 'x' || buttonValue === '/') {
        if (operatorValue !== '') {
          calculateEquals();
        }
        setMemoryValue(parseFloat(answerValue));
        setReadyToPlace(true);
        setMathExpression(mathExpression + ' ' + buttonValue);
      } else if (buttonValue === '=') {
        calculateEquals();
        setActiveOperator(''); // Reset active operator when a equal is pressed
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
};

  const handleNumber = (buttonValue) => {
    if (readyToPlace) {
      setReadyToPlace(false);
      if (buttonValue !== '0') {
        setAnswerValue(buttonValue);
      }
    } else {
      if (answerValue === '0') {
        setAnswerValue(buttonValue);
      } else {
        setAnswerValue(answerValue + buttonValue);
      }
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
        <TouchableOpacity style={[{borderWidth: borderWith,
                                  width: buttonWidth,height:buttonHeight,
                                  borderRadius: buttonWidth/2,},
                                  styles.buttonFrist]}
                                  onLongPress={()=> longPressedButton("AC")}
                                  onPress={()=> pressedButton("AC")}>
          <Text style={styles.buttonText}>AC</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[{borderWidth: borderWith,
                                  width: buttonWidth,height:buttonHeight,
                                  borderRadius: buttonWidth/2,},
                                  styles.buttonFrist,
                                  activeOperator !== '=' && activeOperator !== '' && activeOperator === "+/-" && styles.activeOperator]} onPress={()=> pressedButton("+/-")}>
          <Text style={styles.buttonText}>+/-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[{borderWidth: borderWith,
                                  width: buttonWidth,height:buttonHeight,
                                  borderRadius: buttonWidth/2,},
                                  styles.buttonFrist,
                                  activeOperator !== '=' && activeOperator !== '' && activeOperator === "%" && styles.activeOperator]} onPress={()=> pressedButton("%")}>
          <Text style={styles.buttonText}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[{borderWidth: borderWith,
                                  width: buttonWidth,height:buttonHeight,
                                  borderRadius: buttonWidth/2,},
                                  styles.buttonLastRow,
                                  activeOperator !== '=' && activeOperator !== '' && activeOperator === "/" && styles.activeOperator]} onPress={()=> pressedButton("/")}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
      </View>
            <View style={styles.row}>
        <TouchableOpacity style={[{borderWidth: borderWith,
                                  width: buttonWidth,height:buttonHeight,
                                  borderRadius: buttonWidth/2,},
                                  styles.button]} onPress={()=> pressedButton("7")}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[{borderWidth: borderWith,
                                  width: buttonWidth,height:buttonHeight,
                                  borderRadius: buttonWidth/2,},
                                  styles.button]} onPress={()=> pressedButton("8")}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[{borderWidth: borderWith,
                                  width: buttonWidth,height:buttonHeight,
                                  borderRadius: buttonWidth/2,},
                                  styles.button]} onPress={()=> pressedButton("9")}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[{borderWidth: borderWith,
                                  width: buttonWidth,height:buttonHeight,
                                  borderRadius: buttonWidth/2,},
                                  styles.buttonLastRow,
                                  activeOperator !== '=' && activeOperator !== '' && activeOperator === "x" && styles.activeOperator]} onPress={()=> pressedButton("x")}>
          <Text style={styles.buttonText}>x</Text>
        </TouchableOpacity>
      </View>
            <View style={styles.row}>
        <TouchableOpacity style={[{borderWidth: borderWith,
                                  width: buttonWidth,height:buttonHeight,
                                  borderRadius: buttonWidth/2,},
                                  styles.button]} onPress={()=> pressedButton("4")}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[{borderWidth: borderWith,
                                  width: buttonWidth,height:buttonHeight,
                                  borderRadius: buttonWidth/2,},
                                  styles.button]} onPress={()=> pressedButton("5")}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[{borderWidth: borderWith,
                                  width: buttonWidth,height:buttonHeight,
                                  borderRadius: buttonWidth/2,},
                                  styles.button]} onPress={()=> pressedButton("6")}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[{borderWidth: borderWith,
                                  width: buttonWidth,height:buttonHeight,
                                  borderRadius: buttonWidth/2,},
                                  styles.buttonLastRow,
                                  activeOperator !== '=' && activeOperator !== '' && activeOperator === "-" && styles.activeOperator]} onPress={()=> pressedButton("-")}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
            <View style={styles.row}>
        <TouchableOpacity style={[{borderWidth: borderWith,
                                  width: buttonWidth,height:buttonHeight,
                                  borderRadius: buttonWidth/2,},
                                  styles.button]} onPress={()=> pressedButton("1")}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[{borderWidth: borderWith,
                                  width: buttonWidth,height:buttonHeight,
                                  borderRadius: buttonWidth/2,},
                                  styles.button]} onPress={()=> pressedButton("2")}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[{borderWidth: borderWith,
                                  width: buttonWidth,height:buttonHeight,
                                  borderRadius: buttonWidth/2,},
                                  styles.button]} onPress={()=> pressedButton("3")}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[{borderWidth: borderWith,
                                  width: buttonWidth,height:buttonHeight,
                                  borderRadius: buttonWidth/2,},
                                  styles.buttonLastRow,
                                  activeOperator !== '=' && activeOperator !== '' && activeOperator === "+" && styles.activeOperator]} onPress={()=> pressedButton("+")}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
            <View style={styles.row}>
        <TouchableOpacity style={[{flexGrow: 1, alignItems: 'left', borderWidth: borderWith,
                                  width: buttonWidth,height:buttonHeight,
                                  borderRadius: buttonWidth/2,},
                                  styles.buttonZero]} onPress={()=> pressedButton("0")}>
          <Text style={[{ marginLeft: 30,},styles.buttonText]}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[{borderWidth: borderWith,
                                  width: buttonWidth,height:buttonHeight,
                                  borderRadius: buttonWidth/2,},
                                  styles.button]} onPress={()=> pressedButton(".")}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[{borderWidth: borderWith,
                                  width: buttonWidth,height:buttonHeight,
                                  borderRadius: buttonWidth/2,},
                                  styles.buttonLastRow]} onPress={()=> pressedButton("=")}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems:'flex-end',
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
    //backgroundColor: 'red',
    opacity: 0.3, // Change the background color for active operators
  },
  historyContainer: {
    maxHeight: 150, // Adjust the max height as needed
    marginTop: 10,
    marginRight: 20,
    //alignItems:'flex-end',
  },
  historyText: {
    color: 'white',
    fontSize: 20,
  },
});
export default App;
