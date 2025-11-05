import React, { useState } from 'react';
import {  View, Text, TextInput, ScrollView, TouchableOpacity, Alert, StyleSheet, Linking, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();

// Sample course data
const courses = [
    { id: '1', name: 'Child Minding - Basic child and baby care', fee: 750, duration: '6-weeks', content: ['Birth to 6-month needs', '7-month to 1-year needs', 'Toddler needs', 'Educational toys'] },
    { id: '2', name: 'Cooking - Prepare nutritious family meals', fee: 750, duration: '6-weeks', content: ['Nutritional requirements for a healthy body', 'Types of vegetables, proteins & carbohydrates', 'Meal planning', 'Nutritious Recipes', 'Cooking techniques'] },
    { id: '3', name: 'Garden Maintenance - To provide basic knowledge of watering, pruning and planting in a domestic garden', fee: 750, duration: '6-weeks', content: ['Water Restrictions and Watering Requirements of Indigenous and Exoctic Plants', 'Pruning and propagation of plants', 'Planting techniques for different plants', 'Garden layout'] },
    { id: '4', name: 'Landscaping - To provide landscaping services for new and established gardens', fee: 1500, duration: '6-months', content: ['Indigenous and exotic plants and trees', 'Fixed structures(statues, built-in braai, tables, benches, fountains)', 'Balancing of plants and trees in a garden', 'Aesthetics of plant shapes and colors'] },
    { id: '5', name: 'Sewing - To provide alterations and new garment tailoring services', fee: 1500, duration: '6-months', content: ['Types of stitches', 'Threading a sewing machine', 'Sewing buttons, zips, hems and seams', 'Alterations', 'Designing and Sewing new garments'] },
    { id: '6', name: 'Life Skills - To provide skills to navigate basic life necessities', fee: 1500, duration: '6-months', content: ['Opening a bank account', 'Basic labour law(knowing your rights)', 'Basic reading and writing literacy', 'Basic numeric literacy']},
    { id: '7', name: 'First-aid - To provide first-aid awareness and basic life support', fee: 1500,  duration: '6-months', content: ['Wounds and bleeding', 'Burns and fractures', 'Emergency scene management', 'Cardio-Pulmonary Resuscitation(CPR)', 'Respitory distress(choking, blocked airway)']}
 ];

const venues = [
  { id: '1', name: 'Braamfontein', address: '123 Juta St, Johannesburg' },
  { id: '2', name: 'Sandton', address: '45 Maude St, Johannesburg' },
  { id: '3', name: 'Soweto', address: '789 Vilakazi St, Johannesburg' },
];

// Reusable button
const Button = ({ label, onPress }: { label: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

// Home screen
const Home = ({ navigation }: any) => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>Empowering the Nation</Text>
    <Text>Training domestic workers and gardeners in Johannesburg.</Text>
    <Button label="Courses" onPress={() => navigation.navigate('Courses')} />
    <Button label="Calculator" onPress={() => navigation.navigate('Calculator')} />
    <Button label="Feedback" onPress={() => navigation.navigate('Feedback')} />
    <Button label="Contact" onPress={() => navigation.navigate('Contact')} />
      <View style={styles.imgcontainer}>
       <Image source={require('./assets/logo.jpg')} style={styles.image} />
      </View>
  </ScrollView>

);
// Course list
const Courses = ({ navigation }: any) => (
  <ScrollView style={styles.container}>
    {courses.map((course) => (
      <TouchableOpacity key={course.id} onPress={() => navigation.navigate('Details', { course })}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{course.name}</Text>
          <Text>Fee: R{course.fee}</Text>
          <Text>Duration: {course.duration}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

// Course details
const Details = ({ route }: any) => {
  const { course } = route.params;
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{course.name}</Text>
      <Text>Fee: R{course.fee}</Text>
      <Text>Duration: {course.duration}</Text>
      <Text>Content:</Text>
      {course.content.map((item: string, i: number) => (
        <Text key={i}>• {item}</Text>
      ))}
       <View style={styles.imgcontainer}>
       <Image source={require('./assets/logo.jpg')} style={styles.image} />
      </View>
    </ScrollView>
  );
};
// Fee calculator
const Calculator = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [quote, setQuote] = useState<number | null>(null);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const calculate = () => {
    if (selected.length === 0) return Alert.alert('Select at least one course');
    let total = selected.reduce((sum, id) => sum + (courses.find((c) => c.id === id)?.fee || 0), 0);
    let discount = selected.length === 2 ? 0.05 : selected.length === 3 ? 0.1 : selected.length > 3 ? 0.15 : 0;
    total = total * (1 - discount) * 1.16;
    setQuote(Number(total.toFixed(2)));
  }; 

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Fee Calculator</Text>
      {courses.map((c) => (
        <TouchableOpacity key={c.id} onPress={() => toggle(c.id)}>
          <Text>{selected.includes(c.id) ? '[✓]' : '[ ]'} {c.name} - R{c.fee}</Text>
        </TouchableOpacity>
      ))}
      <Button label="Calculate" onPress={calculate} />
      {quote && <Text>Total incl. VAT: R{quote}</Text>}
       <View style={styles.imgcontainer}>
       <Image source={require('./assets/logo.jpg')} style={styles.image} />
      </View>
    </ScrollView>
  );
};
// Feedback form
const Feedback = () => {
  const [name, setName] = useState('');
  const [comments, setComments] = useState('');

  const submit = () => {
    if (!name || !comments) return Alert.alert('Fill all fields');
    Alert.alert('Thank you', 'Feedback submitted');
    setName(''); setComments('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Feedback</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Comments" value={comments} onChangeText={setComments} />
      <Button label="Submit" onPress={submit} />
       <View style={styles.imgcontainer}>
       <Image source={require('./assets/logo.jpg')} style={styles.image} />
      </View>
    </ScrollView>
  );
};

// Contact screen
const Contact = () => {
  const [venueId, setVenueId] = useState('1');
  const venue = venues.find((v) => v.id === venueId);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Contact</Text>
      <Text>Phone: +27 11 123 4567</Text>
      <Text>Email: info@empoweringthenation.co.za</Text>
      <Text>Venue:</Text>
      <Picker selectedValue={venueId} onValueChange={(val) => setVenueId(val)}>
        {venues.map((v) => <Picker.Item key={v.id} label={v.name} value={v.id} />)}
      </Picker>
      <Text>{venue?.address}</Text>
       <View style={styles.imgcontainer}>
       <Image source={require('./assets/logo.jpg')} style={styles.image} />
      </View>
    </ScrollView>
  );
};

// App wrapper
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Courses" component={Courses} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="Feedback" component={Feedback} />
        <Stack.Screen name="Contact" component={Contact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// Styles
const styles = StyleSheet.create({
  container: { padding: 16 , backgroundColor: '#a5cca7ff'},
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  button: { backgroundColor: '#2e7d32', padding: 12, marginVertical: 8, borderRadius: 6 },
  buttonText: { color: '#fff', textAlign: 'center' },
  card: { padding: 12, backgroundColor: '#e8f5e9', marginBottom: 10, borderRadius: 6 },
  cardTitle: { fontSize: 18, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 8, borderRadius: 6 },

imgcontainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
},
image: {
width: 200,
height: 200,
resizeMode: 'cover',
},

});



