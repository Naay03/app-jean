import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, FlatList } from 'react-native';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherForecasts, setWeatherForecasts] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const fetchWeatherForecast = async () => {
    try {
      const apiKey = '1e5a7d11c14d3f6de80bd3c824ec84f7';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      const newForecast = {
        id: Date.now(),
        name: data.name,
        temperature: data.main.temp,
        description: traduzirDescricao(data.weather[0].description)
      };
      setWeatherForecasts([...weatherForecasts, newForecast]);
      setCity('');
    } catch (error) {
      console.error('Erro ao buscar dados meteorológicos:', error);
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = weatherForecasts.find((item) => item.id === id);
    setEditingItem(itemToEdit);
    setCity(itemToEdit.name);
  };

  const handleUpdate = () => {
    const updatedForecasts = weatherForecasts.map((item) =>
      item.id === editingItem.id ? { ...item, name: city } : item
    );
    setWeatherForecasts(updatedForecasts);
    setEditingItem(null);
    setCity('');
  };

  const handleDelete = (id) => {
    const updatedForecasts = weatherForecasts.filter((item) => item.id !== id);
    setWeatherForecasts(updatedForecasts);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <Text>Temperature: {item.temperature}°C</Text>
      <Text>Description: {item.description}</Text>
      <TouchableOpacity onPress={() => handleEdit(item.id)} style={[styles.button, styles.editButton]}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.button, styles.deleteButton]}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const traduzirDescricao = (descricaoEmIngles) => {
    const traducoes = {
      'clear sky': 'céu limpo',
      'few clouds': 'poucas nuvens',
      'scattered clouds': 'nuvens dispersas',
      'broken clouds': 'nuvens quebradas',
      'overcast clouds': 'nuvens nubladas',
      'light rain': 'chuva leve',
      'moderate rain': 'chuva moderada',
      'heavy intensity rain': 'chuva intensa',
      'light snow': 'neve leve',
      'moderate snow': 'neve moderada',
      'heavy snow': 'neve intensa',
      'mist': 'névoa',
      'smoke': 'fumaça',
      'haze': 'neblina',
      'dust': 'poeira',
      'fog': 'nevoeiro',
      'sand': 'areia',
      'dust': 'poeira',
      'volcanic ash': 'cinzas vulcânicas',
      'squalls': 'rajadas de vento',
      'tornado': 'tornado'
    };

    return traducoes[descricaoEmIngles] || descricaoEmIngles;
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://static.vecteezy.com/ti/vetor-gratis/p1/436105-fundo-de-previsao-do-tempo-sem-emenda-vetor.jpg' }}
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          <Text style={styles.heading}>Previsão do Tempo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome da cidade"
            value={city}
            onChangeText={setCity}
          />
          {editingItem ? (
            <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.button, styles.addButton]} onPress={fetchWeatherForecast}>
              <Text style={styles.buttonText}>Adicionar cidade</Text>
            </TouchableOpacity>
          )}
          <FlatList
            data={weatherForecasts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <Text style={styles.footerText}>Desenvolvido por Naiane - 6º Período TADS</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#1e90ff',
  },
  deleteButton: {
    backgroundColor: '#dc143c',
  },
  addButton: {
    backgroundColor: '#32cd32',
  },
  updateButton: {
    backgroundColor: '#ff8c00',
  },
  item: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    padding: 15,
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default WeatherApp;
