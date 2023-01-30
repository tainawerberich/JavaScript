define([], function () {
  return {
    calculaDiasEntreDuasDatas: function (dataI, dataF) {
      let dataIAux = parseInt(dataI.replace("-", ""));
      let dataFAux = parseInt(dataF.replace("-", ""));
      if (dataFAux < dataIAux) {
        let dataAux = dataF;
        dataF = dataI;
        dataI = dataAux;
      }
      let objDataI = this.getDataFormatada(dataI);
      let objDataF = this.getDataFormatada(dataF);
      let dias = 0;

      if (objDataI.ano == objDataF.ano) {
        if (objDataI.mes == objDataF.mes) {
          dias += objDataF.dia - objDataI.dia;
        } else {
          // buscando os dias do primeiro mes do periodo
          dias += this.getDiaMes(objDataI.ano, objDataI.mes) - objDataI.dia;
          // adiciona dias caso houver intervalo de meses completos entre a data inicial e final do período
          for (let mes = objDataI.mes + 1; mes <= objDataF.mes - 1; mes++) {
            dias += this.getDiaMes(objDataI.ano, mes);
          }
          // adiciona dias do último mês do período total
          dias += objDataF.dia;
        }
      } else {
        // adiciona dias do primeiro mês do período.
        dias += this.getDiaMes(objDataI.ano, objDataI.mes) - objDataI.dia;

        //adiciona dias do restante dos meses do primeiro ano(sem contar o primeiro mês, pois foi adicionado na linha anterior.)
        for (let mes = objDataI.mes + 1; mes <= 12; mes++) {
          dias += this.getDiaMes(objDataI.ano, mes);
        }

        // adiciona dias caso houver intervalo de anos completos entre a data inicial e final do período
        let anoIntervaloInicio = objDataI.ano + 1;
        let anoIntervaloFim = objDataF.ano - 1;
        for (let ano = anoIntervaloInicio; ano <= anoIntervaloFim; ano++) {
          dias += this.anoBissexto(ano) == true ? 366 : 365;
        }

        // Percorre mes 01 até penultimo mes da data fim
        for (let mes = 1; mes <= objDataF.mes - 1; mes++) {
          dias += this.getDiaMes(objDataF.ano, mes);
        }
        // adiciona dias do último mês do período total
        dias += objDataF.dia;
      }

      return dias;
    },

    anoBissexto: function (ano) {
      return ano % 100 === 0 ? ano % 400 === 0 : ano % 4 === 0;
    },

    getDataFormatada: function (data) {
      let tempDataI = data.split("-");
      if (tempDataI.length < 3) {
        return false;
      }

      return {
        ano: parseInt(tempDataI[0]),
        mes: parseInt(tempDataI[1]),
        dia: parseInt(tempDataI[2]),
      };
    },

    getDiaMes: function (ano, mes) {
      let diaMeses = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (mes == 2 && this.anoBissexto(ano) == true) {
        return 29;
      } else {
        return diaMeses[mes];
      }
    },
  };
});
