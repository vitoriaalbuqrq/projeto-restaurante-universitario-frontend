import React, { useState, useEffect } from "react";
import axios from 'axios';
import MaterialTable from "material-table";

const GerenciamentoEnderecos = props => {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleClick();
  }, []);

  function handleClick() {
    axios
      .get("http://localhost:8080/enderecos")
      .then((response) => {
        const enderecos = response.data.map((c) => {
          return {
            id: c.id,
            rua: c.rua,
            numero: c.numero,
            cep: c.cep,
            cidade: c.cidade,
            estado: c.estado,
            pais: c.pais,
          };
        }
      );
      setData(enderecos);
      })
      .catch(error => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post("http://localhost:8080/enderecos", {
        "rua": newData.rua,
        "numero": newData.numero,
        "cep": newData.cep,
        "cidade": newData.cidade,
        "estado": newData.estado,
        "pais": newData.pais
      })
      .then(function (response) {
        console.log('Salvo com sucesso.')
        handleClick(); 
      });
  }

  function handleUpdate(newData) {
    const url = `http://localhost:8080/enderecos/${newData.id}`;
    axios
      .put(url, {
        "rua": newData.rua,
        "numero": newData.numero,
        "cep": newData.cep,
        "cidade": newData.cidade,
        "estado": newData.estado,
        "pais": newData.pais
      })
      .then(function (response) {
        console.log('Atualizado com sucesso.')
        handleClick(); 
      })
      .catch(function (error) {
        console.error("Erro ao atualizar endereço:", error);
      });
  }

  function handleDelete(newData) {
    const url = `http://localhost:8080/enderecos/${newData.id}`;
    axios
      .delete(url)
      .then(function (response) {
        console.log('Deletado com sucesso.')
        handleClick(); 
      });
  }

  return (
    [
      <MaterialTable
        title="Gerenciamento de Endereços"
        columns={[
          { title: 'Id', field: 'id', editable: "never"},
          { title: 'Rua', field: 'rua' },
          { title: 'Numero', field: 'numero'},
          { title: 'CEP', field: 'cep'},
          { title: 'Cidade', field: 'cidade'},
          { title: 'Estado', field: 'estado'},
          { title: 'País', field: 'pais'}
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
      />]
  )
}

export default GerenciamentoEnderecos;
