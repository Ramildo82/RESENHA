import React from 'react';
import { Button,Text, TextInput, View } from 'react-native';


const Comments = (props) => { 
  return (
    <View>
      <Text>{props.comentario}</Text>
    </View>
  );
}

class CComments extends React.Component {

  state = {
    Comments: {
      comentario: "",
    },

    lista: [
    ]
  }

  salvar() { 
    const newState = {...this.state};
    const obj = {...this.state.Comments};
    newState.lista.push(
      obj
    );
    this.setState(newState);
   
  }

  atualizarTexto(campo, texto) {
    const newState = {...this.state};
    newState.Comments[campo] = texto;
    this.setState(newState);
  }

  render() { 
    const listaDisplay = this.state.lista.map((obj) => {
      return(
        <Comments  comentario={obj.comentario}/>
      )
    });
    return (
      <View>
        <View>

          <View style={{marginTop: 10, marginBottom: 10}}>
          {listaDisplay}
          </View>
         
          <TextInput style={{borderWidth:2,
                            borderColor:'#000',
                            padding: 4}}
            placeholder="Deixe seu comentário..."
            value={this.state.Comments.comentario}
            onChangeText={(txt)=>{this.atualizarTexto('comentario', txt)}}
            />

        </View>
        <Button style={{flex:1,
                        color:"green",
                        alignItems:"center",
                        padding: 15}}
                title="Adicionar" 
                onPress={()=>{this.salvar()}}/>        
      

      </View>
    );
  }

}

export default CComments;