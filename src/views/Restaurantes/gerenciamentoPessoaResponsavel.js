import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";

const GerenciamentoPessoaResponsavel = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleClick();
  }, []);

  function handleClick() {
    axios
      .get("http://localhost:8080/pessoas")
      .then((response) => {
        const pessoa_responsavel = response.data.map((c) => {
            return {
              id: c.id,
              nome: c.nome,
              cpf: c.cpf,
              telefoneWhatsapp: c.telefoneWhatsapp,
              email: c.email,
            };
          }
        );
        setData(pessoa_responsavel);
      })
      .catch((error) => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post("http://localhost:8080/pessoas", {
        "nome": newData.nome,
        "cpf": newData.cpf,
        "telefoneWhatsapp": newData.telefoneWhatsapp,
        "email": newData.email
      })
      .then((response) => {
        console.log("Salvo com sucesso.");
        handleClick(); 
      });
  }

  function handleUpdate(newData) {
    const url = `http://localhost:8080/pessoas/${newData.id}`;
    axios
      .put(url, {
        "nome": newData.nome,
        "cpf": newData.cpf,
        "telefoneWhatsapp": newData.telefoneWhatsapp,
        "email": newData.email
      })
      .then(function (response) {
        console.log('Atualizado com sucesso.')
        handleClick(); 
      })
      .catch(function (error) {
        console.error("Erro ao atualizar pessoa responsável:", error);
      });
  }

  function handleDelete(newData) {
    const url = `http://localhost:8080/pessoas/${newData.id}`;

    axios
      .delete(url)
      .then(function (response) {
        console.log("Deletado com sucesso.");
        handleClick(); 
      });
  }

  return (
    [
      <MaterialTable
        title="Gerenciamento de Pessoa Responsável"
        columns={[
          { title: "Id", field: "id", editable: "never" },
          { title: "Nome", field: "nome" },
          { title: "CPF", field: "cpf" },
          { title: "Telefone", field: "telefoneWhatsapp" },
          { title: "Email", field: "email" },
        ]}
        data={data}
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
        />]
    )
}

export default GerenciamentoPessoaResponsavel;
