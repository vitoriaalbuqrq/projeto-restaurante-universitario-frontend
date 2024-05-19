import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

const GerenciamentoPessoaResponsavel = (props) => {
  const { useState, useEffect } = React;

  const [data, setData] = useState([]);

  useEffect(() => {
    handleClick();
  }, []);

  function handleClick() {
    axios
      .get("http://demo5814788.mockable.io/pessoaresponsavel")
      .then((response) => {
        const pessoa_responsavel = response.data.pessoas_responsaveis.map(
          (c) => {
            return {
              id: c.id,
              nome: c.nome,
              cpf: c.cpf,
              telefone_whatsapp: c.telefone_whatsapp,
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
      .post("http://demo5814788.mockable.io/pessoaresponsavel", {
        id: newData.id,
        cpf: newData.cpf,
        matricula: newData.matricula,
        nome: newData.nome,
        idEndereco: newData.idEndereco,
        curso: newData.curso,
      })
      .then(function (response) {
        console.log("Salvo com sucesso.");
      });
  }

  function handleUpdate(newData) {
    axios
      .put("http://demo5814788.mockable.io/pessoaresponsavel", {
        id: newData.id,
        cpf: newData.cpf,
        matricula: newData.matricula,
        nome: newData.nome,
        idEndereco: newData.idEndereco,
        curso: newData.curso,
      })
      .then(function (response) {
        console.log("Atualizado com sucesso.");
      });
  }

  function handleDelete(newData) {
    axios
      .delete("http://demo5814788.mockable.io/pessoaresponsavel", {
        id: newData.id,
      })
      .then(function (response) {
        console.log("Deletado com sucesso.");
      });
  }

  return [
    <MaterialTable
      title="Gerenciamento de Pessoa Responsável"
      columns={[
        { title: "Id", field: "id" },
        { title: "Nome", field: "nome" },
        { title: "CPF", field: "cpf" },
        { title: "Telefone", field: "telefone_whatsapp" },
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

export default GerenciamentoPessoaResponsavel;
