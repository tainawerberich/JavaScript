define([], function () {
  return {
    retornaNumerosLista(number) {
      lista = 0;
      for (let listaAtualizada = 0; listaAtualizada <= 100; listaAtualizada++) {
        lista += listaAtualizada;
        console.log(lista);
      }
    },
  };
});
