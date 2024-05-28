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
      .get("http://localhost:8080/restaurantes")
      .then(response => {
        const restaurantes = response.data.map(c => {
          return {
            id: c.id,
            nomeRestaurante: c.nomeRestaurante,
            enderecoId: c.enderecoId || 'Endereço não informado',
            pessoaResponsavelId: c.pessoaResponsavelId,
            capacidadeRefeicao: c.capacidadeRefeicao,
            horarioCafeDaManha: c.horarioCafeDaManha,
            horarioAlmoco: c.horarioAlmoco,
            horarioJantar: c.horarioJantar,
            diasFuncionamento: c.diasFuncionamento
          };
        });
        setData(restaurantes);
      })
      .catch(error => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post("http://localhost:8080/restaurantes", {
        "nomeRestaurante": newData.nomeRestaurante,
        "enderecoId": newData.enderecoId,
        "pessoaResponsavelId": newData.pessoaResponsavelId,
        "capacidadeRefeicao": newData.capacidadeRefeicao,
        "horarioCafeDaManha": newData.horarioCafeDaManha,
        "horarioAlmoco": newData.horarioAlmoco,
        "horarioJantar": newData.horarioJantar,
        "diasFuncionamento": newData.diasFuncionamento,
      })
      .then((response) => {
        console.log("Salvo com sucesso.");
        handleClick(); 
      })
  }

  function handleUpdate(newData) {
    const url = `http://localhost:8080/restaurantes/${newData.id}`;

    axios
      .put(url, {
        "nomeRestaurante": newData.nomeRestaurante,
        "enderecoId": newData.enderecoId,
        "pessoaResponsavelId": newData.pessoaResponsavelId,
        "capacidadeRefeicao": newData.capacidadeRefeicao,
        "horarioCafeDaManha": newData.horarioCafeDaManha,
        "horarioAlmoco": newData.horarioAlmoco,
        "horarioJantar": newData.horarioJantar,
        "diasFuncionamento": newData.diasFuncionamento,
      })
      .then(function (response) {
        console.log('Atualizado com sucesso.')
      })
      .catch(function (error) {
        console.error("Erro ao atualizar restaurante:", error);
      });
  }

  function handleDelete(newData) {
    const url = `http://localhost:8080/restaurantes/${newData.id}`;

    axios
      .delete(url)
      .then(function (response) {
        console.log("Deletado com sucesso.");
      });
  }

  function handleFetchEnderecos() {
    axios
      .get("http://localhost:8080/enderecos")
      .then(response => {
        setEnderecos(response.data);
      })
      .catch(error => console.log(error));
  }

  function handleFetchPessoasResponsavel() {
    axios
      .get("http://localhost:8080/pessoas")
      .then(response => {
        setPessoasResponsaveis(response.data);
      })
      .catch(error => console.log(error));
  }

  return (
    <MaterialTable
      title="Gerenciamento de Restaurantes"
      columns={[
        { title: 'Id', field: 'id', editable: "never" },
        { title: 'Nome do restaurante', field: 'nomeRestaurante' },
        { title: 'Endereço', field: 'enderecoId',
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
          render: rowData => `${rowData.enderecoId} - ${enderecos.find(endereco => endereco.id === rowData.enderecoId)?.rua}`,
        },
        { title: 'Pessoa Responsável', field: 'pessoaResponsavelId',
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
          render: rowData => `${rowData.pessoaResponsavelId} - ${pessoasResponsaveis.find(pessoaresponsavel => pessoaresponsavel.id === rowData.pessoaResponsavelId)?.nome}`,
        },
        { title: 'Capacidade de refeições', field: 'capacidadeRefeicao', type: 'numeric' },
        { title: 'Horario café da manhã', field: 'horarioCafeDaManha' },
        { title: 'Horario almoço', field: 'horarioAlmoco' },
        { title: 'Horario jantar', field: 'horarioJantar' },
        { title: 'Dias de funcionamento', field: 'diasFuncionamento' }
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