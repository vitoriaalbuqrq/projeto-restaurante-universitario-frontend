import React from "react";
import axios from 'axios';
import MaterialTable from "material-table";

const GerenciamentoRestaurantes = props => {
  const { useState, useEffect } = React;

  const [data, setData] = useState([
  ]);

  useEffect(() => {
    handleClick();
  }, []);

  function handleClick() {
    axios
      .get("http://demo9128764.mockable.io/restaurantes")
      .then(response => {
        const restaurantes = response.data.restaurantes.map(c => {
          return {
            id: c.id,
            nome_do_restaurante: c.nome_do_restaurante,
            endereco: c.endereco,
            pessoa_responsavel: c.pessoa_responsavel,
            capacidade_de_refeicoes: c.capacidade_de_refeicoes,
            horario_de_atendimento_cafe_da_manha: c.horario_de_atendimento_cafe_da_manha,
            horario_de_atendimento_almoco: c.horario_de_atendimento_almoco,
            horario_de_atendimento_jantar: c.horario_de_atendimento_jantar,
            dias_de_funcionamento: c.dias_de_funcionamento

          };
        });
        setData(restaurantes);
      })
      .catch(error => console.log(error));
  }

   function handleCreate(newData) {
   axios
       .post("https://demo2582395.mockable.io/alunos", {
         "id": newData.id,
         "nome_do_restaurante": newData.nome_do_restaurante,
         "endereco": newData.endereco,
         "pessoa_responsavel": newData.pessoa_responsavel,
         "capacidade_de_refeicoes": newData.capacidade_de_refeicoes,
         "horario_de_atendimento_cafe_da_manha": newData.horario_de_atendimento_cafe_da_manha,
         "horario_de_atendimento_almoco": newData.horario_de_atendimento_almoco,
         "horario_de_atendimento_jantar": newData.horario_de_atendimento_jantar,
         "dias_de_funcionamento": newData.dias_de_funcionamento,
       })
       .then(function (response) {
         console.log('Salvo com sucesso.')
       });
   }

   function handleUpdate(newData) {
     const url = `https://demo2582395.mockable.io/alunos/${newData.id}`;
  
      axios
      .put(url, {
        "id": newData.id,
        "cpf": newData.cpf,
        "matricula": newData.matricula,
        "nome": newData.nome,
        "idEndereco": newData.idEndereco,
        "curso": newData.curso
      })
      .then(function (response) {
        console.log('Atualizado com sucesso.')
      });
  }

  function handleDelete(newData) {
    axios
      .delete("https://demo2582395.mockable.io/delete-aluno", {
        "id": newData.id
      })
      .then(function (response) {
        console.log('Deletado com sucesso.')
      });
  }

  return (
    [

      <MaterialTable
        title="Gerenciamento de Restaurantes"
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Nome do restaurante', field: 'nome_do_restaurante' },
          { title: 'Endereço', field: 'endereco' , render: rowData => `${rowData.endereco.rua}, ${rowData.endereco.numero}, ${rowData.endereco.cidade} - ${rowData.endereco.estado}, ${rowData.endereco.pais}`},
          { title: 'Pessoa Responsável', field: 'pessoa_responsavel' , render: rowData => rowData.pessoa_responsavel.nome},
          { title: 'Capacidade de refeições', field: 'capacidade_de_refeicoes', type: 'numerico'},
          { title: 'Horario café da manhã', field: 'horario_de_atendimento_cafe_da_manha' },
          { title: 'Horario almoço', field: 'horario_de_atendimento_almoco' },
          { title: 'Horario jantar', field: 'horario_de_atendimento_jantar' },
          { title: 'Dias de funcionamento', field: 'dias_de_funcionamento' }
        ]}
        data={data}
         editable={{
           onRowAdd: newData =>
             new Promise((resolve, reject) => {
               setTimeout(() => {
                 handleCreate(newData)

                 const dataCreate = [...data];

                 setData([...dataCreate, newData]);

                 resolve();
               }, 1000)
             }),
           onRowUpdate: (newData, oldData) =>
             new Promise((resolve, reject) => {
               setTimeout(() => {
                 const dataUpdate = [...data];
                 const index = oldData.tableData.id;
                 dataUpdate[index] = newData;
                 setData([...dataUpdate]);

                 resolve();
               }, 1000)
             }),
           onRowDelete: oldData =>
             new Promise((resolve, reject) => {
               setTimeout(() => {
                 handleDelete(oldData)
                 const dataDelete = [...data];
                 const index = oldData.tableData.id;
                 dataDelete.splice(index, 1);
                 setData([...dataDelete]);

                 resolve()
               }, 1000)
             }),
         }}
      />]
  )
}

export default GerenciamentoRestaurantes;