import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import CustomSelect from "components/CustomSelect/CustomSelect";

const GerenciamentoAlunos = (props) => {
  const [enderecos, setEnderecos] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    handleClick();
    handleFetchEnderecos();
  }, []);

  function handleClick() {
    axios
      .get("http://localhost:8080/alunos")
      .then((response) => {
        const alunos = response.data.map((c) => {
          return {
            id: c.id,
            cpf: c.cpf,
            matricula: c.matricula,
            nomeCompleto: c.nomeCompleto,
            enderecoId: c.enderecoId || 'Endereço não informado',
            curso: c.curso,
          };
        });
        setData(alunos);
      })
      .catch((error) => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post("http://localhost:8080/alunos", {
        "cpf": newData.cpf,
        "matricula": newData.matricula,
        "nomeCompleto": newData.nomeCompleto,
        "enderecoId": newData.enderecoId,
        "curso": newData.curso,
      })
      .then((response) => {
        console.log("Salvo com sucesso.");
        handleClick(); 
      })
  }

  function handleUpdate(newData) {
    const url = `http://localhost:8080/alunos/${newData.id}`;

    axios
      .put(url, {
        "cpf": newData.cpf,
        "matricula": newData.matricula,
        "nomeCompleto": newData.nomeCompleto,
        "enderecoId": newData.enderecoId,
        "curso": newData.curso,
      })
      .then(function (response) {
        console.log("Atualizado com sucesso.");
      })
      .catch(function (error) {
        console.error("Erro ao atualizar aluno:", error);
      });
  }

  function handleDelete(newData) {
    const url = `http://localhost:8080/alunos/${newData.id}`;

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
  
  return [
    <MaterialTable
      title="Gerenciamento de Alunos"
      columns={[
        { title: "Id", field: "id", editable: "never" },
        { title: "cpf", field: "cpf" },
        { title: "matricula", field: "matricula", type: "numeric" },
        { title: "nome", field: "nomeCompleto" },
        { title: "curso", field: "curso" },
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
      ]}
      data={data.map((row) => ({ ...row, key: row.id }))}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              handleCreate(newData);
              const dataCreate = [...data];
              setData([...dataCreate, newData]);
              resolve();
            }, 1000);
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
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              handleDelete(oldData);
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve();
            }, 1000);
          }),
      }}
    />,
  ];
};

export default GerenciamentoAlunos;
