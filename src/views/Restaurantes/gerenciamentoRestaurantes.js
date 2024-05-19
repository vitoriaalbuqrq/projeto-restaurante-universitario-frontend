import React, { useState, useEffect } from "react";
import axios from 'axios';
import MaterialTable from "material-table";
import CustomSelect from "components/CustomSelect/CustomSelect.js";

const GerenciamentoRestaurantes = props => {
  const [data, setData] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [pessoasResponsaveis, setPessoasResponsaveis] = useState([]);

  useEffect(() => {
    handleClick();
    handleFetchEnderecos();
    handleFetchPessoasResponsavel();
  }, []);

  function handleClick() {
    axios
      .get("http://demo9128764.mockable.io/restaurantes")
      .then(response => {
        const restaurantes = response.data.restaurantes.map(c => {
          return {
            id: c.id,
            nome_do_restaurante: c.nome_do_restaurante,
            endereco: c.endereco.endereco || 'Endereço não informado',
            pessoa_responsavel: c.pessoa_responsavel.nome || 'Responsável não informado',
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
      .post("https://demo2582395.mockable.io/alunos", newData)
      .then(function (response) {
        console.log('Salvo com sucesso.')
      });
  }

  function handleUpdate(newData) {
    const url = `https://demo2582395.mockable.io/alunos/${newData.id}`;

    axios
      .put(url, newData)
      .then(function (response) {
        console.log('Atualizado com sucesso.')
      });
  }

  function handleDelete(newData) {
    axios
      .delete("https://demo2582395.mockable.io/delete-aluno", { data: { id: newData.id } })
      .then(function (response) {
        console.log('Deletado com sucesso.')
      });
  }

  function handleFetchEnderecos() {
    axios
      .get("http://demo5814788.mockable.io/enderecos")
      .then(response => {
        setEnderecos(response.data.enderecos);
      })
      .catch(error => console.log(error));
  }

  function handleFetchPessoasResponsavel() {
    axios
      .get("http://demo5814788.mockable.io/pessoaresponsavel")
      .then(response => {
        setPessoasResponsaveis(response.data.pessoas_responsaveis);
      })
      .catch(error => console.log(error));
  }

  return (
    <MaterialTable
      title="Gerenciamento de Restaurantes"
      columns={[
        { title: 'Id', field: 'id' },
        { title: 'Nome do restaurante', field: 'nome_do_restaurante' },
        { title: 'Endereço', field: 'endereco',
          editComponent: props => (
            <CustomSelect
              options={enderecos}
              value={props.value}
              inputLabel="Endereço"
              onChange={e => props.onChange(e.target.value)}
              valueKey="id"
              labelKey="rua"
            />
          ),
          render: rowData => rowData.endereco,
        },
        { title: 'Pessoa Responsável', field: 'pessoa_responsavel',
          editComponent: props => (
            <CustomSelect
              options={pessoasResponsaveis}
              value={props.value}
              inputLabel="Pessoa responsável"
              onChange={e => props.onChange(e.target.value)}
              valueKey="id"
              labelKey="nome"
            />
          ),
          render: rowData => rowData.pessoa_responsavel,
        },
        { title: 'Capacidade de refeições', field: 'capacidade_de_refeicoes', type: 'numeric' },
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
              setData(prevData => [...prevData, newData]);
              resolve();
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              handleUpdate(newData)
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
    />
  );
}

export default GerenciamentoRestaurantes;