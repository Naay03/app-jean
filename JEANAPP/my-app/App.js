import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

export default function App() {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [items, setItems] = useState([]);
  const [showList, setShowList] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddItem = () => {
    if (item.trim() !== '' && quantity.trim() !== '') {
      const newItem = `${quantity} ${item}`;
      setItems([...items, newItem]);
      setItem('');
      setQuantity('');
      setShowList(true);
    }
  };

  const handleViewList = () => {
    setShowList(!showList);
  };

  const handleEditItem = (index) => {
    setSelectedItem(index);
    setItem(items[index].split(' ')[1]);
    setQuantity(items[index].split(' ')[0]);
  };

  const handleUpdateItem = () => {
    if (selectedItem !== null) {
      const updatedItems = [...items];
      updatedItems[selectedItem] = `${quantity} ${item}`;
      setItems(updatedItems);
      setItem('');
      setQuantity('');
      setSelectedItem(null);
    }
  };

  const handleDeleteItem = (index) => {
    Alert.alert(
      'Excluir Item',
      'Tem certeza de que deseja excluir este item?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: () => {
            const updatedItems = [...items];
            updatedItems.splice(index, 1);
            setItems(updatedItems);
            if (updatedItems.length === 0) {
              setShowList(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://img.freepik.com/vetores-gratis/cesta-de-compras-de-frutas-e-legumes-frescos_1284-17179.jpg' }}
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Bem-vindo ao Meu App de Compras!</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite um item..."
        value={item}
        onChangeText={(text) => setItem(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
      />

      {selectedItem === null ? (
        <TouchableOpacity style={styles.button} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Adicionar Item</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleUpdateItem}>
            <Text style={styles.buttonText}>Atualizar Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setSelectedItem(null)}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleViewList}>
        <Text style={styles.buttonText}>Ver Lista de Compras</Text>
      </TouchableOpacity>

      {showList && items.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Lista de Compras:</Text>
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.listItem}>
                <Text>{item}</Text>
                <TouchableOpacity onPress={() => handleEditItem(index)}>
                  <Text style={styles.editButton}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteItem(index)}>
                  <Text style={styles.deleteButton}>Excluir</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    marginBottom: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: 150,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  listContainer: {
    marginTop: 20,
    width: '100%',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  editButton: {
    color: 'blue',
    marginRight: 5,
  },
  deleteButton: {
    color: 'red',
    marginLeft: 5,
  },
});
