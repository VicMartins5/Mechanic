import React, {useState} from 'react';
import {
  Image,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Text,
  ScrollView,
} from 'react-native';
import { auth } from '../../firebase';

import Icon from '@expo/vector-icons/Ionicons';

var width = Dimensions.get('window').width;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  var erro; 

  const Logar = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Veiculo');
      })
      .catch((error) => erro = error.message);

      if (erro === 'The email address is badly formatted.') {
        alert("Formato de email incorreto.");
      }

      if (erro === 'The password is invalid or the user does not have a password.'){
        alert("Senha ou usuário incorreto.");
      }
  };

  return (
    <ScrollView
      style={styles.main}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Image style={styles.logo} source={require('../../Imagens/Logo.svg')} />

      <View style={styles.gplogin}>
        <View style={styles.boxicones}>
          <Icon name="person" size={15} style={styles.icones} />
        </View>
        <TextInput
          style={styles.campos}
          placeholder={'E-mail'}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType={'text'}
        />

        <View style={styles.boxicones}>
          <Icon name="key" size={15} style={styles.icones} />
        </View>
        <TextInput
          style={styles.campos}
          placeholder={'Senha'}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        style={styles.senha}
        onPress={() => navigation.navigate('Senha')}>
        Esqueceu a senha?
      </TouchableOpacity>

      <View style={styles.gpbtt}>
        <TouchableOpacity
          style={styles.login}
          onPress={() => navigation.navigate('Cadastro')}>
          <Text style={[styles.txtlogin, { color: '#222222' }]}>
            Cadastrar-se
          </Text>
          <Icon
            name="person-add"
            size={20}
            style={[styles.icones, styles.iconesbtt]}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.login} onPress={Logar}>
          <Text style={styles.txtlogin}>Entrar</Text>
          <Icon
            name="log-in"
            size={20}
            style={[styles.icones, styles.iconesbtt]}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222',
    paddingHorizontal: '5%',
  },

  logo: {
    width: width * 0.6,
    height: width * 0.6 * 0.55,
    alignSelf: 'center',
    marginBottom: 10,
  },

  gplogin: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    flexWrap: 'wrap',
  },

  boxicones: {
    width: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ffa500',
    marginBottom: 10,
    paddingLeft: '1%',
  },

  icones: {
    color: '#ffa500',
  },

  campos: {
    width: '95%',
    backgroundColor: '#222222',
    padding: '10px',
    color: '#ffa500',
    borderBottomWidth: 1,
    borderBottomColor: '#ffa500',
    fontSize: 15,
    marginBottom: 10,
    outlineStyle: 'none',
  },

  senha: {
    marginTop: 10,
    color: '#ffa500',
    fontWeight: 'bold',
    fontSize: 12,
    alignSelf: 'center',
  },

  gpbtt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
  },

  login: {
    width: '49%',
    backgroundColor: '#ffa500',
    padding: '10px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexWrap: 'wrap',
    borderRadius: 5,
  },

  txtlogin: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#222222',
  },

  iconesbtt: {
    color: '#222222',
  },
});
