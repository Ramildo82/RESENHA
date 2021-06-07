
import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import logo from './assets/2.jpeg';
import imgFundo from './assets/1.jpg';
import imgUser from './assets/user.png';
import imgPassword from './assets/password.png';
import Cabecalho from './cabecalho';
import { AntDesign } from '@expo/vector-icons';
import CComments from './comentario';

class Login extends React.Component { 

  state = { 
    email: "",
    senha: "",
    token: "",
  }

  atualizarTexto(txt, campo) { 
    const novoState = {...this.state};
    novoState[campo] = txt;
    this.setState(novoState);
  }

  login() { 
    const objLogin = {
      usuario: this.state.email,
      senha: this.state.senha
    }
    console.log("Obj Login ==>", objLogin);
    axios.post('https://fecaf-prof-pizza-backend.herokuapp.com/login', objLogin)
    .then( (res) => {
        if (res.data.token) {
          const token = res.data.token; 
          console.log("Token ==>", token);
          const novoState = {...this.state};
          novoState.token = token;
          this.setState(novoState);
          console.log("State==>", this.state);
          ToastAndroid.show("Autenticado com sucesso", ToastAndroid.LONG);
        }
      } )
    .catch( (err) => {
      console.log("Erro ==>", err);
      ToastAndroid.show("Email ou senha inválidos", ToastAndroid.LONG);
    } )
  }

  render() { 
    return (
      <View style={estilos.loginView}>
        <Text>Insira o usuário</Text>
        <TextInput 
            style={estilos.loginUsuarioInput}
            value={this.state.usuario}
            onChangeText={(texto)=>{this.atualizarTexto(texto, 'email')}}/>
        <Text>Insira a senha</Text>
        <TextInput 
          returnKeyType="go"
          secureTextEntry
          autoCorrect={false}
          style={estilos.loginSenhaInput}
          value={this.state.senha}
          onChangeText={(texto)=>{this.atualizarTexto(texto, 'senha')}}/>
        <Button title="Login" onPress={()=>{this.login()}}/>
      </View>
    );
  }
}

export default Login;


class LoginScreen extends Component {
  render() {
    return (

      <View style={styles.fundoLogin}>
        <Image source={imgFundo} style={styles.logoIcone} />
        <View style={styles.caixaLogin}>
          <View style={styles.logo}><Image source={logo} style={styles.logoIcone1} /></View>
          <Text style={styles.ti_resenha}>RESENHA</Text>
          <Text style={styles.ti_Sub}>Entre nesta Resenha!</Text>
          <StatusBar style="auto" />
          <View style={styles.user}><Image source={imgUser} style={styles.logoIcone2} /></View>
          <TextInput style={styles.botEmail} placeholder="Digite seu Email" />
          <View style={styles.password}><Image source={imgPassword} style={styles.logoIcone3} /></View>
          <TextInput secureTextEntry style={styles.botSenha} placeholder="Digite sua Senha" />
          <View style={styles.botEntrar}>
            <Button
              color="green"
              title='ENTRAR'
              onPress={() => this.props.navigation.navigate('Posts')}
            />
          </View>
          <View style={styles.botEntrar}>
            <Button
              color="green"
              title='Cadastre-se AGORA!'
              onPress={() => this.props.navigation.navigate('Cadastro')}
            />
          </View>
        </View>
      </View>



    );
  }
}

class CadastroScreen extends Component {

  state = {
    adicionar: {
      nome: "Ramildo",
      dataNascimento: "17/05/1991",
      cpf: "12345678901",
      email: "ramildo@resenha.com",
      senha: "123456",
    },

    lista: []

  }

  Salvar() {
    const novoEstado = { ...this.state };
    novoEstado.lista.push(
      {
        ...novoEstado.adicionar
      }
    );
    this.setState(novoEstado);
    Alert.alert("Bem vindo ao RESENHA", "Cadastro efetuado com sucesso");  
    
  }

  atualizarCadastro(campo, texto) {
    const novoEstado = { ...this.state };
    novoEstado.adicionar[campo] = texto;
    this.setState(novoEstado);
  }

  render() {
    return (

      <View>

        <View>
          <Text></Text>
          <Cabecalho />
        </View>

        {/* View Background */}
        <ImageBackground source={require('./assets/fundo.jpg')} style={styles.Principal}>

          {/* View Ranking */}
          <View style={styles.Ranking}>
            <Text style={styles.Ranking}>Classificação da liga</Text>
          </View>

          {/* View Classificação de times */}
          <View>
            <Text style={styles.Classificação}>1º RESENHA FC</Text>
            <Text style={styles.Classificação}>2º BAR SEM LONA</Text>
            <Text style={styles.Classificação}>3º REAL MADRUGA</Text>
          </View>

          {/* View Cadastre-se */}
          <View style={styles.TituloCadastro}>
            <Text style={styles.TituloCadastro}>Entre nesta RESENHA!!!</Text>
            <Text style={styles.TituloCadastro}>Cadastre-se</Text>
          </View>



          {/* View TextInput */}
          <View style={styles.Cadastro}>

            <Text style={styles.TextoCadastro}>Nome</Text>

            <TextInput style={styles.TextoImput}
              placeholder="digite seu nome aqui:"
              value={this.state.adicionar.nome}
              onChangeText={(txt) => { this.atualizarCadastro("nome", txt) }}
            />

            <Text style={styles.TextoCadastro}>Data de nascimento</Text>

            <TextInput style={styles.TextoImput}
              placeholder="digite sua data de nascimento aqui:"
              value={this.state.adicionar.dataNascimento}
              onChangeText={(txt) => { this.atualizarCadastro("dataNascimento", txt) }}
            />

            <Text style={styles.TextoCadastro}>CPF</Text>

            <TextInput style={styles.TextoImput}
              placeholder="digite seu CPF aqui:"
              value={this.state.adicionar.cpf}
              onChangeText={(txt) => { this.atualizarCadastro("cpf", txt) }}
            />

            <Text style={styles.TextoCadastro}>E-mail</Text>

            <TextInput style={styles.TextoImput}
              placeholder="digite seu E-mail aqui:"
              value={this.state.adicionar.email}
              onChangeText={(txt) => { this.atualizarCadastro("email", txt) }}
            />

            <Text style={styles.TextoCadastro}>Senha</Text>

            <TextInput style={styles.TextoImput}
              secureTextEntry={true}
              placeholder="digite seu senha aqui:"
              value={this.state.adicionar.senha}
              onChangeText={(txt) => { this.atualizarCadastro("senha", txt) }}
            />

          </View>

          {/* View Botao Cadastro*/}

          <View>
            <TouchableOpacity onPress={() => { this.Salvar() }} >
              <Text style={styles.Botao}>CADASTRAR</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.Botaohome}>LOGIN</Text>
            </TouchableOpacity>
          </View>

          {/*   <View style={styles.botEntrar}> 
        <Button 
              title = 'CONCLUIR CADASTRO'
              onPress = { () => this.props.navigation.navigate('Home')}
            />
        </View>
 */}
          {/*  Botao Home */}
          {/*   <View>
          <TouchableOpacity onPress={() => App()}>
            <Text style={estilos.Botaohome}>Home</Text>
          </TouchableOpacity>
        </View> */}

        </ImageBackground>
      </View>
    );
  }
}


class PostsScreen extends Component {

  render() {

    /* const[amei,setAmeiState] = useState(false);
    const[amei2,setAmeiState2] = useState(false);
    const[amei3,setAmeiState3] = useState(false);
    const[curtido, setCurtidoState] = useState(false);
    const[curtido2, setCurtidoState2] = useState(false);
    const[curtido3, setCurtidoState3] = useState(false);
    const[ncurtido, setNcurtidoState] = useState(false);
    const[ncurtido2, setNcurtidoState2] = useState(false);
    const[ncurtido3, setNcurtidoState3] = useState(false); */
    return (
      <SafeAreaView style={styles.container}>
        <Cabecalho />


        <ScrollView>


          <View style={styles.area}>
            <Image source={require('./assets/fotogui.jpeg')} style={styles.imagemperfil}></Image>
            <Text>@Gulherme Moreira</Text>
          </View>

          <Image source={require('./assets/trofeu.jpg')} style={styles.imagem} ></Image>


          <CComments></CComments>


          <View style={styles.area}>
            <Image source={require('./assets/fotoramildo.jpeg')} style={styles.imagemperfil}></Image>
            <Text>@Ramildo Monstro</Text>
          </View>

          <Image source={require('./assets/finalizacao.jpg')} style={styles.imagem} ></Image>


          <CComments></CComments>

          <View style={styles.area}>
            <Image source={require('./assets/fotokelvin.jpg')} style={styles.imagemperfil}></Image>
            <Text>@Kelvão Bolado</Text>
          </View>

          <Image source={require('./assets/jogada.jpg')} style={styles.imagem} ></Image>


          <CComments></CComments>


         

        </ScrollView>

        <View style={{ margin: 20 }}>
            <Button styles={{color: 'green'}}
              title='SAIR'
              onPress={() => this.props.navigation.popToTop()}
            />
          </View>

      </SafeAreaView>


    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Cadastro: {
      screen: CadastroScreen
    },
    Posts: {
      screen: PostsScreen
    }
  },
  {
    initialRouteName: 'Login'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  fundoLogin: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  cad: {
    color: 'green',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 15,
  },

  user: {
    backgroundColor: 'white',
    marginTop: 55,
    width: '17%',
    height: 40,
    textAlign: 'center',
    borderBottomWidth: 3,
    borderColor: 'green',
    borderLeftWidth: 4,
  },

  password: {
    backgroundColor: 'white',
    marginTop: 10,
    width: '17%',
    height: 40,
    textAlign: 'center',
    borderBottomWidth: 3,
    borderColor: 'green',
    borderLeftWidth: 4,
  },

  botEmail: {
    backgroundColor: 'white',
    color: 'green',
    width: '85.5%',
    marginTop: -39.8,
    marginLeft: 35,
    height: 40,
    fontSize: 15,
    textAlign: 'center',
    borderBottomWidth: 3,
    borderColor: 'green',
    borderRightWidth: 4,
  },

  botSenha: {
    backgroundColor: 'white',
    color: 'green',
    width: '85.5%',
    marginTop: -40,
    marginLeft: 35,
    height: 40,
    fontSize: 15,
    textAlign: 'center',
    borderBottomWidth: 3,
    borderColor: 'green',
    borderRightWidth: 4,
  },

  botEntrar: {
    marginTop: 10,
    width: '95%',
    marginLeft: 5,
  },

  caixaLogin: {
    width: '70%',
    height: '50%',
    backgroundColor: 'rgba(255,255,255, .7)',
    padding: 6,
    position: 'absolute',
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },

  ti_Sub: {
    color: 'green',
    fontSize: 15,
    marginLeft: 90,
    marginTop: -9,
    textAlign: "center",
    fontWeight: "bold",
  },

  logo: {
    width: '35%',
    height: '25%',
    padding: 1,
    backgroundColor: 'white',
    borderRadius: 20,
  },

  logoIcone: {
    width: '100%',
    height: '100%',
  },

  logoIcone1: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },

  logoIcone2: {
    backgroundColor: 'white',
    width: '60%',
    height: '70%',
    marginLeft: 4,
    marginTop: 7,
  },

  logoIcone3: {
    backgroundColor: 'white',
    width: '60%',
    height: '70%',
    marginLeft: 5,
    marginTop: 7,
  },

  ti_resenha: {
    alignItems: 'center',
    color: 'green',
    width: '50%',
    height: '9%',
    marginTop: -55,
    marginLeft: 110,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  Principal: {
    height: '100%',
    width: '100%'
  },

  Ranking: {
    alignItems: 'center',
    marginTop: '3%',
    fontSize: 20,
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginLeft: '15%',
    marginRight: '15%',
    borderRadius: 20,
  },

  Classificação: {
    marginTop: '2%',
    fontSize: 20,
    padding: 8,
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginLeft: '10%',
    marginRight: '10%',
    borderRadius: 20,
  },

  TextoCadastro: {
    flexDirection: 'column',
    marginTop: '3%',
    marginLeft: '5%',
    marginRight: '5%',
    color: '#ffffff',
    fontSize: 20,
  },

  TextoImput: {
    color: '#ffffaa',
    marginLeft: '5%',
    marginRight: '5%',
    fontSize: 20,
  },

  TituloCadastro: {
    alignItems: 'center',
    marginTop: '3%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: '#ffffff',
    fontSize: 20,
    marginLeft: '15%',
    marginRight: '15%',
    borderRadius: 20,
  },

  Cadastro: {
    alignItems: 'flex-start',
    marginTop: '3%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    height: '35%',
    marginLeft: '5%',
    marginRight: '5%',
    borderRadius: 20,
  },

  Botao: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 23,
    marginLeft: '30%',
    marginRight: '30%',
    marginTop: '3%',
    color: '#ffffff',
    backgroundColor: 'rgba(99, 255, 141, 0.5)',
    borderRadius: 10,
  },

  Botaohome: {
    alignItems: 'flex-start',
    fontSize: 23,
    marginLeft: '40%',
    marginRight: '43%',
    marginTop: '3%',
    color: '#ffffff',
    backgroundColor: 'rgba(99, 255, 141, 0.5)',
    borderRadius: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginTop: 25

  },

  imagemperfil: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    marginRight: 10,

  },

  imagem: {
    width: 350,
    height: 350,
    alignItems: 'center',

  },

  area: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',

  },

  reacoes: {
    flexDirection: 'row',
    alignItems: "center",
    padding: 15,

  }, container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginTop: 25

  },

  imagemperfil: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    marginRight: 10,

  },

  imagem: {
    width: 350,
    height: 350,
    alignItems: 'center',

  },

  area: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',

  },


});


